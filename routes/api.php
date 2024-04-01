<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('register',[AuthController::class,'register']);
    Route::post('login', [AuthController::class,'login']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('me',  [AuthController::class,'me']);
    Route::get('token',  [AuthController::class,'token']);

    Route::apiResource('carts',App\Http\Controllers\CartController::class);
    Route::apiResource('promotions',App\Http\Controllers\PromotionController::class);
    Route::apiResource('orders',App\Http\Controllers\OrderController::class);


});
Route::apiResource('/products',App\Http\Controllers\ProductController::class);

Route::apiResource('/shippers',App\Http\Controllers\ShipperController::class);
Route::apiResource('/payment_methods',App\Http\Controllers\PaymentMethodController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
