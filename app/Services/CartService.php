<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
class CartService
{
    protected $items;
    protected $user;

    public function getCarts(){
        $userId = Auth::id();
        $cart = Cart::where('user_id', $userId)->first();
        $items = array();
        if($cart!=null){
            $cartItems = $cart->products;
            if($cartItems->count()>0){
                foreach($cartItems as $key=>$product){
                    $product['quantity'] = $product->pivot->quantity;
                    $items[] = $product;
                }
            }
        }
        return $items;
    }
    public function getCarts_v2(){
        $userId = Auth::id();
        $cart = Cart::where('user_id', $userId)->with('products')->first();
        if(!$cart) {
            return [];
        }
        return $cart->products->map(function($product) {
            $product['quantity'] = $product->pivot->quantity;
            return $product;
        })->all();
    }


    public function add_cart_v1($productId, $qty = null, array $options = [])
    {
        try {
            $product = Product::findOrFail($productId);
        } catch (ModelNotFoundException $exception) {
            return response("User with id {$productId} not found", Response::HTTP_NOT_FOUND);
        }

        // Add a product to the cart
        $userId = Auth::user()->id;
        $check_cart = Cart::where("user_id",$userId)->first();
        $cart_id = null;
        if($check_cart == null){
            $cart = new Cart;
            $cart->user_id = $userId;
            $cart->save();
            $cart_id = $cart->id;
        }
        else{
            $cart_id = $check_cart->id;
        }
        if($cart_id!==null){
            $cart = Cart::find($cart_id);
            $cart_item = $cart->products()->where('product_id', $productId)->get();
            if($cart_item->count()>0){
                $cart->products()->updateExistingPivot($productId, ['quantity' => $qty]);
                return 'update product id '.$productId;

            }else{
                $cart->products()->attach($productId, ['quantity' => $qty]);
                return 'add product id '.$productId;
            }

        }
        return 'not found add cart product id '.$productId;

    }
    public function add_cart_v2($productId, $qty = null, array $options = [])
    {
        try {
            $product = Product::findOrFail($productId);
        } catch (ModelNotFoundException $exception) {
            return response("User with id {$productId} not found", Response::HTTP_NOT_FOUND);
        }

        $userId = Auth::id();
        $cart = Cart::firstOrNew(['user_id' => $userId]);
        if (!$cart->exists) {
            $cart->save();
        }

        $cart->products()->syncWithoutDetaching([$productId => ['quantity' => $qty]]);
        return 'add product id '.$productId;
    }

    public function remove($productId){

        $userId = Auth::id();
        $cart = Cart::where('user_id', $userId)->firstOrFail();
        $cart->products()->detach($productId);
        return 'remove product id ' . $productId;

    }



}
