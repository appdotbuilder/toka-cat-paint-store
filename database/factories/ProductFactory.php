<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Brown'];
        $sizes = ['1L', '5L', '20L', '0.5L', '3L'];
        $costPrice = fake()->randomFloat(2, 50, 300);
        $sellingPrice = $costPrice * fake()->randomFloat(2, 1.2, 2.0); // 20-100% markup

        return [
            'name' => fake()->words(2, true) . ' Paint',
            'sku' => fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'category_id' => Category::factory(),
            'color' => fake()->randomElement($colors),
            'size_volume' => fake()->randomElement($sizes),
            'selling_price' => $sellingPrice,
            'cost_price' => $costPrice,
            'current_stock' => fake()->randomFloat(2, 0, 100),
            'minimum_stock' => fake()->randomFloat(2, 5, 20),
            'description' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_stock' => fake()->randomFloat(2, 0, 5),
            'minimum_stock' => fake()->randomFloat(2, 10, 20),
        ]);
    }
}