<?php

namespace App\Http\Controllers\Phone;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cellphone;
use Validator;

class PhoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('reactjs.app');
    }

    public function phoneList()
    {
        return Cellphone::paginate('2');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('reactjs.app');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validation = $request->validate($request->all(), [

        //     'brandname' =>  'required',
        //     'modal'     =>  'required',
        //     'platform'  =>  'required',
        //     'cpu'       =>  'required',
        //     'simtype'   =>  'required',
        //     'usb'       =>  'required',
        //     'price'     =>  'required',
        //     'status'    =>  'nullable'

        // ]);
        $validation = Validator::make($request->all(), [
            'brandname' =>  'required',
            'modal'     =>  'required',
            'platform'  =>  'required',
            'cpu'       =>  'required',
            'simtype'   =>  'required',
            'usb'       =>  'required',
            'price'     =>  'required',
            'status'    =>  'nullable'
        ]);

        if($validation->fails())
        {
            return $validation->errors();
        }
        else
        {
            $insertPhone = new Cellphone();
            $insertPhone->brandname     = $request->brandname;
            $insertPhone->modal         = $request->modal;
            $insertPhone->platform      = $request->platform;
            $insertPhone->cpu           = $request->cpu;
            $insertPhone->simtype       = $request->simtype;
            $insertPhone->usb           = $request->usb;
            $insertPhone->price         = $request->price;
            $insertPhone->status        = $request->status;
            $inserterted = $insertPhone->save();


            return response()
                    ->json([
                        'status'=>$inserterted,
                        'code'=>200
                    ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
