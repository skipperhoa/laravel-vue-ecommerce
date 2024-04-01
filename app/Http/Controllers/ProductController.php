<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::when(request('title'), function ($query) {
            return $query->where('title', 'LIKE', '%' . request('title') . '%');
        })
        ->when(request('description'), function ($query) {
            return $query->where('description', 'LIKE', '%' . request('description') . '%');
        })
        ->orderBy('created_at', 'desc')
       ->paginate(9);
        // Append query parameters to pagination links if they exist
        $queryParams = collect(request()->only('title', 'description'))->filter();
        if ($queryParams->isNotEmpty()) {
            $products->appends($queryParams->all());
        }
        return ProductResource::collection($products);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new ProductResource(Product::find($id));
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
