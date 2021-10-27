<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Chat extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'chat';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'booking_id',
        'sender_id',
        'receiver_id',
        'content',
        'file',
        'unread',
    ];

    public function getRecords($booking_id)
    {
        $records = DB::table('chat')
                    ->where('booking_id', $booking_id)
                    ->get();

        return $records;
    }
}
