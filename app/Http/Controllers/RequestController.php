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
                $last_chat = Chat::where('booking_id', $request->booking_id)
                            ->orderBy('updated_at', 'desc')
                            ->first();
                if ($last_chat)
                $request->last_msg = $last_chat->content;
                else
                    $request->last_msg = "I'd like to book you.";
                $unread_booking = Booking::where('booking_id', $request->booking_id)
                                    ->where('escort_id', Auth::id())
                                    ->where('escort_read', false)
                                    ->count();
                if ($unread_booking) {
                    $request->unread = 1;
                    $total_unread++;
                }
                else {
                    $count = Chat::where('booking_id', $request->booking_id)
                                ->where('receiver_id', Auth::id())
                                ->count();
                    $request->unread = $count;
                    $total_unread = $total_unread + $count;
                }
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
