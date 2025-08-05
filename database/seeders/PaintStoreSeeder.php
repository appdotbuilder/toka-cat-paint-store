<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\RawMaterial;
use App\Models\Supplier;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PaintStoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tokacat.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create cashier user
        User::create([
            'name' => 'Cashier User',
            'email' => 'cashier@tokacat.com',
            'password' => Hash::make('password'),
            'role' => 'cashier',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create warehouse user
        User::create([
            'name' => 'Warehouse User',
            'email' => 'warehouse@tokacat.com',
            'password' => Hash::make('password'),
            'role' => 'warehouse',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create units
        $units = [
            ['name' => 'Liter', 'abbreviation' => 'L', 'description' => 'Volume measurement'],
            ['name' => 'Pieces', 'abbreviation' => 'pcs', 'description' => 'Count measurement'],
            ['name' => 'Kilogram', 'abbreviation' => 'kg', 'description' => 'Weight measurement'],
            ['name' => 'Gallon', 'abbreviation' => 'gal', 'description' => 'Volume measurement'],
        ];

        foreach ($units as $unit) {
            Unit::create($unit);
        }

        // Create categories
        $categories = [
            ['name' => 'Wall Paint', 'description' => 'Interior and exterior wall paints', 'color_code' => '#3B82F6'],
            ['name' => 'Wood Paint', 'description' => 'Paints for wood surfaces', 'color_code' => '#92400E'],
            ['name' => 'Metal Paint', 'description' => 'Anti-rust and protective metal paints', 'color_code' => '#6B7280'],
            ['name' => 'Primer', 'description' => 'Base coats and primers', 'color_code' => '#F59E0B'],
            ['name' => 'Specialty Paint', 'description' => 'Special purpose paints', 'color_code' => '#8B5CF6'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create suppliers
        $suppliers = [
            [
                'name' => 'Paint Supply Co.',
                'contact_person' => 'John Doe',
                'phone' => '+1234567890',
                'email' => 'john@paintsupply.com',
                'address' => '123 Paint Street, City',
                'status' => 'active',
            ],
            [
                'name' => 'Color Masters Inc.',
                'contact_person' => 'Jane Smith',
                'phone' => '+0987654321',
                'email' => 'jane@colormasters.com',
                'address' => '456 Color Avenue, City',
                'status' => 'active',
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }

        // Create raw materials
        $rawMaterials = [
            [
                'name' => 'Base Paint White',
                'description' => 'White base paint for mixing',
                'unit_id' => Unit::where('abbreviation', 'L')->first()->id,
                'current_stock' => 500,
                'minimum_stock' => 50,
                'average_purchase_price' => 25.00,
                'status' => 'active',
            ],
            [
                'name' => 'Paint Thinner',
                'description' => 'Solvent for thinning paint',
                'unit_id' => Unit::where('abbreviation', 'L')->first()->id,
                'current_stock' => 200,
                'minimum_stock' => 20,
                'average_purchase_price' => 15.00,
                'status' => 'active',
            ],
            [
                'name' => 'Paint Brushes',
                'description' => 'Various sizes of paint brushes',
                'unit_id' => Unit::where('abbreviation', 'pcs')->first()->id,
                'current_stock' => 100,
                'minimum_stock' => 20,
                'average_purchase_price' => 5.00,
                'status' => 'active',
            ],
            [
                'name' => 'Color Pigment - Red',
                'description' => 'Red pigment for color mixing',
                'unit_id' => Unit::where('abbreviation', 'kg')->first()->id,
                'current_stock' => 50,
                'minimum_stock' => 5,
                'average_purchase_price' => 45.00,
                'status' => 'active',
            ],
        ];

        foreach ($rawMaterials as $material) {
            RawMaterial::create($material);
        }

        // Create products
        $wallPaintCategory = Category::where('name', 'Wall Paint')->first();
        $woodPaintCategory = Category::where('name', 'Wood Paint')->first();
        $metalPaintCategory = Category::where('name', 'Metal Paint')->first();

        $products = [
            [
                'name' => 'Premium Wall Paint White',
                'sku' => 'PWP001',
                'category_id' => $wallPaintCategory->id,
                'color' => 'White',
                'size_volume' => '5L',
                'selling_price' => 85.00,
                'cost_price' => 60.00,
                'current_stock' => 50,
                'minimum_stock' => 10,
                'description' => 'High-quality white wall paint',
                'status' => 'active',
            ],
            [
                'name' => 'Wood Stain Brown',
                'sku' => 'WSB002',
                'category_id' => $woodPaintCategory->id,
                'color' => 'Brown',
                'size_volume' => '1L',
                'selling_price' => 35.00,
                'cost_price' => 25.00,
                'current_stock' => 30,
                'minimum_stock' => 5,
                'description' => 'Wood stain in rich brown color',
                'status' => 'active',
            ],
            [
                'name' => 'Anti-Rust Metal Paint',
                'sku' => 'ARM003',
                'category_id' => $metalPaintCategory->id,
                'color' => 'Gray',
                'size_volume' => '3L',
                'selling_price' => 65.00,
                'cost_price' => 45.00,
                'current_stock' => 25,
                'minimum_stock' => 5,
                'description' => 'Protective anti-rust paint for metal',
                'status' => 'active',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Create some customers
        Customer::create([
            'name' => 'ABC Construction',
            'phone' => '+1111111111',
            'email' => 'contact@abcconstruction.com',
            'address' => '789 Construction Ave, City',
            'notes' => 'Bulk buyer, good payment history',
            'status' => 'active',
        ]);

        Customer::create([
            'name' => 'DIY Home Store',
            'phone' => '+2222222222',
            'email' => 'orders@diyhome.com',
            'address' => '321 Retail Street, City',
            'notes' => 'Regular customer, weekly orders',
            'status' => 'active',
        ]);
    }
}