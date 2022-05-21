import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import SinglePost from '../components/SinglePost';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function PostPage() {
    let { id } = useParams();
    const [myPost, setMyPost] = useState({});
    const [myComments, setMyComments] = useState([]);

    const initialValues = {
      commentText:'',
      userName:'',
    };

    const validationSchema = Yup.object().shape({
      userName:Yup.string().required('Your Username is required').min(3).max(15),
      commentText:Yup.string().required(),
  })

    const onSubmit = async(data) => {
      const allData = {...data, PostId: id }
      await axios.post(`http://localhost:3001/comments/newComment`, allData);
    }
    const fetchData = async(id) => {
      const postData = await axios.get(`http://localhost:3001/posts/${id}`)
      const commentData = await axios.get(`http://localhost:3001/comments/${id}`)
      setMyPost(postData.data);
      setMyComments(commentData.data);
    }
    
    useEffect(() => {
        fetchData(id);
    }, [])

  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      {/* // Area do post: */}
      <div className='w-full flex justify-center '>
        <SinglePost
          id={myPost.id}
          title={myPost.title}
          text={myPost.postText}
          userName={myPost.userName}
          index={1}
          />
      </div>
      {/* Area do  */}
      <div className=''>
          <h1>Comments:</h1>
          {myComments.map((singleComment) => (
            <div>
              <h1>{singleComment.userName}</h1>
              <h2>{singleComment.commentText}</h2>
            </div>
          ))}
      </div>
      <div className='my-6'>
        <h1>Create a Comment:</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='flex flex-col my-3'>
            <label htmlFor="userName">Username: </label>
            <ErrorMessage component='span' name='userName'/>
            <Field className='mb-5' name='userName'  placeholder="Your Username..."/>
            
            <label htmlFor="commentText">Comment: </label>
            <ErrorMessage component='span' name='commentText'/>
            <Field className='mb-5' name='commentText' placeholder="Your Comment here..."/>
            <button type='submit'>Send Comment</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
