<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Category>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Wall Paint', 'color' => '#3B82F6'],
            ['name' => 'Wood Paint', 'color' => '#92400E'],
            ['name' => 'Metal Paint', 'color' => '#6B7280'],
            ['name' => 'Primer', 'color' => '#F59E0B'],
            ['name' => 'Specialty Paint', 'color' => '#8B5CF6'],
        ];

        $category = fake()->randomElement($categories);

        return [
            'name' => $category['name'],
            'description' => fake()->optional()->sentence(),
            'color_code' => $category['color'],
        ];
    }
}