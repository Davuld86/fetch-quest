import React, { useContext, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import { signUpSchema } from '../schemas';
import ColorCharacter from './ColorCharacter';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './Register.css'
import { UserContext } from './App';
export default function Register() {
  const [user, setUser]= useContext(UserContext)
  const [showPassword,setShowPassword] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [color, setColor] = useState('red')

  function handleSubmit(formData){
    fetch('/api/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username:formData.username,
        password: formData.password,
        color: color
      })
    }).then((res)=>{
      if(res.ok){
        setRegistered(true)
      }
      else{
        res.json((d)=> alert(d.error))
      }
    })

    setRegistered((prev)=> !prev)
  }

  if(registered||user){
    return(
      <Redirect to='/'/>
    )
  }
else {
  return (
    <div>
      <h1>Register</h1>
    <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>

        <div className='character'>
          <ColorCharacter setColor={setColor}/>
        </div>
        <div className='signup' style={{display:'grid', justifyContent:'center', alignItems:'center'}}>
        <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        handleSubmit(values)
        actions.resetForm()
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <label htmlFor="username">Create a Character Name</label>
          <br/>
          <Field name="username" />
          {errors.username && touched.username? (<p>{errors.username}</p>):null}
          <br/>
          <label htmlFor="password"> Create a password</label>
          <Field name="password" type={showPassword? 'text': 'password'}/>
          {errors.password && touched.password ? (<p>{errors.password}</p>):null}
          <br/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field name="confirmPassword" type={showPassword? 'text': 'password'} />
          {errors.confirmPassword && touched.confirmPassword ? (<p>{errors.confirmPassword}</p>):null}
          <br/>
          <button type='button'  onClick={()=> setShowPassword((prev)=> (!prev))}>Show Password {showPassword?'ON':'OFF'}</button>
          <br/>
          <button type="submit" disabled={isSubmitting || !errors}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
        </div>

    </div>
    </div>
  )
}

}
