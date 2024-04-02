<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id','payment_method_id','payment_amount'
    ];

    public function order():BelongsTo{
        return $this->belongsTo(\App\Models\Order::class);
    }
    public function paymentMethod():BelongsTo{
        return $this->belongsTo(\App\Models\PaymentMethod::class);
    }

}
