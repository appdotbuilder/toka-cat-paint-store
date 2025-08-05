import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Sale {
    id: number;
    invoice_number: string;
    sale_date: string;
    total_amount: number;
    payment_method: string;
    status: string;
    customer: {
        name: string;
    } | null;
    cashier: {
        name: string;
    };
}

interface Props {
    sales: {
        data: Sale[];
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
    { title: 'Sales', href: '/sales' },
];

export default function SalesIndex({ sales }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'cash': return '💵';
            case 'card': return '💳';
            case 'transfer': return '🏦';
            default: return '💰';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
            case 'pending': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'cancelled': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
            default: return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const totalSalesAmount = sales.data.reduce((sum, sale) => 
        sale.status === 'completed' ? sum + sale.total_amount : sum, 0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales - Toka Cat Paint Store" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🛒 Sales</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track and manage your paint store sales
                        </p>
                    </div>
                    <Link
                        href="/sales/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                        ➕ New Sale
                    </Link>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{sales.total}</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed Sales</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {sales.data.filter(s => s.status === 'completed').length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(totalSalesAmount)}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average Sale</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {sales.data.length > 0 ? formatCurrency(totalSalesAmount / sales.data.filter(s => s.status === 'completed').length || 0) : '$0.00'}
                        </p>
                    </div>
                </div>

                {/* Sales Table */}
                <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Invoice</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Payment</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Cashier</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.data.map((sale) => (
                                    <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                                {sale.invoice_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                {sale.customer?.name || 'Walk-in Customer'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(sale.sale_date)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(sale.total_amount)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{getPaymentMethodIcon(sale.payment_method)}</span>
                                                <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                                                    {sale.payment_method}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(sale.status)}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {sale.cashier.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/sales/${sale.id}`}
                                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {sales.links && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span>Showing {sales.data.length} of {sales.total} sales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {sales.links.map((link, index) => {
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
                {sales.data.length === 0 && (
                    <div className="rounded-xl border bg-white p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="mx-auto mb-4 text-6xl">🛒</div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">No sales found</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Get started by processing your first paint sale.
                        </p>
                        <Link
                            href="/sales/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                        >
                            ➕ Create First Sale
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}