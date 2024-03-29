import React, { useContext, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import { signUpSchema } from '../schemas';
import ColorCharacter from './ColorCharacter';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import './Register.css'
import { UserContext } from './App';
import { stat } from './descriptions';
export default function Register() {
  const [user, setUser]= useContext(UserContext)
  const [showPassword,setShowPassword] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [color, setColor] = useState('red')
  const [job, setJob] = useState('swordsman')

  function handleSubmit(formData){
    fetch('/api/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username:formData.username,
        password: formData.password,
        color: color,
        job: job,
        hp: 100+ stat[job].HP,
        max_hp: 100+ stat[job].HP,
        max_mp: 100+ stat[job].MP,
        mp: 100+ stat[job].MP,
        atk: 20+ stat[job].ATK,
        matk:  20+ stat[job].MATK,
        defense:  20+ stat[job].DEF,
      })
    }).then((res)=>{
      if(res.ok){
        setRegistered(true)
        res.json().then((d)=> setUser(()=>d))
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
    <div style={{backgroundColor:'aliceblue'}}>
      <h1>Register</h1>
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'aliceblue'}}>

        <div className='avatar'>
          <ColorCharacter setColor={setColor} job={job}/>
          <h2>Choose a class</h2>
            <div className='job-buttons'>
            <button value={'thief'} onClick={(e)=> setJob(e.target.value)}>Theif</button>
            <button value={'swordsman'} onClick={(e)=> setJob(e.target.value)}>Swordsman</button>
            <button value={'wizard'} onClick={(e)=> setJob(e.target.value)}>Wizard</button>
            <button value={'archer'} onClick={(e)=> setJob(e.target.value)}>Archer</button>
            </div>
            <h3>You can change these later</h3>
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
          <button type='button' title={showPassword?'hide password':'show password'}  onClick={()=> setShowPassword((prev)=> (!prev))}>{showPassword?'🕶️':'👓'}</button>
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
