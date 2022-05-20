import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='bg-blue-600 w-full h-[70px]'>
        <div className='w-full h-full flex items-center px-10'>
            <Link to='/'>
                <h1 className='text-2xl mr-10 text-white font-bold'>Home Page</h1>
            </Link>

            <Link to='/createPost'>
                <h1 className='text-2xl mr-10 text-white font-bold'>Create a post</h1>
            </Link>
        </div>
    </div>
  )
}
