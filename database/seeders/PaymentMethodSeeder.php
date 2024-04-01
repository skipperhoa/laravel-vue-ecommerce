<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;
class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentMethod::factory()->createMany([
            ['payment_method_name' => 'Credit Card'],
            ['payment_method_name' => 'Paypal'],
            ['payment_method_name' => 'Bank Transfer'],
        ]);
    }
}
