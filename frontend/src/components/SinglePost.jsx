import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { ThumbUpIcon as ThumbFull } from '@heroicons/react/solid';


export default function SinglePost({ title, text, userName, index, id, likes }) {
  let navigate = useNavigate();
  const [runFunction, setRunFunction] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const numberOfLikes = () => {
    // console.log(likes);
    if(!likes) {
      return 0;
    } else {
      setNumOfLikes(likes.length);
      return likes.length;
    }
  };
  const findIfUserLiked = () => {
      const userId = localStorage.getItem('id');
      const findIfLiked = likes.some((user) => user.UserId === Number(userId));
      if(findIfLiked) {
        setRunFunction(true);
      }
    }
    
    useEffect(() => {
      numberOfLikes();
      findIfUserLiked();
  }, []);

  const redirectToPost = () => {
    navigate(`/post/${id}`)
  }

  const likeFunction = async() => {
    const data = { PostId: id };
    const resData = await axios.post(`http://localhost:3001/likes`, data, {headers: {token: localStorage.getItem('token')}});
    if (runFunction) {
      setNumOfLikes((prev) => (prev - 1));
      setRunFunction(false);
    }
    if (!runFunction) {
      setNumOfLikes((prev) => (prev + 1));
      setRunFunction(true);
    }
    if (resData.data.error) {
      return alert("Você precisa estar logado para dar likes nos posts!");
    };
  }
  return (
    <div>
      <div key={index} className='hover:cursor-pointer w-[400px] h-[400px] bg-zinc-100 border-2 border-blue-300  mb-10 rounded-xl flex flex-col justify-between'>
          <div className='flex justify-between items-center w-full h-[50px] bg-sky-300  font-bold rounded-t-xl px-5'>
              <h1 className='text-black font-bold text-2xl'>{title}</h1>
              <div className='flex '>
              <button onClick={likeFunction}>{
                runFunction ? (
                  <ThumbFull className='w-6 mr-3' />
                  ) : (
                    <ThumbUpIcon className='w-6 mr-3' />
                )}
              </button>
                <h3>{numOfLikes}</h3>
              </div>
          </div>
          <div onClick={redirectToPost} className='h-[300px] w-full'>
              <h2 className='pt-6 px-6'>{text}</h2>
          </div>
          <div className='flex justify-end items-center w-full h-[50px] bg-sky-300 text-1xl font-bold rounded-b-xl'>
              <h3 className='pr-5'>{userName}</h3>
          </div>
      </div>
      
    </div>
  )
}
