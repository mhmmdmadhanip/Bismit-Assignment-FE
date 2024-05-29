'use client';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react';
import Navbar from '../components/NavbarLogin';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const router = useRouter();

    const create = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('https://bismit-assignment-1enz3ya69-muhammad-madhani-putras-projects.vercel.app/user/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                fullname,
                phonenumber
            })
        });

        await router.push('login');
    }

    return (
        <>
    <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
                onSubmit={create}
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    onChange={e => setFullname(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    onChange={e => setPhonenumber(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Register
                </button>
            </form>
        </div></>
    )
}

export default RegisterPage;
