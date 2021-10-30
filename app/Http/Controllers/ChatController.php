<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Pusher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Chat;
use App\Models\Booking;
use App\Models\ProfileImage;



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
            // foreach ($records as $record) {
            //     if ($record->receiver_id == $user1_id) {
            //         $record->update([
            //             'read' => true
            //         ]);
            //     }
            // }
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
        $user_id = Auth::id();
        try {
            $records = Chat::where('booking_id', $booking_id)
                        ->where('receiver_id', $user_id)
                        ->where('read', false)
                        ->get();
            foreach ($records as $record) {
                $record->update([
                    'read' => true
                ]);
            }
            return response() -> json([
                'count' => count($records),
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
