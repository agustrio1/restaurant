<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\Log;

class TableController extends Controller
{
    /**
     * Menampilkan daftar meja
     *
     * @return InertiaResponse
     */
    public function index(Request $request)
{
    $query = Table::with('restaurant');
 
    $sortField = $request->input('sort', 'table_number');
    $sortOrder = $request->input('order', 'asc');
    $query->orderBy($sortField, $sortOrder);
    
    $tables = $query->paginate(10);
    
    return Inertia::render('Tables/Index', [
        'tables' => $tables
    ]);
}

    /**
     * Menampilkan form untuk membuat meja baru
     *
     * @return InertiaResponse
     */
    public function create(): InertiaResponse
    {
        $restaurants = Restaurant::select('id', 'name')->get();

        return Inertia::render('Tables/Create', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Menyimpan meja baru ke database
     *
     * @param  Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        Log::info('Store Table Request:', $request->all());

        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'table_number' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) use ($request) {
                    $exists = Table::where('restaurant_id', $request->restaurant_id)
                        ->where('table_number', $value)
                        ->exists();

                    if ($exists) {
                        $fail('Nomor meja ini sudah digunakan di restoran tersebut.');
                    }
                },
            ],
            'capacity' => 'required|integer|min:1',
            'status' => 'required|in:available,reserved',
        ]);

        Table::create([
            'restaurant_id' => $validated['restaurant_id'],
            'table_number' => $validated['table_number'],
            'capacity' => $validated['capacity'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('dashboard.tables.index')
            ->with('success', 'Meja berhasil ditambahkan.');
    }
    
    /**
     * Menampilkan detail meja
     *
     * @param  Table  $table
     * @return InertiaResponse
     */
    public function show(Table $table): InertiaResponse
    {
        $table->load('restaurant');

        return Inertia::render('Tables/Show', [
            'table' => $table
        ]);
    }

    /**
     * Menampilkan form untuk mengedit meja
     *
     * @param  Table  $table
     * @return InertiaResponse
     */
    public function edit(Table $table): InertiaResponse
    {
        $restaurants = Restaurant::select('id', 'name')->get();

        return Inertia::render('Tables/Edit', [
            'table' => $table,
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Memperbarui data meja
     *
     * @param  Request  $request
     * @param  Table  $table
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Table $table)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'table_number' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) use ($request, $table) {
                    $exists = Table::where('restaurant_id', $request->restaurant_id)
                        ->where('table_number', $value)
                        ->where('id', '!=', $table->id)
                        ->exists();

                    if ($exists) {
                        $fail('Nomor meja ini sudah digunakan di restoran tersebut.');
                    }
                },
            ],
            'capacity' => 'required|integer|min:1',
            'status' => 'required|in:available,reserved',
        ]);

        $table->update([
            'restaurant_id' => $validated['restaurant_id'],
            'table_number' => $validated['table_number'],
            'capacity' => $validated['capacity'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('dashboard.tables.index')
            ->with('success', 'Meja berhasil diperbarui.');
    }

    /**
     * Menghapus meja
     *
     * @param  Table  $table
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Table $table)
    {
        $table->delete();

        return redirect()->route('dashboard.tables.index')
            ->with('success', 'Meja berhasil dihapus.');
    }
}