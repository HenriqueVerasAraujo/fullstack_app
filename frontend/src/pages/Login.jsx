import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';


export default function Login() {
    const [renderMessage, setRenderMessage] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();
    const {setUserName} = useContext(myContext);
    

    const initialValues = {
        userName:'',
        password:'',
      };

    const validationSchema = Yup.object().shape({
    userName:Yup.string().required('Your Username is required').min(3).max(15),
    password:Yup.string().required(),
    })
    
    const onSubmit = async(data) => {
        setRenderMessage(false);
        const submit = await axios.post(`http://localhost:3001/users/login`, data);
        if (!submit.data.error) {
            setLoginMessage(submit.data.message);
            localStorage.setItem("token", submit.data.token)
            localStorage.setItem("id", submit.data.id);
            setUserName(data.userName);
            localStorage.setItem('userName', data.userName);
            navigate('/');
            return setRenderMessage(true);
        }
        setLoginMessage(submit.data.error);
        setRenderMessage(true);
    };

  return (
    <div className='h-screen w-full flex flex-col' >
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <div>
                <Form className='flex flex-col w-[500px] mt-10'>
                    <label className='text-2xl' htmlFor="userName">Username: </label>
                    <ErrorMessage component='span' name='userName'/>
                    <Field className='mb-5' name='userName'  placeholder="Your Username..."/>
                    
                    <label className='text-2xl' htmlFor="password">Password: </label>
                    <ErrorMessage component='span' name='password'/>
                    <Field className='mb-5'type='password' name='password' placeholder="Your Password here..."/>
                    <button className='bg-blue-300 ' type='submit'>Confirm</button>
                </Form>
            </div>
         </Formik>
         <div>
             {renderMessage && (
                 <h1>{loginMessage}</h1>
             )}
         </div>
    </div>
  )
}
