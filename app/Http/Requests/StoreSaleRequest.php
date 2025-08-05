<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invoice_number' => 'required|string|unique:sales,invoice_number',
            'customer_id' => 'nullable|exists:customers,id',
            'sale_date' => 'required|date',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,transfer,card',
            'amount_paid' => 'required|numeric|min:0',
            'change_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'invoice_number.required' => 'Invoice number is required.',
            'invoice_number.unique' => 'This invoice number already exists.',
            'sale_date.required' => 'Sale date is required.',
            'total_amount.required' => 'Total amount is required.',
            'payment_method.required' => 'Payment method is required.',
            'amount_paid.required' => 'Amount paid is required.',
            'items.required' => 'At least one item is required.',
            'items.min' => 'At least one item is required.',
        ];
    }
}