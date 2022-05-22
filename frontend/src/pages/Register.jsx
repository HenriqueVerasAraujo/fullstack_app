import React, { useState } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Register() {
    const [renderMessage, setRenderMessage] = useState(false)
    const initialValues = {
        userName:'',
        password:'',
      };
    const validationSchema = Yup.object().shape({
    userName:Yup.string().required('Your Username is required').min(3).max(15),
    password:Yup.string().required(),
    })

    const onSubmit = async(data) => {
        await axios.post(`http://localhost:3001/users`, data);
        setRenderMessage(true);
    }
  return (
    <div className='w-full h-[screen - 200px] flex flex-col items-center'>
        <div className='w-[600px] h-[400px] mt-[200px] bg-zinc-300 rounded-lg flex flex-col'>
            <div className='w-full h-[50px] bg-blue-600 flex items-center justify-center'>
                <h1 className='text-3xl text-neutral-100 font-bold'>Register</h1>
            </div>
            <div className='w-full h-full'>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <div className='px-10 flex flex-col  h-full justify-items-end'>
                        <Form>
                            <div className='flex flex-col mt-6'>
                                <label className='text-2xl' htmlFor="userName">Username: </label>
                                <ErrorMessage component='span' name='userName'/>
                                <Field className='mb-5' name='userName'  placeholder="Your Username..."/>
                                
                                <label className='text-2xl' htmlFor="password">Password: </label>
                                <ErrorMessage component='span' name='password'/>
                                <Field className='mb-5'type='password' name='password' placeholder="Your Password here..."/>
                            </div>

                            <button className='bg-blue-300 w-full h-[50px] mt-10 text-neutral-50 text-3xl font-bold' type='submit'>Confirm</button>
                        </Form>
                    </div>
                </Formik>
            </div>
        </div>
        <div>
            {renderMessage && (
                <h1>Usuario criado com sucesso!</h1>
            )}
        </div>
    </div>
  )
}
