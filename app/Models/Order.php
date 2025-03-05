<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Order extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'reservation_id',
        'user_id',
        'status',
        'total_price'
    ];
}
