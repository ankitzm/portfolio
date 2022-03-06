import React from 'react';
import Link from 'next/link'

function Navbar() {
    const NavLink = [
        {
            "name" : "home",
            "link" : "/",
            "selected" : false
        },
        {
            "name": "project",
            "link": "project",
            "selected": false
        },
        {
            "name": "experience",
            "link": "experience",
            "selected": false
        },
        {
            "name": "resume",
            "link": "resume",
            "selected": false
        },
    ]

    return (
        <div className='container flex border-4'>
            {
                NavLink.map(function(item) {
                    return (
                        <div key={item.name} className='mx-4'>
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
