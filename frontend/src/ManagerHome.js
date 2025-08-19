import React from 'react';

const ManagerHome = () => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Manager Menu</h2>
                <ul>
                    <li className="mb-4">
                        <a href="#" className="hover:text-emerald-400">Dashboard</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:text-emerald-400">Assigned Vehicles</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:text-emerald-400">Reports</a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Manager!</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p>This is the main content area. Future features for managing assigned vehicles will be displayed here.</p>
                </div>
            </main>
        </div>
    );
};

export default ManagerHome;
