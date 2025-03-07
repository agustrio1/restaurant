<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

// Rute untuk admin
Route::middleware(['auth'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
});

// Rute untuk user (tanpa login middleware karena user_id dari cookie)
Route::get('/reservations', [ReservationController::class, 'userIndex'])->name('reservations.user.index');
Route::get('/reservations/create', [ReservationController::class, 'userCreate'])->name('reservations.user.create');
Route::post('/reservations', [ReservationController::class, 'userStore'])->name('reservations.user.store');
Route::delete('/reservations/{reservation}', [ReservationController::class, 'userDestroy'])->name('reservations.user.destroy');

