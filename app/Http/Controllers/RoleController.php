<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;

class RoleController extends Controller
{
    public function check()
    {
        $user_id = Auth::id();
        $role = Role::where('user_id', $user_id)->first();
        return response() ->json([
            'role' => $role,
        ]);
    }

    public function update()
    {
        $user_id = Auth::id();
        $role = Role::where('user_id', $user_id)->first();
        if($role->expiration_date) {
            $start_date = date('y-m-d h:i:s', strtotime($role->expiration_date));
            $expires = strtotime('+30 days', strtotime($start_date));
            $expiration_date = date('Y-m-d H:i:s', $expires);
        }
        else {
            $start_date = date('y-m-d h:i:s');
            $expires = strtotime('+30 days', strtotime($start_date));
            $expiration_date = date('Y-m-d H:i:s', $expires);
        }
        $role->update([
            'role' => 1,
            'expiration_date' => $expiration_date
        ]);
        return response() ->json([
            'role' => $role,
        ]);
    }
}
