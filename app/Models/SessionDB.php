<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SessionDB extends Model
{
    use HasFactory;

    public function check($user_id) {
        $count = DB::table('sessions')
                    ->where('user_id', $user_id)
                    ->count();
        if ($count > 0) 
            return true;
        else 
            return false;
    }
}
