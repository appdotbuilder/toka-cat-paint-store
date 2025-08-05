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
        Schema::create('raw_material_stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('raw_material_id')->constrained('raw_materials')->onDelete('cascade');
            $table->enum('type', ['incoming', 'outgoing'])->comment('Stock movement type');
            $table->decimal('quantity', 10, 2)->comment('Quantity moved');
            $table->decimal('unit_price', 10, 2)->default(0)->comment('Unit price for incoming stock');
            $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->onDelete('set null');
            $table->string('reference_number')->nullable()->comment('Invoice or reference number');
            $table->text('notes')->nullable();
            $table->date('movement_date')->comment('Date of stock movement');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            
            $table->index(['raw_material_id', 'type']);
            $table->index('movement_date');
            $table->index('supplier_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_material_stock_movements');
    }
};