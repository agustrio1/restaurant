<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Table extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'restaurant_id',
        'table_number',
        'capacity',
        'status '
    ];
}
