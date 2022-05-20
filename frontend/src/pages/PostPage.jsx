import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import SinglePost from '../components/SinglePost';

export default function PostPage() {
    let { id } = useParams();
    const [myPost, setMyPost] = useState({});

    const fetchData = async(id) => {
      const postData = await axios.get(`http://localhost:3001/posts/${id}`)
      setMyPost(postData.data);
    }
    
    useEffect(() => {
        fetchData(id);
    }, [])

  return (
    <div>
      <SinglePost
         id={myPost.id}
         title={myPost.title}
         text={myPost.postText}
         userName={myPost.userName}
         index={1}
         />
      </div>
  )
}
