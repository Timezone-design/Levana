<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function get()
    {
        $user = User::find(Auth::id());
        try {
            $booking = new Booking();
            $requests = $booking->getRequest($user);
            $total_unread = 0;
            foreach ($requests as $request) {
                $last_chat = Chat::where('booking_id', $request->id)
                            ->orderBy('updated_at', 'desc')
                            ->first();
                if ($last_chat)
                $request->last_msg = $last_chat->content;
                else
                    $request->last_msg = "I'd like to book you.";
                $count = Chat::where('booking_id', $request->id)
                            ->where('receiver_id', Auth::id())
                            ->where('read', false)
                            ->count();
                $request->unread = $count;
                $total_unread = $total_unread + $count;

                 // check booking read 
                if(!$request->booking_read) 
                    $total_unread++;
            }
            return response()->json([
                'request' => $requests,
                'total_unread' => $total_unread,
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
}
