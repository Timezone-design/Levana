<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EscortProfile extends Model
{
    use HasFactory;

    protected $table = 'escort_profile';

    protected $fillable = [
        'user_id',
        'country',
        'city',
        'age',
        'ethnicity',
        'dress',
        'height',
        'bust',
        'hair_color',
        'eye_color',
        'public_hair',
        'avatar',
        'cover',
        'has_free_gallery',
        'has_price_gallery',
        'has_free_movie',
        'has_price_movie',
        'bio',
        'services',
        'incall_price',
        'outcall_price',
    ];

    public function getEscortProfileByID($user_id) {

        $profile = DB::table('escort_profile')
                    ->where('user_id', $user_id)
                    ->first();
        return $profile;
    }

    public function searchByFilter($filter)
    {
        $escorts = DB::table('escort_profile')
                    ->join('users', 'users.id', '=', 'escort_profile.user_id')
                    ->join('rating', 'users.id', '=', 'rating.user_id');
        // filter by profile
        if (isset($filter['country'])) 
            $escorts = $escorts->where('escort_profile.country', $filter['country']);
        if (isset($filter['city'])) 
            $escorts = $escorts->where('escort_profile.city', $filter['city']);
        if (isset($filter['ethnicity'])) 
            $escorts = $escorts->where('escort_profile.ethnicity', $filter['ethnicity']);
        if (isset($filter['dress'])) 
            $escorts = $escorts->where('escort_profile.dress', $filter['dress']);
        if (isset($filter['bust'])) 
            $escorts = $escorts->where('escort_profile.bust', $filter['bust']);
        if (isset($filter['gender'])) 
            $escorts = $escorts->where('users.gender', $filter['gender']);
        if (isset($filter['min_age'])) 
            $escorts = $escorts->where('escort_profile.age', '>', $filter['min_age']);
        if (isset($filter['max_age'])) 
            $escorts = $escorts->where('escort_profile.age', '<', $filters['max_age']);
       if (isset($filter['has_viewable_rating'])) 
            $escorts = $escorts->where('rating.rating', '>', 4.5);

        $escorts = $escorts->select('escort_profile.*', 'rating.rating', 'users.full_name','users.name')
                           ->get();
 
        // filter by image and movie
        if (isset($filter['has_free_photo'])) {
            $escorts = array_filter($escorts, function($escort) {
                $free_photo = DB::table('portfolio')
                                ->where('portfolio.user_id', $escort['user_id'])
                                ->where('portfolio.type', 'free_photo')
                                ->get();
                if( count($free_photo) > 0 ) return true;
            });
        }

        if (isset($filter['has_free_video'])) {
            $escorts = array_filter($escorts, function($escort) {
                $free_video = DB::table('portfolio')
                                ->where('portfolio.user_id', $escort['user_id'])
                                ->where('portfolio.type', 'free_video')
                                ->get();
                if( count($free_video) > 0 ) return true;
            });
        }

        if (isset($filter['has_price_photo'])) {
            $escorts = array_filter($escorts, function($escort) {
                $price_photo = DB::table('portfolio')
                                ->where('portfolio.user_id', $escort['user_id'])
                                ->where('portfolio.type', 'price_photo')
                                ->get();
                if( count($price_photo) > 0 ) return true;
            });
        }



        return $escorts;
    }
}
