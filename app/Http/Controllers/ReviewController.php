<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function getreviews()
    {
        $user_id = Auth::id();
        $reviews = getReviewsByID($user_id);
        
        return $reviews;
    }
}
   