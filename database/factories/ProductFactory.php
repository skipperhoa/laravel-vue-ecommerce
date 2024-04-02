<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create();

        return [
            'title' => $faker->word,
            'description' => $faker->sentence,
            'price' => $faker->randomFloat(2, 100, 1000),
            'discountPercentage' => $faker->randomFloat(2, 0, 50),
            'rating' => $faker->randomFloat(2, 1, 5),
            'stock' => $faker->numberBetween(0, 100),
            'brand' => $faker->company,
            'category' => $faker->word,
            'thumbnail' => $faker->imageUrl(200, 200),
            'images' => json_encode([
                $faker->imageUrl(800, 600),
                $faker->imageUrl(800, 600),
                $faker->imageUrl(800, 600),
            ]),
        ];
    }
}
