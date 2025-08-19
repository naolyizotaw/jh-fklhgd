import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state for creating a new user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Handle case where the endpoint might not exist
                if (response.status === 404) {
                    throw new Error('User list API endpoint not found. Please ask the administrator to set it up.');
                }
                const data = await response.json();
                throw new Error(data.message || 'Failed to fetch users.');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create user.');
            }

            setSuccess(`User "${username}" created successfully!`);
            // Reset form
            setUsername('');
            setPassword('');
            setRole('user');
            // Refresh the user list
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h1>

                {/* Create User Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Create New Account</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
                    {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}
                    <form onSubmit={handleCreateUser}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                {/* User List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Existing Users</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border-b">Username</th>
                                    <th className="py-2 px-4 border-b">Role</th>
                                    <th className="py-2 px-4 border-b">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="py-2 px-4 border-b text-center">{user.username}</td>
                                            <td className="py-2 px-4 border-b text-center">{user.role}</td>
                                            <td className="py-2 px-4 border-b text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-4 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
