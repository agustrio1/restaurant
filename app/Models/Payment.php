<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Payment extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'reservation_id',
        'user_id',
        'amount',
        'payment_method',
        'payment_status',
        'transaction_id'
    ];
}
