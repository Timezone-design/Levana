<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Auth::routes();

Route::get('/home', 'App\Http\Controllers\HomeController@index');
Route::get('/editprofile', 'App\Http\Controllers\HomeController@index');
Route::get('/profile/{any}', 'App\Http\Controllers\HomeController@index');
Route::get('/chat/{any}', 'App\Http\Controllers\HomeController@index');


// profile api
Route::post('/profile/get', 'App\Http\Controllers\ProfileController@getProfile');
Route::post('/profile/update', 'App\Http\Controllers\ProfileController@update');
Route::post('/profile/images/get', 'App\Http\Controllers\ProfileController@getProfileImage');
Route::post('/profile/portfolio/get', 'App\Http\Controllers\ProfileController@getPortfolio');
Route::post('/profile/upload', 'App\Http\Controllers\ProfileController@uploadMedia');
Route::post('/profile/portfolio/delete', 'App\Http\Controllers\ProfileController@deleteMedia');

// search api
Route::post('/search/filter', 'App\Http\Controllers\SearchController@getByFilter');
Route::post('/search/favorite', 'App\Http\Controllers\SearchController@getFavorites');

// booking api
Route::post('/booking/save', 'App\Http\Controllers\BookingController@save');
Route::post('/booking/get', 'App\Http\Controllers\BookingController@get');
Route::post('/booking/update', 'App\Http\Controllers\BookingController@update');

// account info api
Route::get('/account/get', 'App\Http\Controllers\AccountController@get');
Route::get('/account/delete', 'App\Http\Controllers\AccountController@delete');
Route::post('/account/update', 'App\Http\Controllers\AccountController@update');
Route::get('/account/unread', 'App\Http\Controllers\AccountController@unread');

// chat api
Route::post('/chat/get', 'App\Http\Controllers\ChatController@get');
Route::post('/chat/save', 'App\Http\Controllers\ChatController@save');
Route::post('/chat/update', 'App\Http\Controllers\ChatController@update');

// inbox api
Route::get('/inbox/get', 'App\Http\Controllers\InboxController@get');

// request api
Route::get('/request/get', 'App\Http\Controllers\RequestController@get');

// role api
Route::get('/role/check', 'App\Http\Controllers\RoleController@check');
Route::get('/role/update', 'App\Http\Controllers\RoleController@update');





Route::middleware('auth')->get('/{any}', 'App\Http\Controllers\HomeController@index');

// Route::middleware('auth')->get('/{any}', function() {
//     return view('home');
// })->where('any', '.*');




