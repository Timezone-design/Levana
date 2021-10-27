<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Rating;
use App\Models\EscortProfile;
use App\Models\Portfolio;

class SearchController extends Controller
{
    public function getByFilter(Request $request) {
        $user_id = Auth::id();
        $filter = $request->all();
        $escortProfile = new EscortProfile();
        $escorts = $escortProfile->searchByFilter($filter);
        foreach ($escorts as $escort) {
            // check if favorite
            $favorite = Favorite::where('client_id', $user_id)
                                ->where('escort_id', $escort->user_id)
                                ->get();
            if (count($favorite) > 0) {
                $escort->is_favorite = $favorite[0]->favorite;
            }                   
            else $escort->is_favorite = false;
            
            $intro_photo = Portfolio::where('user_id', $escort->user_id)
                                        ->where('type','free_photo')
                                        ->get();
            // intro photo and video
            if (count($intro_photo) > 0) 
            $escort->intro_photo = $intro_photo[0]->url;

            $intro_video = Portfolio::where('user_id', $escort->user_id)
                                        ->where('type','free_video')
                                        ->get();
            if (count($intro_video) > 0) 
            $escort->intro_video = $intro_video[0]->url;

            // get rating
            $rating = Rating::where('user_id', $escort->user_id)->first();
            $escort->rating = $rating->rating;

        }

        return response()->json([
            'escorts' => $escorts,
        ]);
       
    }

    public function getFavorites(Request $request) {
        $client_id = $request['client_id'];
        $escort_id = $request['escort_id'];
        $favorite = new Favorite();
        $favorites = $favorite->where('client_id', $client_id)
                                ->where('escort_id', $escort_id)
                                ->where('favorite', true)
                                ->get();
        $favorite_profiles = [];
        foreach ($favorites as $favorite) {
            $escort_id = $favorite->escort_id;
            $escortProfile = new EscortProfile();
            $profile = $escortProfile->where('escort_id', $escort_id)
                                     ->first();
            array_push($favorite_profiles, $profile);
        }

        return response()->json([
            'escorts' => $favorite_profiles,
        ]);
    }
}
