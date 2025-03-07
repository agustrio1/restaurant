<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// 🔹 Route yang bisa diakses oleh semua user (umum)
require __DIR__.'/restaurant.php';
require __DIR__.'/table.php';
require __DIR__ . '/auth.php';

// 🔹 Route yang hanya bisa diakses oleh Admin & Staff
Route::middleware(['auth', 'verified', RoleMiddleware::class.':admin,staff'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Masukkan hanya route yang khusus admin/staff
    require __DIR__.'/settings.php';
});
