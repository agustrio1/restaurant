<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Menu extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'restaurant_id',
        'name',
        'description',
        'price',
        'image_url'
    ];
}
