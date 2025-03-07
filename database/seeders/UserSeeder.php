<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Jalankan database seed.
     */
    public function run(): void
    {
        // // Admin
        // $adminName = 'Budi Santoso';
        // User::create([
        //     'name' => $adminName,
        //     'email' => $this->generateEmail($adminName),
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('password'),
        //     'remember_token' => Str::random(10),
        //     'role' => 'admin',
        // ]);

        // 5 Staff
        $staffNames = ['Rina Wijaya', 'Doni Saputra', 'Siti Aisyah', 'Joko Prasetyo', 'Lina Kusuma'];

        foreach ($staffNames as $name) {
            User::create([
                'name' => $name,
                'email' => $this->generateEmail($name),
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'role' => 'staff',
            ]);
        }

        // 10 Customer
        $customerNames = [
            'Ahmad Fauzi', 'Fitri Ningsih', 'Rizky Maulana', 'Dewi Lestari', 'Agus Susanto',
            'Citra Permata', 'Hadi Setiawan', 'Nina Kartika', 'Bayu Wicaksono', 'Sari Handayani'
        ];

        foreach ($customerNames as $name) {
            User::create([
                'name' => $name,
                'email' => $this->generateEmail($name),
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'role' => 'customer',
            ]);
        }
    }

    /**
     * Generate email dari nama user.
     */
    private function generateEmail(string $name): string
    {
        $email = strtolower(str_replace(' ', '', $name)) . '@gmail.com';
        return $email;
    }
}
