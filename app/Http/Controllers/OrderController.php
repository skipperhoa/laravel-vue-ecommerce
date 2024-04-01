<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Shipper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->middleware('auth:api');
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

         try {
            $userId = Auth::id();
            $carts = json_decode($request->carts,true);

            if(count($carts)>0){

                $shipper= Shipper::find($request->shipper_id);
                $promotion= Promotion::where('code',$request->promotion_code)->first();
                $address = $request->address;

                $phone = $request->phone;
                $payment_method = PaymentMethod::where('payment_method_name',$request->payment_method)->first();

                $response = array(
                    'shipper_id' => $shipper?$shipper->id:0,
                    'promotion_id' => $promotion?$promotion->id:0,
                    'address' => $address,
                    'phone' => $phone,
                    'payment_method_id' => $payment_method?$payment_method->id:0,
                    'carts' => $carts
                );

                $product_id = collect($carts)->pluck('id');

                $cartData = collect($carts)->map(function ($item) {
                    return [
                        'id' => $item['id'],
                        'quantity' => $item['quantity']
                    ];
                });
                $products = Product::find($product_id);
                $total =0;

                $products->map(function ($product) use (&$total, $cartData) {
                    $total += $product->price * $cartData->where('id', $product->id)->first()['quantity'];

                });

                $order = new Order();
                $order->user_id = $userId;
                $order->address = $address;
                $order->phone = $phone;
                $order->shipper_id = $shipper?$shipper->id:null;
                $order->promotion_id = $promotion?$promotion->id:null;
                $order->status = 0;
                $order->save();
                $order->payment()->create([
                    'payment_method_id' => $payment_method?$payment_method->id:null,
                    'payment_amount' => $total
                ]);

                $products->map(function ($product) use ($order, $cartData) {
                    $order->products()->attach($product->id, [
                        'quantity' => $cartData->where('id',$product->id)->first()['quantity'],
                        'price' => $product->price
                    ]);

                });

                //remove carts
             /*    $carts = Cart::where('user_id',$userId)->first();
                $carts->products()->detach($product_id);
                $carts->delete(); */

                return response()->json(array("status"=>1,"message"=>"Order created successfully"), 200);
            }
        } catch (\Exception $e) {
            return response()->json(array("status"=>0,"message"=>"Something went wrong"), 404);
        }
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
        //
    }
}
