<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Reservation extends Model
{
    use HasUlids;
    
    protected $fillable  = [
        'user_id',
        'table_id',
        'reservation_time',
        'status'
    ];
}
