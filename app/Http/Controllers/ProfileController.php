<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\EscortProfile;
use App\Models\ClientProfile;
use App\Models\ProfileImage;
use App\Models\Portfolio;
use App\Models\Rating;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getProfile(Request $request) {
        $input = $request->all();
        $user_id = $input['user_id'];
        $user = User::find($user_id); 
        if ($user->account_type == 'client') {
            $client_profile = new ClientProfile();
            $profile = $client_profile->getClientProfileByID($user_id);
        }
        else {
            $escort_profile = new EscortProfile();
            $profile = $escort_profile->getEscortProfileByID($user_id);
        }
        $rating = Rating::where('user_id', $user_id)->first();
        return response()->json([
            'full_name' => $user->full_name,
            'account_type' => $user->account_type,
            'profile' => $profile,
            'rating' => $rating->rating,
        ]);
    }
    
    public function update(Request $request) {
        $full_name = $request['full_name'];
        $profile = $request['profile'];
        $user_id = Auth::id();
        $user = User::find($user_id); 
        $account_type = $user->account_type;
        try {
            if ($account_type == 'escort') {
                $new_profile = EscortProfile::where('user_id', $user_id)->first();
                $new_profile->update($profile);
            }
            else {
                $new_profile = ClientProfile::where('user_id', $user_id)->first();
                $new_profile->update($profile);      
            }
            return response()->json([
                'success' => true,
                'profile' => $profile,
            ]);
        } 
        catch (Illuminate\Database\QueryException $ex) {
            $error = $ex->getMessage();
            return response()->json([
                'success' => false,
                'error' => $error,
            ]);
        }
    }

    public function generateMediaURL($base, $folder_prefix) {
        
        if (preg_match('/^data:image\/(\w+);base64,/', $base)) {
            $data = substr($base, strpos($base, ',') + 1);
            $filename = time() . "_" . uniqid();
            $data = base64_decode($data);
            $url= $folder_prefix.'/'.$filename.'.png';
            Storage::disk('local')->put($url, $data);
            $new_url = 'storage/'.$url;
            return $new_url;
        }
        if (preg_match('/^data:video\/(\w+);base64,/', $base)) {
            $data = substr($base, strpos($base, ',') + 1);
            $filename = time() . "_" . uniqid();
            $data = base64_decode($data);
            $url= $folder_prefix.'/'.$filename.'.mp4';
            Storage::disk('local')->put($url, $data);
            $new_url = 'storage/'.$url;
            return $new_url;
        }
    }
    
    public function getProfileImage(Request $request) {
        $user_id = $request['user_id'];
        $images = ProfileImage::where('user_id', $user_id)->first();        
        return response() ->json([
            'images' => $images,
        ]);         
    }

    public function getPortfolio(Request $request) {
        $user_id = $request['user_id'];
        $portfolio = Portfolio::where('user_id', $user_id)->get();   
        return response() ->json([
            'portfolio' => $portfolio,
        ]);         
    }

    public function uploadMedia(Request $request) {
        $user_id = Auth::id();
        $base64 = $request['base64'];
        $type = $request['type'];
        if ($type=='cover' || $type=='avatar') {
            $profile_image = ProfileImage::where('user_id', $user_id)->first();
            if ($profile_image->$type) 
                Storage::disk('local')->delete($profile_image->$type);
            $profile_image->$type = $this->generateMediaURL($base64, $type);
            $profile_image->save();
            return response() ->json([
                'profile' => $profile_image,
            ]);
        }
        else {
            $portfolio = new Portfolio;
            $portfolio->user_id = $user_id;
            $portfolio->type = $type;
            $portfolio->price = $request['price'];
            $portfolio->url = $this->generateMediaURL($base64, $type);
            $portfolio->save();
            return response() ->json([
                'portfolio' => $portfolio,
            ]);
        }
    } 
    
    public function deleteMedia(Request $request) {
        $portfolio = Portfolio::findOrFail($request->id);
        $portfolio->delete();
        return response() ->json([
            'portfolio' => $portfolio,
        ]);
    }

}
