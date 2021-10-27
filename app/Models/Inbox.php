<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inbox';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'escort_id',
    ];

    public function hasRecord($client_id, $escort_id) {

        $count = Inbox::where('client_id', $client_id)
                        ->where('escort_id', $escort_id)
                        ->count();
        if ( $count ) {
            return true;
        }
        else return false;
    }
}
