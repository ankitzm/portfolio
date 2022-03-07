import React, { useState } from 'react';
import Link from 'next/link'

function Navbar() {
    const [selected, setSelcted] = useState(false)
    const NavLink = [
        {
            "name" : "home",
            "link" : "/",
            "state": selected
        },
        {
            "name": "project",
            "link": "project",
            "state": selected
        },
        {
            "name": "experience",
            "link": "experience",
            "state": selected
        },
        {
            "name": "resume",
            "link": "resume",
            "state": selected
        },
    ]

    return (
        <div className='flex bg-white shadow-lg sm:rounded-l bg-clip-padding bg-opacity-50'>
            {
                NavLink.map(item => {
                    return (
                        <div key={item.name} className="px-2 border">
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Navbar;
