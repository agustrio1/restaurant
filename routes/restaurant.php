<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::get('/abouts', [RestaurantController::class, 'publicIndex'])->name('public.restaurants');

Route::middleware(['auth', 'verified'])->group(function () {
    // Restaurants resource routes under /dashboard/restaurants
    Route::resource('dashboard/restaurants', RestaurantController::class)
        ->names([
            'index' => 'dashboard.restaurants.index',
            'create' => 'dashboard.restaurants.create',
            'store' => 'dashboard.restaurants.store',
            'show' => 'dashboard.restaurants.show',
            'edit' => 'dashboard.restaurants.edit',
            'update' => 'dashboard.restaurants.update',
            'destroy' => 'dashboard.restaurants.destroy',
        ]);
});