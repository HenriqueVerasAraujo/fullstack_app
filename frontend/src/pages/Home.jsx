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
 
   useEffect(() => {
     fetchData();
   },[])
  
   return (
     <div className='flex flex-col items-center mt-10'>
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
