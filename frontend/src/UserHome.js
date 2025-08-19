import React from 'react';

const UserHome = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome, User!</h1>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-gray-700">
                        Your assigned vehicle details will be displayed here in the future.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
