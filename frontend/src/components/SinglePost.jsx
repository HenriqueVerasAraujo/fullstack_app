import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SinglePost({ title, text, userName, index, id }) {
  let navigate = useNavigate();

  const redirectToPost = () => {
    navigate(`/post/${id}`)
  }

  const likeFunction = async() => {
    const data = { PostId: id };
    console.log(data);
    const resData = await axios.post(`http://localhost:3001/likes`, data, {headers: {token: localStorage.getItem('token')}});
    if (resData.data.error) {
      return alert("Você precisa estar logado para dar likes nos posts!");
    };
  }
  return (
    <div>
      <button onClick={likeFunction}>Like</button>
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
    </div>
  )
}
