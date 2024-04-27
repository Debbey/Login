<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
{
    // Validate the incoming request data
    $request->validate([
        'guestfname' => 'required', 
        'guestlname' => 'required', 
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'phone' => 'required|unique:users',
    ]);

    // Create and save the new user
    $user = User::create([
        'guestfname' => $request->guestfname, 
        'guestlname' => $request->guestlname, 
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'phone' => $request->phone,
    ]);

    // Return a success response
    return response()->json(['message' => 'User registered successfully'], 201);
}
    /**
     * Authenticate a user and generate a token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (auth()->attempt($request->only('email', 'password'))) {
            // Authentication successful, generate token
            $user = auth()->user();
            $token = $user->createToken('AuthToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        // Authentication failed, return error response
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}