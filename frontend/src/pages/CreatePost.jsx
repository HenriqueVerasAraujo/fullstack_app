import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
 
export default function CreatePost() {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <div className='w-[500px] h-[500px] bg-zinc-200 px-10 py-10'>
            <Formik>
                <Form className='flex flex-col'>
                    <label htmlFor="title">Title: </label>
                    <Field className='text-2xl mb-5' name='title' placeholder='Title...' /> 
                    <label htmlFor="postText">Post: </label>
                    <Field className='text-2xl mb-5' name='postText' placeholder='Your post...'/>
                    <label htmlFor="userName">Username: </label>
                    <Field className='text-2xl mb-5' name='userName' placeholder= 'your Username...' />
                    <button className='bg-blue-300 p-3 my-5 rounded-lg text-2xl font-bold text-white' type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}
