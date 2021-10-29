<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\EscortProfile;
use App\Models\ClientProfile;
use App\Models\ProfileImage;
use App\Models\Portfolio;
use App\Models\Rating;
use App\Models\Role;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Session;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'full_name' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'max:12'],
            'account_type' => ['required', 'string', 'max:10'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],

        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $user = new User;
        $user->full_name = $data['full_name'];
        $user->name = $data['name'];
        $user->gender = $data['gender'];
        $user->account_type = $data['account_type'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        
        $user->save();
        $account_type = (isset($data['account_type'])) ? $data['account_type'] : 'client';
        if($user->id != NULL) {
            if($account_type =='escort') {
                
                $escort_profile = new EscortProfile;
                $escort_profile->user_id = $user->id;
                $escort_profile->save();

            }

            else {
                $client_profile = new ClientProfile;
                $client_profile->user_id = $user->id;
                $client_profile->save();
            }

            $rating = new Rating;
            $rating->user_id = $user->id;
            $rating->save();

            $image = new ProfileImage;
            $image->user_id = $user->id;
            $image->save();

            $role = new Role;
            $role->user_id = $user->id;
            $role->save();
        }

        return $user;
    }
}
