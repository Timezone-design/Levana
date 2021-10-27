<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Booking;
use Pusher;

class BookingController extends Controller
{
    public function save( Request $request) {
        $input  = $request->all();
        try {
            $booking = Booking::create($input);

            return response() -> json([
                'booking' => $booking,
                'success' => true,
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

    public function update( Request $request) {
        $booking_id = $request->booking_id;
        $status = $request->status;
        try {
            $booking = Booking::findOrFail($booking_id);
            $booking->update([
                'status' => $status,
            ]);
            return response() -> json([
                'booking' => $booking,
                'success' => true,
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

    public function get()
    {
        $user_id = Auth::id();
        $booking = new Booking();
        try {
            $books = $booking->getBooks($user_id);
            return response()->json([
                'success' => true,
                'books' => $books,
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

    // public function getbooks() {

    //     $user_id = Auth::id();
    //     $accounttype = User::find(Auth::id())->accounttype;
        
    //     // get avatar, name, user_id, active of inbox users
    //     if ( $accounttype == 'client' ) {
    //         $booking = new Booking();
    //         $books = $booking->where('client_id', $user_id)
    //                                 ->join('users','users.id','=','booking.escort_id')
    //                                 ->join('escort_profile','booking.escort_id','=','escort_profile.user_id')
    //                                 ->select('users.name','users.active','escort_profile.avatarimage','booking.*')
    //                                 ->orderBy('updated_at','desc')
    //                                 ->get();
    //         $unread =  $booking->where('client_id', $user_id)
    //                             ->select('client_unread')
    //                             ->orderBy('updated_at','desc')
    //                             ->get();
    //         $unread_array = [];
    //         foreach($unread as $each) {
    //             array_push($unread_array, $each->client_unread);
    //         }

    //          $status =  $booking->where('client_id', $user_id)
    //                             ->select('status')
    //                             ->orderBy('updated_at','desc')
    //                             ->get();
    //     }
    //     else {
    //         $booking = new Booking();
    //         $books = $booking->where('escort_id', $user_id)
    //                                 ->join('users','users.id','=','booking.client_id')
    //                                 ->join('client_profile','booking.client_id','=','client_profile.user_id')
    //                                 ->select('users.name','users.active','client_profile.avatarimage','booking.*')
    //                                 ->orderBy('updated_at','desc')
    //                                 ->get();
    //         $unread =  $booking->where('escort_id', $user_id)
    //                             ->select('escort_unread')
    //                             ->orderBy('updated_at','desc')
    //                             ->get();
    //         $unread_array = [];
    //         foreach($unread as $each) {
    //             array_push($unread_array, $each->escort_unread);
    //         }


    //         $status =  $booking->where('escort_id', $user_id)
    //                             ->select('status')
    //                             ->orderBy('updated_at','desc')
    //                             ->get();
    //     }

    //     $status_array = [];
    //     foreach($status as $each) {
    //         array_push($status_array, $each->status);
    //     }

        
    //     return response()->json([
    //         'books' => $books,
    //         'accounttype' => $accounttype,
    //         'unread' => $unread_array,
    //         'status' => $status_array,
    //         'authID' => $user_id
    //     ]);
    // }

    // public function getStatus() {
                
    //     $user_id = Auth::id();
    //     $accounttype = User::find(Auth::id())->accounttype;
        
    //     // get avatar, name, user_id, active of inbox users
    //     if ( $accounttype == 'client' ) {
    //         $booking = new Booking();
    //         $unread =  $booking->where('client_id', $user_id)
    //                             ->select('client_unread')
    //                             ->get();
    //         $unread_array = [];
    //         foreach($unread as $each) {
    //             array_push($unread_array, $each->client_unread);
    //         }

    //          $status =  $booking->where('client_id', $user_id)
    //                             ->select('status')
    //                             ->get();
    //     }
    //     else {
    //         $booking = new Booking();
    //         $unread =  $booking->where('escort_id', $user_id)
    //                             ->select('escort_unread')
    //                             ->get();
    //         $unread_array = [];
    //         foreach($unread as $each) {
    //             array_push($unread_array, $each->escort_unread);
    //         }


    //         $status =  $booking->where('escort_id', $user_id)
    //                             ->select('status')
    //                             ->get();
    //     }

    //     $status_array = [];
    //     foreach($status as $each) {
    //         array_push($status_array, $each->status);
    //     }

        
    //     return response()->json([
    //         'accounttype' => $accounttype,
    //         'unread' => $unread_array,
    //         'status' => $status_array,
    //         'authID' => $user_id
    //     ]);
    // }

    // public function updateunreadbooking(Request $request) {
    //     $user = User::find(Auth::id());
    //     if ($user->accounttype=='client') {
    //         $booking = Booking::find($request['booking_id']);
    //         $booking->client_unread = 1;
    //         $booking->update();
    //     }
    //     else {
    //         $booking = Booking::find($request['booking_id']);
    //         $booking->escort_unread = 1;
    //         $booking->update();
    //     }
    //     return 'ok';
        
        
    // }

    // public function acceptBooking(Request $request) {

    //     $booking = Booking::find($request['booking_id']);
    //     $booking->status = 1;
    //     $booking->client_unread = 0;
    //     $booking->update();
    //     $this->update_booking_pusher_trigger($request['booking_id']);
    // }

    // public function rejectBooking(Request $request) {

    //     $booking = Booking::find($request['booking_id']);
    //     $booking->status = 2;
    //     $booking->client_unread = 0;
    //     $booking->update();
    //     $this->update_booking_pusher_trigger($request['booking_id']);
    // }

    // public function cancelBooking(Request $request) {

    //     $booking = Booking::find($request['booking_id']);
    //     $booking->status = 3;
    //     $booking->escort_unread = 0;
    //     $booking->update();
    //     $this->update_booking_pusher_trigger($request['booking_id']);
    // }

    // public function update_booking_pusher_trigger($booking_id) {

    //     $update = Booking::find($booking_id);

    //     $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));

    //     $pusher->trigger('levana-channel', 'levana-event', [
    //         'trigger' => 'update_booking_request',
    //         'id' => $update->id,
    //         'client_id' => $update->client_id,
    //         'escort_id' => $update->escort_id,
    //         'status' => $update->status,
    //         'client_unread' => $update->client_unread,
    //         'escort_unread' => $update->escort_unread,
    //     ]);
    // }

    // public function trigger_new_booking_by_pusher($new) {

    //     $client = User::find($new->client_id);
    //     $name = $client->name;
    //     $active = $client->active;
    //     $profile = ClientProfile::where('user_id', $new->client_id)
    //                                 ->select('avatarimage')
    //                                 ->first();
    //     $avatarimage = $profile->avatarimage;


    //     $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));

    //     $pusher->trigger('levana-channel', 'levana-event', [
    //         'trigger' => 'new_booking',
    //         'id' => $new->id,
    //         'name' => $name,
    //         'active' => $active,
    //         'avatarimage' => $avatarimage,
    //         'client_id' => $new->client_id,
    //         'escort_id' => $new->escort_id,
    //         'booking_duration' => $new->booking_duration,
    //         'booking_price' => $new->booking_price,
    //         'booking_type' => $new->booking_type,
    //         'booking_time' => $new->booking_time,
    //         'special' => $new->special,
    //         'hotel' => $new->hotel,
    //         'reserved_name' => $new->reserved_name,
    //         'room' => $new->room,
    //         'client_email' => $new->client_email,
    //         'status' => $new->status,
    //         'client_unread' => $new->client_unread,
    //         'escort_unread' => $new->escort_unread,
    //         'created_at' => $new->created_at,
    //         'updated_at' => $new->updated_at,
    //     ]);
    // }
}
