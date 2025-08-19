import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            const { token } = data;
            localStorage.setItem('token', token);

            // Decode the token to get the role
            const decodedPayload = JSON.parse(atob(token.split('.')[1]));
            const userRole = decodedPayload.role;
            localStorage.setItem('role', userRole);

            // Redirect based on role
            switch (userRole) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'manager':
                    navigate('/manager');
                    break;
                case 'user':
                    navigate('/user');
                    break;
                default:
                    setError('Invalid role specified.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    break;
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Pane: Branding */}
            <div className="hidden lg:flex w-1/2 bg-emerald-700 items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-5xl font-bold mb-4">Vehicle Management</h1>
                    <p className="text-xl">Your one-stop solution for fleet control.</p>
                </div>
            </div>

            {/* Right Pane: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-emerald-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-emerald-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
