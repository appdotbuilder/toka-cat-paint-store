import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    sku: string;
    color: string | null;
    size_volume: string;
    selling_price: number;
    current_stock: number;
    minimum_stock: number;
    status: string;
    category: {
        name: string;
        color_code: string | null;
    };
}

interface Props {
    products: {
        data: Product[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

export default function ProductsIndex({ products }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getStockStatus = (current: number, minimum: number) => {
        if (current <= minimum) return 'low';
        if (current <= minimum * 1.5) return 'medium';
        return 'good';
    };

    const getStockColor = (status: string) => {
        switch (status) {
            case 'low': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
            case 'medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
            default: return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products - Toka Cat Paint Store" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🎨 Products</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your paint products and inventory
                        </p>
                    </div>
                    <Link
                        href="/products/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                        ➕ Add Product
                    </Link>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.total}</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Products</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {products.data.filter(p => p.status === 'active').length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {products.data.filter(p => p.current_stock <= p.minimum_stock).length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {new Set(products.data.map(p => p.category.name)).size}
                        </p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => {
                                    const stockStatus = getStockStatus(product.current_stock, product.minimum_stock);
                                    return (
                                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>SKU: {product.sku}</span>
                                                        {product.color && (
                                                            <>
                                                                <span>•</span>
                                                                <span>{product.color}</span>
                                                            </>
                                                        )}
                                                        <span>•</span>
                                                        <span>{product.size_volume}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {product.category.color_code && (
                                                        <div 
                                                            className="h-3 w-3 rounded-full"
                                                            style={{ backgroundColor: product.category.color_code }}
                                                        />
                                                    )}
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        {product.category.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {formatCurrency(product.selling_price)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStockColor(stockStatus)}`}>
                                                        {product.current_stock} / {product.minimum_stock}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    product.status === 'active' 
                                                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                        : 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                                                }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/products/${product.id}/edit`}
                                                        className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {products.links && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span>Showing {products.data.length} of {products.total} products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {products.links.map((link, index) => {
                                    if (!link.url) {
                                        return (
                                            <span 
                                                key={index}
                                                className="px-3 py-1 text-sm text-gray-400 dark:text-gray-600"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {products.data.length === 0 && (
                    <div className="rounded-xl border bg-white p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="mx-auto mb-4 text-6xl">🎨</div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">No products found</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Get started by adding your first paint product to the inventory.
                        </p>
                        <Link
                            href="/products/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                        >
                            ➕ Add First Product
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}