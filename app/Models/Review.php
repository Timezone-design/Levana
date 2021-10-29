<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;

    protected $table = 'review';

    protected $fillable = [
        
        'sender_id',
        'receiver_id',
        'content',
        'rating',
    ];

    public function getReviewsByID ($user_id) {
        $reviews = Review::where('review.receiver_id', '=', $user_id)
                ->join('users','review.sender_id', '=' ,'users.id')
                ->select('users.name', 'review.content', 'review.rating','review.created_at')
                ->get();
        return $reviews;
    }
}
