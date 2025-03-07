<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class ReservationController extends Controller
{
    /**
     * Menampilkan daftar reservasi untuk admin.
     */
    public function index(Request $request): InertiaResponse
    {
        $query = Reservation::with(['user', 'table']);

        $sortField = $request->input('sort', 'reservation_time');
        $sortOrder = $request->input('order', 'asc');
        $query->orderBy($sortField, $sortOrder);

        $reservations = $query->paginate(10);

        return Inertia::render('Dashboard/Reservations/Index', [
            'reservations' => $reservations
        ]);
    }

    /**
     * Menampilkan form untuk admin membuat reservasi.
     */
    public function create(): InertiaResponse
    {
        $tables = Table::select('id', 'table_number')->get();
        return Inertia::render('Dashboard/Reservations/Create', [
            'tables' => $tables
        ]);
    }

    /**
     * Menyimpan reservasi dari sisi admin.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'table_id' => 'required|exists:tables,id',
            'reservation_time' => 'required|date',
        ]);

        Reservation::create($validated);

        return redirect()->route('dashboard.reservations.index')
            ->with('success', 'Reservasi berhasil dibuat.');
    }

    /**
     * Mengedit reservasi oleh admin.
     */
    public function edit(Reservation $reservation): InertiaResponse
    {
        $tables = Table::select('id', 'table_number')->get();
        return Inertia::render('Dashboard/Reservations/Edit', [
            'reservation' => $reservation,
            'tables' => $tables
        ]);
    }

    /**
     * Mengupdate reservasi oleh admin.
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'reservation_time' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation->update($validated);

        return redirect()->route('dashboard.reservations.index')
            ->with('success', 'Reservasi berhasil diperbarui.');
    }

    /**
     * Menghapus reservasi oleh admin.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->route('dashboard.reservations.index')
            ->with('success', 'Reservasi berhasil dihapus.');
    }

    /**
     * Menampilkan form untuk user membuat reservasi dari frontend.
     */
    public function userCreate(): InertiaResponse
    {
        $tables = Table::select('id', 'table_number')->get();
        return Inertia::render('Reservations/UserCreate', [
            'tables' => $tables
        ]);
    }

    /**
     * Menyimpan reservasi dari sisi user.
     */
    public function userStore(Request $request)
    {
        Log::info('User Store Reservation Request:', $request->all());

        $userId = Auth::id();
        if (!$userId) {
            return redirect()->back()->withErrors(['error' => 'Anda harus login untuk membuat reservasi.']);
        }

        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'reservation_time' => 'required|date',
        ]);

        Reservation::create([
            'user_id' => $userId,
            'table_id' => $validated['table_id'],
            'reservation_time' => $validated['reservation_time'],
            'status' => 'pending',
        ]);

        return redirect()->route('reservations.user.index')
            ->with('success', 'Reservasi berhasil dibuat.');
    }

    /**
     * Menampilkan daftar reservasi milik user yang login.
     */
    public function userIndex(Request $request): InertiaResponse
    {
        $userId = Auth::id();
        if (!$userId) {
            return Inertia::render('auth/login', [
                'errors' => collect(['error' => 'Anda harus login untuk melihat reservasi Anda.'])
            ]);
        }

        $reservations = Reservation::where('user_id', $userId)
            ->with('table')
            ->orderBy('reservation_time', 'desc')
            ->paginate(10);

        return Inertia::render('Reservations/UserIndex', [
            'reservations' => $reservations
        ]);
    }

    /**
     * Menghapus reservasi milik user.
     */
    public function userDestroy(Reservation $reservation)
    {
        $userId = Auth::id();
        if ($reservation->user_id != $userId) {
            return redirect()->back()->withErrors(['error' => 'Anda tidak diizinkan menghapus reservasi ini.']);
        }

        $reservation->delete();

        return redirect()->route('reservations.user.index')
            ->with('success', 'Reservasi berhasil dibatalkan.');
    }
}
