<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ClientProfile extends Model
{
    use HasFactory;

    protected $table = 'client_profile';

    protected $fillable = [
        'user_id',
        'country',
        'city',
        'age',
        'avatar',
        'cover',
        'bio',
    ];

    public function getClientProfileByID($user_id) {

        $profile = DB::table('client_profile')
                    ->where('user_id', $user_id)
                    ->first();
        return $profile;
    }

}
