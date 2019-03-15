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

Route::get('/home', function(){
    return redirect(route('cellphone'));
})->name('home');
Route::get('/reactsetup', 'Setup\Reactsetup@index')->name('reactsetup');

// Cellphone routing
Route::group(['prefix'=>'phone','namespace'=>'Phone'], function(){
    Route::get('/', 'PhoneController@index')->name('cellphone');
    Route::get('/add', 'PhoneController@index')->name('cellphoneadd');
    Route::get('/edit/{id}', 'PhoneController@index')->name('cellphoneedit');
});

