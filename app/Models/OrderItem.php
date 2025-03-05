<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class OrderItem extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'order_id',
        'menu_id',
        'quantity',
        'price'
    ];
}
