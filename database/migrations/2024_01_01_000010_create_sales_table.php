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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique()->comment('Sales invoice number');
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('set null');
            $table->foreignId('cashier_id')->constrained('users')->onDelete('restrict');
            $table->date('sale_date')->comment('Date of sale');
            $table->decimal('subtotal', 12, 2)->comment('Subtotal before tax/discount');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('discount_amount', 10, 2)->default(0)->comment('Discount amount');
            $table->decimal('total_amount', 12, 2)->comment('Final total amount');
            $table->enum('payment_method', ['cash', 'transfer', 'card'])->default('cash');
            $table->decimal('amount_paid', 12, 2)->comment('Amount paid by customer');
            $table->decimal('change_amount', 10, 2)->default(0)->comment('Change given to customer');
            $table->text('notes')->nullable();
            $table->enum('status', ['completed', 'pending', 'cancelled'])->default('completed');
            $table->timestamps();
            
            $table->index('invoice_number');
            $table->index('sale_date');
            $table->index('cashier_id');
            $table->index('customer_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};