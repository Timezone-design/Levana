<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\EscortProfile;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Booking;
use App\Models\Chat;
use App\Models\ProfileImage;
use App\Models\Inbox;
use Pusher;

class AccountController extends Controller
{
    public function get() {
        $user = User::find(Auth::id()); 
        $chat_unread = Chat::where('receiver_id', Auth::id())
                    ->where('read', 0)
                    ->count();
        if($user->account_type == 'escort')
            $booking_unread = Booking::where('escort_id', Auth::id())
                                    ->where('escort_read', 0)
                                    ->count();
        else
            $booking_unread = Booking::where('client_id', Auth::id())
                                    ->where('client_read', 0)
                                    ->count();

        return response()->json([
            'user_info' => $user,
            'unread' => $chat_unread + $booking_unread,
        ]);
    }

    public function update( Request $request) {
        $input = $request->all();

        $user = User::find(Auth::id()); 
        $old_password = $input['old_password'];
        $new_password = $input['new_password'];
        $password = $user->password;

        if(Hash::check($old_password, $password)) {
            $user->password = Hash::make($new_password);
            $user->save();
            return response()->json([
                'success' => true,
            ]);
        } 
        else {
            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function delete() {
        
        $user = User::find(Auth::id()); 
        $user->delete();

        return response()->json([
            'success' => true,
        ]);
    }
    public function unread() {
        
        $user_id = Auth::id(); 
        $count = Chat::where('receiver_id', $user_id)
                    ->where('read', 0)
                    ->count();

        return response()->json([
            'unread' => $count,
        ]);
    }

    public function logOut() {
        $user = User::find(Auth::id());
        $images = ProfileImage::where('user_id', $user->id)->first();
        $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));
        $pusher->trigger('levana-channel', 'levana-event', [
            'trigger' => 'log',
            'status' => false,
            'user_id' => $user->id,
        ]);
        Auth::logout();
        return response() ->json([
            'success' => true,
        ]);

    }
}
