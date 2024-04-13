<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','refresh','logout']]);
    }

    public function register(Request $request){


        if($request->providerId=="default"){

                $validator = Validator::make($request->all(),[
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:6',
                ]);
                if($validator->fails()){
                    return response()->json(array("success" => false, "message" =>"Email already exist"), 400);
                }
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

                $token = Auth::guard('api')->login($user);
                return response()->json([
                    'status' => 'success',
                    'message' => 'User created successfully',
                    'user' => $user,
                    'authorisation' => [
                        'token' => $token,
                        'type' => 'bearer',
                    ]
                ]);
        }else{
            $provider = $request->input('providerId');
            $providerData = null;

            switch ($provider) {
                case 'email':
                    $providerData = [
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'providerId' => $provider,
                    ];
                    break;
                case 'phone':
                    $providerData = [
                        'name' => 'Customer'.$request->phoneNumber,
                        'email' => $request->uid.'@hoaguyenit.com',
                        'password' => Hash::make('Customer'.$request->phoneNumber),
                        'photoUrl'=>$request->photoURL,
                        'phone'=>$request->phoneNumber,
                        'providerId' => $provider,
                    ];

                    break;
                case 'google.com':
                    $providerData = [
                        'name' => $request->displayName,
                        'email' => $request->email,
                        'password' => Hash::make('Customer'.$request->uid),
                        'photoUrl'=>$request->photoURL,
                        'providerId' => $provider,
                    ];
                    break;
                case 'github.com':
                    $providerData = [
                        'name' => $request->displayName,
                        'email' => $request->email,
                        'password' => Hash::make('Customer'.$request->uid),
                        'photoUrl'=>$request->photoURL,
                        'providerId' => $provider,
                    ];
                    break;
                case 'facebook':
                    // Handle Facebook registration with Firebase
                    break;
            }
            if(User::where('email', $providerData['email'])->exists()){
                $user = User::where('email', $providerData['email'])->first();
                if($user->providerId!=$provider){
                    $user->providerId=$provider;

                }
                if($provider=='phone'){
                    $user->phone=$providerData['phone'];
                }
                $user->save();

            }else{
                $user = User::create($providerData);
            }
            $token = Auth::guard('api')->login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User  successfully',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ],
                'provider' => $provider
            ]);

        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::guard('api')->user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::guard('api')->user());
    }
    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }


    // public function refresh()
    // {
    //     return response()->json([
    //         'status' => 'success',
    //         'user' => Auth::guard('api')->user(),
    //         'authorisation' => [
    //             'token' => Auth::guard('api')->refresh(),
    //             'type' => 'bearer',
    //         ]
    //     ]);
    // }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function token(Request $request)
    {


        try {
            // Extract the token from the request
            $token = JWTAuth::parseToken()->getToken();

            // Check if the token is valid (including expiration check)
            JWTAuth::setToken($token)->checkOrFail();

            // If the token is still valid
            return response()->json(['message' => 'Success']);



        } catch (Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'Token is invalid'], 401);
        }


    }



}
