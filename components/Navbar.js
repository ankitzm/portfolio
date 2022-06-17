import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

function Navbar() {
    const NavLink = [
        {
            "name": "home",
            "link": "/",
        },
        {
            "name": "project",
            "link": "/project",
        },
        {
            "name": "experience",
            "link": "/experience",
        },
        {
            "name": "resume",
            "link": "/resume",
        },
    ]

    const router = useRouter()

    return (
        <div className='flex sm:rounded-l bg-clip-padding bg-opacity-50'>
            {
                NavLink.map(item => {
                    return (
                        <div key={item.name} className="mx-0 sm:mx-2 font-bold text-xs sm:text-base hover:bg-opacity-20 hover:bg-slate-100 hover:rounded-lg" style={{ "font-family": 'Major Mono Display' }}>
                            <Link href={item.link} passHref>
                                <div className={`py-1 px-2 sm:py-2 sm:px-4 ${router.asPath == item.link ? "bg-opacity-20 bg-slate-100 rounded-lg" : ""}`}>
                                    {item.name}
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Navbar;
