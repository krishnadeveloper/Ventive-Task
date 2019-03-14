<?php

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
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/reactsetup', 'Setup\Reactsetup@index')->name('reactsetup');

Route::group(['prefix'=>'phone','namespace'=>'Phone'], function(){
    
    Route::get('/', 'PhoneController@index')->name('cellphone');
    Route::get('/list', 'PhoneController@phoneList')->name('phoneList');
    //Route::get('/list', 'CellphoneController@ShowAll')->name('ShowAll');
    
    //Route::get('connect', ['as' => 'connect', 'uses' = > 'AccountController@connect']);
});

