<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('sku')->unique()->comment('Stock Keeping Unit');
            $table->foreignId('category_id')->constrained('categories')->onDelete('restrict');
            $table->string('color')->nullable()->comment('Paint color');
            $table->string('size_volume')->comment('Size/volume (1L, 5L, 20L)');
            $table->decimal('selling_price', 10, 2)->comment('Selling price per unit');
            $table->decimal('cost_price', 10, 2)->default(0)->comment('Cost price per unit');
            $table->decimal('current_stock', 10, 2)->default(0)->comment('Current available stock');
            $table->decimal('minimum_stock', 10, 2)->default(0)->comment('Minimum stock level');
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('name');
            $table->index('sku');
            $table->index('category_id');
            $table->index('current_stock');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};