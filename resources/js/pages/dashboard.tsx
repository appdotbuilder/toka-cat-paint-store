import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    statistics: {
        totalSales: number;
        salesCount: number;
        todaySales: number;
        averageSale: number;
    };
    lowStockProducts: Array<{
        id: number;
        name: string;
        current_stock: number;
        minimum_stock: number;
        category: {
            name: string;
        };
    }>;
    lowStockRawMaterials: Array<{
        id: number;
        name: string;
        current_stock: number;
        minimum_stock: number;
        unit: {
            abbreviation: string;
        };
    }>;
    recentSales: Array<{
        id: number;
        invoice_number: string;
        total_amount: number;
        sale_date: string;
        customer?: {
            name: string;
        };
        cashier: {
            name: string;
        };
    }>;
    chartData: Record<string, number>;
    userRole: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    statistics, 
    lowStockProducts, 
    lowStockRawMaterials, 
    recentSales, 
    userRole 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Toka Cat Paint Store" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Header */}
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <h1 className="mb-2 text-2xl font-bold">🎨 Welcome to Toka Cat Paint Store</h1>
                    <p className="text-blue-100">
                        Your complete paint store management dashboard - Role: <span className="font-semibold capitalize">{userRole}</span>
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales (Month)</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(statistics.totalSales)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Sales Count</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {statistics.salesCount}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(statistics.todaySales)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                                <span className="text-2xl">🧮</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Average Sale</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(statistics.averageSale)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Low Stock Products */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-xl">⚠️</span>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Products</h2>
                        </div>
                        
                        {lowStockProducts.length > 0 ? (
                            <div className="space-y-3">
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                                {product.current_stock} / {product.minimum_stock}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">All products are well stocked! 🎉</p>
                        )}
                    </div>

                    {/* Low Stock Raw Materials */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-xl">📦</span>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Raw Materials</h2>
                        </div>
                        
                        {lowStockRawMaterials.length > 0 ? (
                            <div className="space-y-3">
                                {lowStockRawMaterials.map((material) => (
                                    <div key={material.id} className="flex items-center justify-between rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{material.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                                {material.current_stock} {material.unit.abbreviation} / {material.minimum_stock} {material.unit.abbreviation}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">All raw materials are well stocked! 🎉</p>
                        )}
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-xl">🧾</span>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sales</h2>
                    </div>
                    
                    {recentSales.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="pb-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Invoice</th>
                                        <th className="pb-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
                                        <th className="pb-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                                        <th className="pb-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                                        <th className="pb-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Cashier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSales.map((sale) => (
                                        <tr key={sale.id} className="border-b border-gray-100 dark:border-gray-800">
                                            <td className="py-2 font-medium text-gray-900 dark:text-white">{sale.invoice_number}</td>
                                            <td className="py-2 text-gray-600 dark:text-gray-400">
                                                {sale.customer?.name || 'Walk-in Customer'}
                                            </td>
                                            <td className="py-2 font-medium text-green-600 dark:text-green-400">
                                                {formatCurrency(sale.total_amount)}
                                            </td>
                                            <td className="py-2 text-gray-600 dark:text-gray-400">{formatDate(sale.sale_date)}</td>
                                            <td className="py-2 text-gray-600 dark:text-gray-400">{sale.cashier.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No recent sales to display.</p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-xl">⚡</span>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <a
                            href="/sales/create"
                            className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
                        >
                            <span className="text-2xl">🛒</span>
                            <span className="font-medium text-blue-700 dark:text-blue-300">New Sale</span>
                        </a>
                        
                        <a
                            href="/products"
                            className="flex items-center gap-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                        >
                            <span className="text-2xl">🎨</span>
                            <span className="font-medium text-green-700 dark:text-green-300">Products</span>
                        </a>
                        
                        <a
                            href="/products/create"
                            className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 transition-colors hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
                        >
                            <span className="text-2xl">➕</span>
                            <span className="font-medium text-purple-700 dark:text-purple-300">Add Product</span>
                        </a>
                        
                        <a
                            href="/sales"
                            className="flex items-center gap-3 rounded-lg bg-orange-50 p-4 transition-colors hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="font-medium text-orange-700 dark:text-orange-300">View Sales</span>
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}