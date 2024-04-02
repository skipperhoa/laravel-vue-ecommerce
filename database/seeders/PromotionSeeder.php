<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Promotion;
class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo một số mã giảm giá mẫu
        Promotion::create([
            'code' => 'SALE10',
            'discount_percentage' => 10.00,
            'start_date' => '2024-04-01',
            'end_date' => '2024-04-15',
        ]);

        Promotion::create([
            'code' => 'HOLIDAY20',
            'discount_percentage' => 20.00,
            'start_date' => '2024-04-01',
            'end_date' => '2024-04-15',
        ]);
    }
}
