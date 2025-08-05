<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SaleItem
 *
 * @property int $id
 * @property int $sale_id
 * @property int $product_id
 * @property float $quantity
 * @property float $unit_price
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Sale $sale
 * @property-read \App\Models\Product $product
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereSaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SaleItem whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class SaleItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the sale for this item.
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * Get the product for this item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the profit for this sale item.
     */
    public function getProfitAttribute(): float
    {
        $costPrice = $this->product->cost_price ?? 0;
        return ($this->unit_price - $costPrice) * $this->quantity;
    }
}