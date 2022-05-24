import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import SinglePost from '../components/SinglePost';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import myContext from '../context/myContext';

export default function PostPage() {
    let { id } = useParams();
    const [myPost, setMyPost] = useState({});
    const [myComments, setMyComments] = useState([]);
    const { userName } = useContext(myContext);

    const initialValues = {
      commentText:'',
    };

    const validationSchema = Yup.object().shape({
      commentText:Yup.string().required(),
  })

    const onSubmit = async(data) => {
      const allData = {...data, PostId: id };
      const resData = await axios.post(`http://localhost:3001/comments/newComment`, allData, {headers: {token: localStorage.getItem('token')}});
      if (resData.data.error) {
        alert("Você precisa estar logado para comentar posts!");
      };
      const commentData = await axios.get(`http://localhost:3001/comments/${id}`);
      setMyComments(commentData.data);
    }

    const deleteComment = async(commentId) => {
     await axios.delete(`http://localhost:3001/comments/${commentId}`, {headers: {token: localStorage.getItem('token')}});
     console.log('aqui deu');
     const commentData = await axios.get(`http://localhost:3001/comments/${id}`);
      setMyComments(commentData.data);
    }
    const fetchData = async(id) => {
      const postData = await axios.get(`http://localhost:3001/posts/${id}`)
      console.log(postData);
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
      {/* Area dos comentarios  */}
      <div className='w-[80%] flex flex-col items-center'>
          <h1>Comments:</h1>
          {myComments.map((singleComment) => (
            <div className='w-[50%] border-2 border-blue-300 rounded-lg '>
              <h1 className='text-xl'>Comentário de: {singleComment.userName}</h1>
              <h2 className='px-3 py-3'>{singleComment.commentText}</h2>
              {userName === singleComment.userName && (
                <button onClick={() => {deleteComment(singleComment.id)}}>Delete</button>
                )}
            </div>
          ))}
      </div>
      {/* Area de criar comentarios  */}
      <div className='my-6 border-2 border-blue-300 rounded-lg w-[80%]'>
        <h1>Create a Comment:</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='flex flex-col mt-3'>
            
            <label htmlFor="commentText">Comment: </label>
            <ErrorMessage component='span' name='commentText'/>
            <Field className='mb-5' name='commentText' placeholder="Your Comment here..."/>

            <button className='bg-blue-300 h-[50px] text-neutral-50 text-3xl font-bold' type='submit'>Send Comment</button>

          </Form>
        </Formik>
      </div>
    </div>
  )
}
