<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix'=>'phone','namespace'=>'Phone'], function(){

    Route::get('/', 'PhoneController@phoneList');
    Route::post('/add', 'PhoneController@store');
    Route::get('/edit/{id}', 'PhoneController@edit')
            ->where('id', '[0-9]+');

    Route::post('/update/{id}', 'PhoneController@update')
            ->where('id', '[0-9]+');


});


