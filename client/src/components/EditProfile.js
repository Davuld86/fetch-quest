import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Formik, Form, Field } from 'formik';

export default function EditProfile() {
const [logged, setLogged] = useState(null)
const [user, setUser] = useState(null)
const [loaded, setLoaded] = useState(false)
const userID = Number(window.location.pathname.slice(14)[0])
const placeholder = `Gamer at heart, chasing victories and virtual adventures. Let's play! 🎮✨`
useEffect(() => {
   fetch("/check_session").then((r) => {
    if (r.ok) {
      r.json().then((log) => setLogged(log));
    }
    else{
        setLogged(0)
    }
  })
  fetch(`/user/${userID}`).then((r) => {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
}).then(
    setLoaded(true))
  }, []);

function handleSubmit(data){
    fetch(`/user/${user.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify({
           bio: data.bio,
           pfp: data.pfp,
        })
    })
    .then((r)=>{
        if(r.ok){
            r.json().then((d)=> console.log(d))
            return <Redirect to={`/user/${logged.id}`}/>
        }
    })
}

if(loaded){
  if(logged==0){
    alert('Login to edit your profile')
    return <Redirect to='/'/>
  }
  if (logged&& userID != logged.id){
    alert('Attempting to edit account that is not yours')
    return <Redirect to={`/user/${logged.id}`}/>
  }
  if(logged&&user){
  return (
    <div>
        <h2>Edit Profile</h2>
        <h3>Username: {user.username} </h3>

    <Formik
    initialValues={{
        pfp: user.pfp=='../images/default_pfp.jpg'? '': user.pfp,
        bio: user.bio,

    }}
    onSubmit={(values)=>{
        handleSubmit(values)
    }}

    >
        {({values})=>
        <Form autoComplete='off'>
            <label htmlFor='pfp'> Profile Picture URL: </label>
            <Field type='text' name='pfp'></Field>
            <br/>
            {values.pfp==''?<img src='../images/default_pfp.jpg' style={{maxHeight:'150px'}}/>:<img src={values.pfp} style={{maxHeight:'150px'}}/>}
            <br/>
            <label htmlFor='bio'> Bio:</label>
            <br/>
            <Field type='text' name='bio' placeholder={placeholder} maxLength='160'></Field>
            <br/>
            <button type='submit'>Submit changes</button>
        </Form>
  }
    </Formik>
    </div>
  )
  }
}
}
