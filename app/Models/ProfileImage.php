<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProfileImage extends Model
{
    use HasFactory;

    protected $table = 'profile_image';

    protected $fillable = [
        'user_id',
        'avatar',
        'cover',
    ];
}
