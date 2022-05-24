import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import myContext from '../context/myContext';

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
      <div className='flex justify-between'>
        <button onClick={likeFunction}>Like</button>
        <h3>{numOfLikes}</h3>
      </div>
      <div onClick={redirectToPost} key={index} className='hover:cursor-pointer w-[400px] h-[400px] bg-zinc-100 border-2 border-blue-300  mb-10 rounded-xl flex flex-col justify-between'>
          <div className='flex justify-center items-center w-full h-[50px] bg-sky-300 text-2xl font-bold rounded-t-xl'>
              <h1 className='text-black'>{title}</h1>
          </div>
          <div className='h-[300px] w-full'>
              <h2 className='pt-6 px-6'>{text}</h2>
          </div>
          <div className='flex justify-end items-center w-full h-[50px] bg-sky-300 text-1xl font-bold rounded-b-xl'>
              <h3 className='pr-5'>{userName}</h3>
          </div>
      </div>
      {runFunction ? (
        <h1>LIKED</h1>
      ) : (
        <h1>NOT LIKED</h1> 
      )}
    </div>
  )
}
