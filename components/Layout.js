import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="bg-blue-200 h-screen flex flex-col justify-center items-center">
            <div className='fixed top-4'>
                <Navbar />
            </div>

            <div className="container px-6 py-4 lg:flex lg:h-128 lg:py-16 bg-yellow-400 items-center border-4 border-red-800">
                {children}
            </div>

            <div className='fixed bottom-4'>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
