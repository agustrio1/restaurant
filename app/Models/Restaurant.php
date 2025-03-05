<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Restaurant extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'opening_hours',
        'capacity',
        'image_url',

    ];

    public function tables()
    {
        return $this->hasMany(Table::class);
    }
}
