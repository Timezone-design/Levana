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
use App\Models\Inbox;

class AccountController extends Controller
{
    public function get() {
        $user = User::find(Auth::id()); 
        $count = Chat::where('receiver_id', Auth::id())
                    ->where('read', 0)
                    ->count();

        return response()->json([
            'user_info' => $user,
            'unread' => $count
        ]);
    }

    public function update( Request $request) {
        
        $user = User::find(Auth::id()); 
        $old_password = Hash::make($request['old_password']);
        $new_password = $request['new_password'];

        if ($user->password == $old_password) {
            $user->password = Hash::make($new_password);
            $user->save();
            return response()->json([
                'success' => true,
            ]);
        }
        else 
            return response()->json([
                'success' => false,
            ]);
    }

    public function delete() {
        
        $user = User::find(Auth::id()); 
        Auth::logout();
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
}
