<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RawMaterialStockMovement
 *
 * @property int $id
 * @property int $raw_material_id
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property int|null $supplier_id
 * @property string|null $reference_number
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $movement_date
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\RawMaterial $rawMaterial
 * @property-read \App\Models\Supplier|null $supplier
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement query()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereMovementDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereRawMaterialId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereReferenceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereSupplierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement incoming()
 * @method static \Illuminate\Database\Eloquent\Builder|RawMaterialStockMovement outgoing()

 * 
 * @mixin \Eloquent
 */
class RawMaterialStockMovement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'raw_material_id',
        'type',
        'quantity',
        'unit_price',
        'supplier_id',
        'reference_number',
        'notes',
        'movement_date',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'movement_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the raw material for this movement.
     */
    public function rawMaterial(): BelongsTo
    {
        return $this->belongsTo(RawMaterial::class);
    }

    /**
     * Get the supplier for this movement.
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get the user who recorded this movement.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include incoming movements.
     */
    public function scopeIncoming($query)
    {
        return $query->where('type', 'incoming');
    }

    /**
     * Scope a query to only include outgoing movements.
     */
    public function scopeOutgoing($query)
    {
        return $query->where('type', 'outgoing');
    }

    /**
     * Get the total value of this movement.
     */
    public function getTotalValueAttribute(): float
    {
        return $this->quantity * $this->unit_price;
    }
}