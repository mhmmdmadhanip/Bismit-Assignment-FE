'use client';
import React, { SyntheticEvent, useState } from 'react';
import Navbar from '../components/NavbarLogin';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://bismit-assignment-1enz3ya69-muhammad-madhani-putras-projects.vercel.app/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();
            return user;
        } catch (error) {
            setError('Invalid username or password');
            return null;
        }
    };

    const login = async (e: SyntheticEvent) => {
        e.preventDefault();
       
        const user = await handleLogin();
    
        if (user) {
            setCookie("user", user);
            router.push('/');
        } else {
            setError('Login failed: invalid user data');
        }
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <form className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md" onSubmit={login}>
                    <h1 className="text-2xl font-bold mb-3">Please sign in</h1>

                    {error && <p className="text-red-500 mb-3">{error}</p>}

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
