<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Table extends Model
{
    use HasFactory, HasUlids;

    /**
     * Tipe ID yang digunakan adalah ULID
     */
    protected $keyType = 'string';

    /**
     * ID tidak auto-increment
     */
    public $incrementing = false;

    /**
     * Atribut yang dapat diisi massal
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'restaurant_id',
        'table_number',
        'capacity',
        'status',
    ];

    /**
     * Relasi ke restaurant
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}