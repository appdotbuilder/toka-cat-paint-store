<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\RawMaterial;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get date range for statistics (default to current month)
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        // Sales statistics
        $totalSales = Sale::completed()
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->sum('total_amount');

        $salesCount = Sale::completed()
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->count();

        $todaySales = Sale::completed()
            ->whereDate('sale_date', today())
            ->sum('total_amount');

        // Stock alerts
        $lowStockProducts = Product::active()
            ->lowStock()
            ->with('category')
            ->take(5)
            ->get();

        $lowStockRawMaterials = RawMaterial::active()
            ->lowStock()
            ->with('unit')
            ->take(5)
            ->get();

        // Recent sales
        $recentSales = Sale::completed()
            ->with(['customer', 'cashier'])
            ->latest()
            ->take(5)
            ->get();

        // Chart data - Daily sales for current month
        $dailySales = Sale::completed()
            ->whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('DATE(sale_date) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('total', 'date');

        return Inertia::render('dashboard', [
            'statistics' => [
                'totalSales' => $totalSales,
                'salesCount' => $salesCount,
                'todaySales' => $todaySales,
                'averageSale' => $salesCount > 0 ? $totalSales / $salesCount : 0,
            ],
            'lowStockProducts' => $lowStockProducts,
            'lowStockRawMaterials' => $lowStockRawMaterials,
            'recentSales' => $recentSales,
            'chartData' => $dailySales,
            'userRole' => $user->role,
        ]);
    }
}