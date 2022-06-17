import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 via-blue-400 to-violet-400">
            <div className='top-2 mb-6 sm:mb-4'>
                <Navbar />
            </div>

            <div className="container h-5/6 p-10 sm:p-16 overflow-auto 
                bg-white sm:rounded-t-3xl bg-clip-padding bg-opacity-40 flex flex-wrap">
                {children}
            </div>
        </div>
    );
}

export default Layout;
