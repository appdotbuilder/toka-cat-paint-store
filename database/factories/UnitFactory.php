<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Unit>
     */
    protected $model = Unit::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $units = [
            ['name' => 'Liter', 'abbreviation' => 'L'],
            ['name' => 'Pieces', 'abbreviation' => 'pcs'],
            ['name' => 'Kilogram', 'abbreviation' => 'kg'],
            ['name' => 'Gram', 'abbreviation' => 'g'],
            ['name' => 'Meter', 'abbreviation' => 'm'],
            ['name' => 'Gallon', 'abbreviation' => 'gal'],
        ];

        $unit = fake()->randomElement($units);

        return [
            'name' => $unit['name'],
            'abbreviation' => $unit['abbreviation'],
            'description' => fake()->optional()->sentence(),
        ];
    }
}