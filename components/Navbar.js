import React from 'react';
import Link from 'next/link'

function Navbar () {
    return (
        <div>
            <Link href='/'>
                home
            </Link>
            {' '}
            <Link href='/project'>
                prject
            </Link>
            {' '}
            <Link href='/experience'>
                experience
            </Link>
            {' '}
            <Link href='/resume'>
                resume
            </Link>
            {' '}
        </div>
    );
}

export default Navbar;
