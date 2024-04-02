<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Http\Resources\PromotionResource;
use Illuminate\Support\Carbon;
class PromotionController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PromotionResource(Promotion::all());
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
        // Tìm kiếm mã giảm giá dựa trên code
        $promotion = Promotion::where('code', $id)->first();

        // Kiểm tra xem có mã giảm giá được tìm thấy không
        if ($promotion) {
            // Kiểm tra ngày hiện tại so với ngày bắt đầu và kết thúc của mã giảm giá
            $now = Carbon::now();
            $start_date = Carbon::parse($promotion->start_date);
            $end_date = Carbon::parse($promotion->end_date);

            if ($now->between($start_date, $end_date)) {
                // Nếu mã giảm giá còn hiệu lực, trả về dữ liệu mã giảm giá
                return new PromotionResource($promotion);
            } else {
                // Nếu mã giảm giá đã hết hạn, trả về -1
                return response()->json(['message' => 'Promotion has expired'], 404);
            }
        } else {
            // Nếu không tìm thấy mã giảm giá, trả về -1
            return response()->json(['message' => 'Promotion not found'], 404);
        }
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
