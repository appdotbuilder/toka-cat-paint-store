<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with(['customer', 'cashier'])
            ->latest()
            ->paginate(15);

        return Inertia::render('sales/index', [
            'sales' => $sales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::active()->with('category')->get();
        $customers = Customer::active()->get();

        return Inertia::render('sales/create', [
            'products' => $products,
            'customers' => $customers,
            'nextInvoiceNumber' => Sale::generateInvoiceNumber(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            
            // Create the sale
            $sale = Sale::create([
                'invoice_number' => $data['invoice_number'],
                'customer_id' => $data['customer_id'] ?? null,
                'cashier_id' => auth()->id(),
                'sale_date' => $data['sale_date'],
                'subtotal' => $data['subtotal'],
                'tax_amount' => $data['tax_amount'] ?? 0,
                'discount_amount' => $data['discount_amount'] ?? 0,
                'total_amount' => $data['total_amount'],
                'payment_method' => $data['payment_method'],
                'amount_paid' => $data['amount_paid'],
                'change_amount' => $data['change_amount'] ?? 0,
                'notes' => $data['notes'] ?? null,
                'status' => 'completed',
            ]);

            // Create sale items and update product stock
            foreach ($data['items'] as $itemData) {
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'total_price' => $itemData['total_price'],
                ]);

                // Update product stock
                $product = Product::find($itemData['product_id']);
                $product->decrement('current_stock', $itemData['quantity']);
            }
        });

        return redirect()->route('sales.index')
            ->with('success', 'Sale completed successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load(['customer', 'cashier', 'saleItems.product.category']);

        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        // Only allow deletion of pending sales
        if ($sale->status !== 'pending') {
            return redirect()->route('sales.index')
                ->with('error', 'Only pending sales can be deleted.');
        }

        DB::transaction(function () use ($sale) {
            // Restore product stock
            foreach ($sale->saleItems as $item) {
                $product = Product::find($item->product_id);
                $product->increment('current_stock', $item->quantity);
            }

            $sale->delete();
        });

        return redirect()->route('sales.index')
            ->with('success', 'Sale deleted successfully.');
    }
}