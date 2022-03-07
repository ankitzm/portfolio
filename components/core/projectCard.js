import React from 'react';
import Image from 'next/image';
import Profile from "./../../public/ankitzm.png"

function projectCard({ name, description, link }) {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm md:w-72 w-52 sm:w-52">
                <Image className="rounded-t-lg" src={Profile} alt="" />
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {description}
                    </p>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
                    {link.github}
                </div>
            </div>
        </div>
    );
}

export default projectCard;
