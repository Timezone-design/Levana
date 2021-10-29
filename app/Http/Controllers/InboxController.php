<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;


class InboxController extends Controller
{
    public function get()
    {
        $user = User::find(Auth::id());
        try {
            $booking = new Booking();
            $inboxes = $booking->getInbox($user);
            $total_unread = 0;
            foreach ($inboxes as $inbox) {
                $last_chat = Chat::where('booking_id', $inbox->id)
                            ->orderBy('updated_at', 'desc')
                            ->first();
                if ($last_chat)
                $inbox->last_msg = $last_chat->content;

                // count unread chat record
                $unread = Chat::where('booking_id', $inbox->id)
                                ->where('receiver_id', Auth::id())
                                ->where('read', false)
                                ->count();
                $inbox->unread = $unread;
                $total_unread = $total_unread + $unread;

                // check booking read 
                if(!$inbox->booking_read) 
                    $total_unread++;
            }
            return response()->json([
                'inbox' => $inboxes,
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
