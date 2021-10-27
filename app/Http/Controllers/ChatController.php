<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Pusher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Chat;
use App\Models\Booking;

class ChatController extends Controller
{
    public function get(Request $request) {
        $booking_id = $request->booking_id;
        $user1_id = Auth::id();
        try {
            $chat = new Chat();
            // $records = $chat->getRecords($booking_id);
            $records = Chat::where('booking_id', $booking_id)
                            ->get();
            foreach ($records as $record) {
                if ($record->receiver_id == $user1_id) {
                    $record->update([
                        'read' => true
                    ]);
                }
            }
            $book = Booking::findOrFail($booking_id);
            if ($book->client_id == $user1_id) 
                $user2_id = $book->escort_id;
            else 
                $user2_id = $book->client_id;
            $user2 = User::findOrFail($user2_id);
            $user2_name = $user2->full_name;
            return response() -> json([
                'success' => true,
                'record' => $records,
                'user1_id' => $user1_id,
                'user2_id' => $user2_id,
                'user2_name' => $user2_name,
            ]);
        }
        catch (Illuminate\Database\QueryException $ex) {
            $error = $ex->getMessage();
            return response()->json([
                'success' => false,
                'error' => $error,
            ]);
        }
    }

    public function save(Request $request) {
        $record = $request->all();
        try {
            if ($record['file']) {
                $url = $this->generateMediaURL($record['file'], 'chat');
                $record['file'] = $url;
            }
            $chat = Chat::create($record);
            $this->trigger_pusher('chat', $chat);
            return response() -> json([
                'success' => true,
                'chat' => $chat
            ]);
        }
        catch (Illuminate\Database\QueryException $ex) {
            $error = $ex->getMessage();
            return response()->json([
                'success' => false,
                'error' => $error,
            ]);
        }
    }

    public function update(Request $request) {
        $booking_id = $request->booking_id;
        $user_id = $request->user_id;
        try {
            $records = Chat::where('booking_id', $booking_id)
                        ->where('receiver_id', $user_id)
                        ->where('unread', 0)
                        ->get();
            foreach ($records as $record) {
                $record->update([
                    'read' => true
                ]);
            }
            return response() -> json([
                'records' => $records,
                'success' => true
            ]);
        }
        catch (Illuminate\Database\QueryException $ex) {
            $error = $ex->getMessage();
            return response()->json([
                'success' => false,
                'error' => $error,
            ]);
        }
    }

    public function trigger_pusher($trigger, $data)
    {
        $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));
        $pusher->trigger('levana-channel', 'levana-event', [
            'trigger' => $trigger,
            'data' => $data,
        ]);
    }

    
    public function sendmessage (Request $request) {
        
        $user1_id = Auth::id();
        $user2_id = $request['receiver_id'];

        $chat = new Chat();
        $chat->sender_id = $user1_id ;
        $chat->receiver_id = $user2_id;
        $chat->content = $request['message'];
        $chat->file = $this->makemedia_url($request['file'], 'chatimage' );
        $chat->save();

        // get the database of sending meassage
        $new_chat = new Chat();
        $update = $new_chat->getLastUpdate($user1_id, $user2_id);


        // record user in inbox 
        $user = new User();
        $accounttype1 = $user->where('id', $user1_id)->select('accounttype')->get();

        if ($accounttype1[0]['accounttype'] == 'client') {
            $inbox = new Inbox();
            $hasRecord = $inbox->hasRecord($user1_id, $user2_id);
            if ( !$hasRecord ) {
                $inbox->client_id = $user1_id;
                $inbox->escort_id = $user2_id;
                $inbox->save();
            }
        }
        else {
            $inbox = new Inbox();
            $hasRecord = $inbox->hasRecord($user2_id, $user1_id);
            if ( !$hasRecord ) {
                $inbox->client_id = $user1_id;
                $inbox->escort_id = $user2_id;
                $inbox->save();
            }
        }
        
        
        // send event by pusher
        $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));

        $pusher->trigger('levana-channel', 'levana-event', [
            'trigger' => 'send_message',
            'sender_id' => $update->sender_id,
            'receiver_id' => $update->receiver_id,
            'content' => $update->content,
            'created_at' => $update->created_at,
            'unread' => $update->unread,
            'file'  => $update->file,
            'chat_id' => $update->id,
        ]);
        
        return "success";
    }

    // public function updateunread(Request $chat_id) {

    //     $chat_id = $chat_id['chat_id'];
    //     $chat = new Chat();
    //     $updating_record = $chat->where('id',$sender_id)
    //                             ->where('unread', 0)
    //                             ->first();
    //     $updating_record->unread = 1;
    //     $updating_record->save();

    // }

    // public function getMessgeCount(Request $users) {
    //     $chat = new Chat();
    //     $unread = $chat->where('sender_id', $users['user2'])
    //                     ->where('receiver_id', $users['user1'])
    //                     ->where('unread',0)
    //                     ->count();
    //     return $unread;
        
    // }

    public function generateMediaURL($base, $folder_prefix) {
        
        if (preg_match('/^data:image\/(\w+);base64,/', $base)) {
            $data = substr($base, strpos($base, ',') + 1);
            $filename = time() . "_" . uniqid();
            $data = base64_decode($data);
            $url= $folder_prefix.'/'.$filename.'.png';
            Storage::disk('local')->put($url, $data);
            $new_url = 'storage/'.$url;
            return $new_url;
        }
        if (preg_match('/^data:video\/(\w+);base64,/', $base)) {
            $data = substr($base, strpos($base, ',') + 1);
            $filename = time() . "_" . uniqid();
            $data = base64_decode($data);
            $url= $folder_prefix.'/'.$filename.'.mp4';
            Storage::disk('local')->put($url, $data);
            $new_url = 'storage/'.$url;
            return $new_url;
        }
    }

    
}
