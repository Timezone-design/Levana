<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Booking extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'booking';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        
        'client_id',
        'escort_id',
        'name',
        'email',
        'hotel',
        'room',
        'special',
        'type',
        'time',
        'duration',
        'price',
        'status',
        'client_unread',
        'escort_unread',
    ];

    public function getBooks($user_id) {
     
        $books = DB::table('booking')
                    ->where('client_id', $user_id)
                    ->orWhere('escort_id', $user_id)
                    ->get();
        return $books;
    } 
    public function getInbox($user)
    {
        if ($user->account_type == 'escort') {
            $inboxes = DB::table('booking')
                            ->where('booking.escort_id', '=', $user->id)
                            ->where('booking.status', '>', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.client_id')
                            ->join('users', 'users.id', '=', 'booking.client_id')
                            ->select('booking.id as booking_id','users.full_name', 'booking.client_id as user_id', 'profile_image.avatar')
                            ->get();

        }
        else {
            $inboxes = DB::table('booking')
                            ->where('booking.client_id', '=', $user->id)
                            ->where('booking.status', '>', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.escort_id')
                            ->join('users', 'users.id', '=', 'booking.escort_id')
                            ->select('booking.id as booking_id','users.full_name', 'booking.escort_id as user_id', 'profile_image.avatar')
                            ->get();
        }
        return $inboxes;
    }
    public function getRequest($user)
    {
        if ($user->account_type == 'escort') {
            $requests = DB::table('booking')
                            ->where('booking.escort_id', '=', $user->id)
                            ->where('booking.status', '=', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.client_id')
                            ->join('users', 'users.id', '=', 'booking.client_id')
                            ->select('booking.id as booking_id','booking.time','booking.duration', 'booking.client_id as user_id', 'profile_image.avatar','users.full_name')
                            ->get();

        }
        else {
            $requests = DB::table('booking')
                            ->where('booking.client_id', '=', $user->id)
                            ->where('booking.status', '=', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.escort_id')
                            ->join('users', 'users.id', '=', 'booking.escort_id')
                            ->select('booking.id as booking_id','booking.time','booking.duration', 'booking.escort_id as user_id', 'profile_image.avatar','users.full_name')
                            ->get();
        }
        return $requests;
    }
}
