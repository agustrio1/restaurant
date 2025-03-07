<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class RestaurantTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $restaurantId = '01jnnsf63wj8zc89k1kg208f0p';
        $totalCapacity = 0;
        $targetCapacity = 500;
        $tableNumber = 1;
        $tableCapacity = 10; // Setiap meja memiliki kapasitas 10 orang
        
        while ($totalCapacity < $targetCapacity) {
            // Format nomor meja dengan leading zeros
            $formattedTableNumber = str_pad($tableNumber, 3, '0', STR_PAD_LEFT);
            
            // Buat meja dengan kapasitas 10 orang
            Table::create([
                'restaurant_id' => $restaurantId,
                'table_number' => $formattedTableNumber,
                'capacity' => $tableCapacity,
                'status' => rand(0, 10) < 8 ? 'available' : 'reserved',
            ]);
            
            $totalCapacity += $tableCapacity;
            $tableNumber++;
        }
        
        $this->command->info("Created " . ($tableNumber - 1) . " tables with a total capacity of {$totalCapacity} people.");
    }
}
