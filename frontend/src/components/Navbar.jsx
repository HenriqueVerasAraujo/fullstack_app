import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const {userName, setUserName} = useContext(myContext);
  const [renderName, setRenderName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    if (userName !== '') {
      setRenderName(true);
    } else {
      setRenderName(false);
    }
  }, [userName])

  const logOutFunction = () => {
    localStorage.clear();
    setRenderName(false);
    setUserName('');
    navigate('/');
    window.location.reaload();
  }

  return (
    <div className='bg-blue-600 w-full h-[70px]'>
        <div className='w-full h-full flex items-center justify-between px-10'>
          <div className='flex'>
            <Link to='/'>
                <h1 className='text-2xl mr-10 text-white font-bold'>Home Page</h1>
            </Link>

            <Link to='/createPost'>
                <h1 className='text-2xl mr-10 text-white font-bold'>Create a post</h1>
            </Link>
          </div>
          {!renderName ? (
            <div className='flex'>
              <Link to='/login'>
                  <h1 className='text-2xl mr-10 text-white font-bold'>Login</h1>
              </Link>

              <Link to='/register'>
                  <h1 className='text-2xl mr-10 text-white font-bold'>Register</h1>
              </Link>
            </div>
          ) : (
            <div className='flex'>
              {/* <Link to='/login'> */}
                  <h1 className='text-2xl mr-10 text-white font-bold'>{userName}</h1>
              {/* </Link> */}
                  <h1 onClick={logOutFunction} className='text-2xl mr-10 text-white font-bold'>Log out</h1>
            </div>
          )}
        </div>
    </div>
  )
}
