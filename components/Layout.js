import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 via-blue-400 to-violet-400">
            <div className='fixed top-4'>
                <Navbar />
            </div>

            <div className="container h-5/6 p-10 sm:p-16 items-center overflow-auto 
                bg-white shadow-lg sm:rounded-3xl bg-clip-padding bg-opacity-40">
                {children}
            </div>

            <div className="fixed pin z-1 overflow-auto bg-smoke-light">
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
