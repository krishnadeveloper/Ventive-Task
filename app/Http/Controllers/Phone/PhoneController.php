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


    public function phoneList(Request $request)
    {

        // Search params
        $brandname = trim($request->input('brandname')); // Brandname
        $model = trim($request->input('modal')); // Model;
        $platform = trim($request->input('platform')); // Platform


        return Cellphone::when($brandname,function($query) use($brandname) {

                               $query->where('brandname','LIKE', '%'.$brandname.'%');

                            })
                            ->when($model,function($query) use($model) {

                                $query->where('modal','LIKE', '%'.$model.'%');
 
                             })
                             ->when($platform,function($query) use($platform) {

                                $query->where('platform','LIKE', '%'.$platform.'%');
 
                             })
                            ->paginate('5');
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
        return Cellphone::find($id);
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
            $updatePhone =  Cellphone::find($id);
            $updatePhone->brandname     = $request->brandname;
            $updatePhone->modal         = $request->modal;
            $updatePhone->platform      = $request->platform;
            $updatePhone->cpu           = $request->cpu;
            $updatePhone->simtype       = $request->simtype;
            $updatePhone->usb           = $request->usb;
            $updatePhone->price         = $request->price;
            $updatePhone->status        = $request->status;
            $updatedStatus= $updatePhone->update();


            return response()
                    ->json([
                        'status'=>$updatedStatus,
                        'code'=>200
                    ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deletePhone =  Cellphone::find($id);
        $deleted = $deletePhone->update();
        
        return response()
                ->json([
                    'status'=>$deleted,
                    'code'=>200
                ]);
    }
}
