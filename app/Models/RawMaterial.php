<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\RawMaterial
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $unit_id
 * @property float $current_stock
 * @property float $minimum_stock
 * @property float $average_purchase_price
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Unit $unit
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RawMaterialStockMovement[] $stockMovements
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial query()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereAveragePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereCurrentStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereMinimumStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereUnitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial active()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterial lowStock()

 * 
 * @mixin \Eloquent
 */
class RawMaterial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'unit_id',
        'current_stock',
        'minimum_stock',
        'average_purchase_price',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'current_stock' => 'decimal:2',
        'minimum_stock' => 'decimal:2',
        'average_purchase_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the unit for this raw material.
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /**
     * Get the stock movements for this raw material.
     */
    public function stockMovements(): HasMany
    {
        return $this->hasMany(RawMaterialStockMovement::class);
    }

    /**
     * Scope a query to only include active raw materials.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include low stock items.
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('current_stock', '<=', 'minimum_stock');
    }

    /**
     * Check if the material is low on stock.
     */
    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->minimum_stock;
    }
}