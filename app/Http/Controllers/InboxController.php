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
            foreach ($inboxes as $inbox) {
                $last_chat = Chat::where('booking_id', $inbox->booking_id)
                            ->orderBy('updated_at', 'desc')
                            ->first();
                if ($last_chat)
                $inbox->last_msg = $last_chat->content;
            }
            return response()->json([
                'inbox' => $inboxes,
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
