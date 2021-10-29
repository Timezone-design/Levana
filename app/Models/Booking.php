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
        'client_read',
        'escort_read',
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
                            ->select('booking.*','booking.escort_read as booking_read','users.name','users.full_name','users.active','profile_image.avatar', 'profile_image.cover')
                            ->get();

        }
        else {
            $inboxes = DB::table('booking')
                            ->where('booking.client_id', '=', $user->id)
                            ->where('booking.status', '>', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.escort_id')
                            ->join('users', 'users.id', '=', 'booking.escort_id')
                            ->select('booking.*','booking.client_read as booking_read','users.name','users.full_name','users.active','profile_image.avatar', 'profile_image.cover')
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
                            ->select('booking.*','booking.escort_read as booking_read','users.name','users.full_name','users.active','profile_image.avatar', 'profile_image.cover')
                            ->get();

        }
        else {
            $requests = DB::table('booking')
                            ->where('booking.client_id', '=', $user->id)
                            ->where('booking.status', '=', 0)
                            ->join('profile_image', 'profile_image.user_id', '=', 'booking.escort_id')
                            ->join('users', 'users.id', '=', 'booking.escort_id')
                            ->select('booking.*','booking.client_read as booking_read','users.name','users.full_name','users.active','profile_image.avatar', 'profile_image.cover')
                            ->get();
        }
        return $requests;
    }
}
