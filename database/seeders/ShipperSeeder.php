<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shipper;

class ShipperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shipper::factory()->createMany([
            ['shipper_method' => 'Giao Hàng Nhanh','estimed_delivery_time' => '1-2 business days','price' => 50000],
            ['shipper_method' => 'Giao Hàng Tiết Kiệm', 'estimed_delivery_time' => '2-5 business days','price' => 25000],
            ['shipper_method' => 'Giao Hàng Siêu Tốc', 'estimed_delivery_time' => '1-2 hours', 'price' => 70000],
        ]);
    }
}
