import React from 'react';
import Image from 'next/image';
import { linkIcon, github } from "./../../public/icon"

function projectCard({ name, description, image, links }) {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm w-60 sm:w-52 md:w-72 relative">

                <Image
                    alt='Project Image'
                    src={image}
                    width={600}
                    height={360}

                />

                <div className="p-6">
                    <h5 className="text-gray-900 font-bold text-xl mb-2">{name}</h5>
                    <p className="text-gray-700 text-base my-4 mb-6">
                        {description}
                    </p>
                    <div className='flex gap-4 absolute bottom-0 mb-1'>
                        <a href={links.github} target="_blank" rel='noreferrer'>
                            <Image src={github} alt="" width={25} height={25} />
                        </a>
                        <a href={links.website} target="_blank" rel='noreferrer'>
                            <Image src={linkIcon} alt="" width={25} height={25} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default projectCard;
