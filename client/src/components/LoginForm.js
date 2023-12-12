import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { loginSchema } from '../schemas';

import './LoginForm.css'

export default function LoginForm({toggleLoginForm, handleLogin}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='loginForm' >
    <button onClick={()=>toggleLoginForm(false)}>X</button>
    <h3>Login</h3>
    <Formik
     initialValues={{username: '', password:''}}
     validationSchema={loginSchema}
     onSubmit={async(values, actions)=> {await new Promise((r) => setTimeout(r,500));
    handleLogin(values);
    actions.resetForm();
    }}>
      {({errors, isSubmitting, touched}) =>(
      <Form>
        <label htmlFor='username'>Username:</label>
        <Field id= 'username' name='username' />
        {errors.username && touched.username? (<p>{errors.username}</p>):null}
        <br/>
        <label htmlFor='password'>Password:</label>
        <Field id='password' name='password' type={showPassword? 'text': 'password'}/>
        {errors.password && touched.password ? (<p>{errors.password}</p>):null}
        <br/>
        <button type='button' onClick={()=> setShowPassword((prev)=> (!prev))}>Show Password {showPassword?'ON':'OFF'}</button>
        <br/>
        <button type='submit' disabled ={isSubmitting||!errors}>Login</button>
      </Form>
      )}
    </Formik>
  </div>
  )
}
