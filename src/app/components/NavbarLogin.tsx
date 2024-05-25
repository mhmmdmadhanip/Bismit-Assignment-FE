import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center overflow-x-auto">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="https://oprec-bem-fasilkom.vercel.app/assets/images/Logo/BEM.svg" className="w-8" alt="Logo" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link className="text-white mr-4" href="/login">
                        Login
                    </Link>
                    <Link className="text-white" href="/register">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
