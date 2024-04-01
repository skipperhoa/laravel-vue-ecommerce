<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','status','address','phone','shipper_id','promotion_id'

    ];
    public function user():BelongsTo{
        return $this->belongsTo(\App\Models\User::class);
    }
    public function payment():HasOne{
        return $this->hasOne(\App\Models\Payment::class);
    }
    public function products() : BelongsToMany{
        return $this->belongsToMany(\App\Models\Product::class,'order_details','order_id','product_id')->withPivot('quantity')->withPivot('price');
    }
}
