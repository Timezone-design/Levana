<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcceptedLang extends Model
{
    use HasFactory;

    protected $table = 'accepted_lang';

    protected $fillable = [
        'accepted_lang',
    ];
}

