import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SinglePost from '../components/SinglePost';
import { Link } from 'react-router-dom';

export default function Home() {
    const [listOfPost, setListOfPosts] = useState([]);
    const fetchData = async() => {
     const data = await axios.get('http://localhost:3001/posts');
     console.log(data);
     setListOfPosts(data.data);
    }
 
   //  fetchData();
   useEffect(() => {
     fetchData();
   },[])
  
   return (
     <div className='flex flex-col items-center'>
         <Link to='/createPost'>
            <button className='bg-blue-300 p-5 my-10 rounded-3xl text-2xl font-bold text-white'>Create a new Post</button>
         </Link>
       {listOfPost.map((singlePost, index) => (
         <SinglePost
         title={singlePost.title}
         text={singlePost.postText}
         userName={singlePost.userName}
         index={index}
         />
       ))}
     </div>
   );
}
