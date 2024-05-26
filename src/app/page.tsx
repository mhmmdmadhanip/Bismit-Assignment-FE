'use client';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

interface User {
  id: number;
  username: string;
  fullname: string;
  phonenumber: string;
}

export default function Home() {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const route = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userCookie = getCookie('user');
      
      if (!userCookie) {
        route.push('/login');
        throw new Error('User ID not found in cookies');
      }

      const parsedUser = JSON.parse(userCookie.toString());
      setId(parsedUser.user.id);
      setUsername(parsedUser.user.username);
      setFullname(parsedUser.user.fullname);
      setPhonenumber(parsedUser.user.phonenumber);
    };

    fetchUser();
  }, []);

  const handleEditProfile = () => {
    route.push('/profil')
    console.log('Edit Profile Clicked');
  };

  const handleDeleteAccount = async () => {
    if (id) {
      try {
        const response = await fetch(`http://localhost:8000/user/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Account deleted');
          deleteCookie("user");
          route.push('/login');
        } else {
          console.error('Failed to delete account');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleLogout = () => {
    deleteCookie("user");
    route.push('/login');
    console.log('Logout Clicked');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Full Name:</strong> {fullname}</p>
        <p><strong>Phone Number:</strong> {phonenumber}</p>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition-colors duration-300"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600 transition-colors duration-300"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
