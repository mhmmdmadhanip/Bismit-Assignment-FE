'use client'
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react';

const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const editProfile = async () => {
        try {
            const userCookie = getCookie('user');
      
            if (!userCookie) {
                throw new Error('User ID not found in cookies');
            }

            const parsedUser = JSON.parse(userCookie.toString());
            const id = parsedUser.user.id;


            const response = await fetch(`http://localhost:8000/user/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname,
                    phonenumber
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            return updatedUser;
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    const edit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const updatedUser = await editProfile();
        console.log(updatedUser);

        if (updatedUser) {
            setCookie("user", updatedUser);
            router.push('/');
        } else {
            setError('Login failed: invalid user data');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
                onSubmit={edit}
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={phonenumber}
                    onChange={e => setPhonenumber(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Edit Profile
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
