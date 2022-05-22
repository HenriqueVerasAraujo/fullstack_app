import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
 
export default function CreatePost() {
    let navigate = useNavigate();
    const initialValues = {
        title:'',
        postText:'',
        userName:'',
    }
    const onSubmit = async (data) => {
        const resData = await axios.post('http://localhost:3001/posts', data, {headers: {token: sessionStorage.getItem('token')}});
        if (resData.data.error) {
             return alert('Você precisa estar logado para criar Posts!');
        }
        navigate('/');

    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('You must create a title for your post'),
        postText:Yup.string().required(),
        userName:Yup.string().required().min(3).max(15),
    })
  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <div className='w-[500px] h-[500px] bg-zinc-200 px-10 py-10'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className='flex flex-col'>
                    <label htmlFor="title">Title: </label>
                    <ErrorMessage className='text-red-600' name='title' component='span'/>
                    <Field className='text-2xl mb-5' name='title' placeholder='Title...' /> 
                    
                    <label htmlFor="postText">Post: </label>
                    <ErrorMessage className='text-red-600' name='postText' component='span'/>
                    <Field className='text-2xl mb-5' name='postText' placeholder='Your post...'/>

                    <label htmlFor="userName">Username: </label>
                    <ErrorMessage className='text-red-600' name='userName' component='span'/>
                    <Field className='text-2xl mb-5' name='userName' placeholder= 'your Username...' />

                    <button className='bg-blue-300 p-3 my-5 rounded-lg text-2xl font-bold text-white' type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}
