<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Services\CartService;
use Illuminate\Auth\Access\AuthorizationException;

class CartController extends Controller
{
    protected $cartService;
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(!Auth::check()){
            return response()->json([
                'messsage' => 'You can login first',
            ]);
        }
        $carts = $this->cartService->getCarts_v2();
        return response()->json([
            'status' => 'success',
            'data' => $carts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if(Auth::check()){

            $validate = Validator::make($request->all(),[
                'product_id' => 'required',
                'quantity' => 'required',
            ]);
            if($validate->fails()){
                return response()->json([
                    'status' => 'error',
                    'message' => $validate->errors()
                ]);
            }

            $message = $this->cartService->add_cart_v2($request->product_id, $request->quantity,$array=[]);

            return response()->json([
                'status' => 'success',
                'message'=>$message

            ]);

        }
        return response()->json([
            'status' => 'You need login first',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //throw_if(!Auth::check(), AuthorizationException::class);
        if(Auth::check()){
            return Response()->json(array("status"=>"success","message"=>$this->cartService->remove($id)));
        }
        return Response()->json(array("status"=>"You need login first"));

    }

}
