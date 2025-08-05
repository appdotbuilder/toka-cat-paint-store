import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Toka Cat Paint Store">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-6 py-3 text-sm font-medium text-blue-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
                            >
                                📊 Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-6xl lg:flex-row lg:gap-12">
                        {/* Hero Section */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-8">
                                <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-6xl dark:text-white">
                                    🎨 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Toka Cat</span>
                                </h1>
                                <p className="mb-6 text-xl text-gray-600 lg:text-2xl dark:text-gray-300">
                                    Complete Paint Store Management System
                                </p>
                                <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                                    Streamline your paint store operations with inventory management, sales tracking, and comprehensive reporting.
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                                    <div className="mb-3 text-3xl">📦</div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Inventory Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Track raw materials, finished products, and get low stock alerts automatically.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                                    <div className="mb-3 text-3xl">💰</div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Sales & POS</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Process sales transactions, generate invoices, and manage customer data.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                                    <div className="mb-3 text-3xl">📊</div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Reports & Analytics</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Detailed sales reports, profit analysis, and stock level monitoring.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                                    <div className="mb-3 text-3xl">👥</div>
                                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">User Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Role-based access for admins, cashiers, and warehouse staff.
                                    </p>
                                </div>
                            </div>

                            {!auth.user && (
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        🚀 Start Managing Your Store
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        🔑 Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Visual Section */}
                        <div className="flex-1 lg:flex lg:items-center lg:justify-center">
                            <div className="mt-12 rounded-xl bg-white p-8 shadow-xl lg:mt-0 dark:bg-gray-800">
                                <div className="mb-6 text-center">
                                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        🎯 Perfect for Paint Stores
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400">✓</div>
                                        <span className="text-sm font-medium text-green-800 dark:text-green-300">Raw Material Tracking</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-400">✓</div>
                                        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Product Categorization</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-400">✓</div>
                                        <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Supplier Management</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-400">✓</div>
                                        <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Profit Reporting</span>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                        🏪 <strong>Built for small to medium paint stores</strong><br />
                                        Manage everything from base paints to finished products
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    Built with ❤️ by{" "}
                    <a 
                        href="https://app.build" 
                        target="_blank" 
                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        app.build
                    </a>
                </footer>
            </div>
        </>
    );
}