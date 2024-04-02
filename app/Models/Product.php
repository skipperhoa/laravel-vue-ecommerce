<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [

        "title",
        "description",
        "price",
        "discountPercentage",
        "rating",
        "stock",
        "brand",
        "category",
        "thumbnail",
        "images"
    ];
    public function carts():BelongsToMany{
        return $this->belongsToMany(\App\Models\Cart::class,'cart_item','product_id','cart_id')->withPivot('quantity');
    }
    public function orders():BelongsToMany{
        return $this->belongsToMany(\App\Models\Order::class,'order_details','product_id','order_id')->withPivot('quantity')->withPivot('price');;
    }
}
