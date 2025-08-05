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
        Schema::create('raw_materials', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Material name (e.g., base paint, thinner, brushes)');
            $table->text('description')->nullable();
            $table->foreignId('unit_id')->constrained('units')->onDelete('restrict');
            $table->decimal('current_stock', 10, 2)->default(0)->comment('Current available stock');
            $table->decimal('minimum_stock', 10, 2)->default(0)->comment('Minimum stock level for notifications');
            $table->decimal('average_purchase_price', 10, 2)->default(0)->comment('Average purchase price');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('name');
            $table->index('current_stock');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_materials');
    }
};