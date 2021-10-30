<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ProfileImage;
use Pusher;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $images = ProfileImage::where('user_id', $user->id)->first();
        $pusher = new Pusher\Pusher('3901d394c4dc96fca656', '8bf8e5a81b6b588d670c', '1250939', array('cluster' => 'eu'));
        $pusher->trigger('levana-channel', 'levana-event', [
            'trigger' => 'log',
            'status' => true,
            'user_id' => $user->id,
            'avatar' => $images->avatar,
        ]);
        return view('home');
    }
}
