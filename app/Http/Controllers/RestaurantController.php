<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantController extends Controller
{
    /**
     * Tampilkan daftar restoran.
     */
    public function index(): Response
    {
        $restaurants = Restaurant::latest()->paginate(10);
        
        return Inertia::render('Restaurants/Index', [
            'restaurants' => $restaurants,
        ]);
    }

    /**
     * Tampilkan form tambah restoran.
     */
    public function create(): Response
    {
        return Inertia::render('Restaurants/Create');
    }

    /**
     * Simpan restoran baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:20',
            'opening_hours' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Upload gambar jika ada
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('restaurants', 'public');
        }

        Restaurant::create([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'opening_hours' => $request->opening_hours,
            'capacity' => $request->capacity,
            'image_url' => $imagePath,
        ]);

        return redirect()->route('dashboard.restaurants.index')->with('success', 'Restaurant created successfully.');
    }

    /**
     * Tampilkan detail restoran.
     */
    public function show(Restaurant $restaurant): Response
    {
        return Inertia::render('Restaurants/Show', [
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Tampilkan form edit restoran.
     */
    public function edit(Restaurant $restaurant): Response
    {
        return Inertia::render('Restaurants/Edit', [
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Update data restoran.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:20',
            'opening_hours' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Update gambar jika ada file baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($restaurant->image_url) {
                Storage::disk('public')->delete($restaurant->image_url);
            }
            $imagePath = $request->file('image')->store('restaurants', 'public');
        } else {
            $imagePath = $restaurant->image_url;
        }

        $restaurant->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'opening_hours' => $request->opening_hours,
            'capacity' => $request->capacity,
            'image_url' => $imagePath,
        ]);

        return redirect()->route('dashboard.restaurants.index')->with('success', 'Restaurant updated successfully.');
    }

    /**
     * Hapus restoran.
     */
    public function destroy(Restaurant $restaurant)
    {
        // Hapus gambar jika ada
        if ($restaurant->image_url) {
            Storage::disk('public')->delete($restaurant->image_url);
        }

        $restaurant->delete();

        return redirect()->route('dashboard.restaurants.index')->with('success', 'Restaurant deleted successfully.');
    }
}