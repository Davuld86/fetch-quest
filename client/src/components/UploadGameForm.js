import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { uploadSchema } from '../schemas'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import EmbedGame from './EmbedGame'

import './UploadGameForm.css'
import NoneFound from './NoneFound'

export default function UploadGameForm() {
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const[isSubmitted, setSubmitted] = useState(false)
    useEffect(() => {
        fetch("/check_session").then((r) => {
         if (r.ok) {
           r.json().then((log) => setUser(log));
         }
         else{
             setUser(0)
         }
        }).then(setLoaded(true))
        }, []);

    function handleSubmit(values){
        let temp = []
        values.categories.split(',').map((word)=>{
            temp.push(word.trim().replace(/\s/g,'-').toLowerCase())
        })
        fetch('/api/upload-game/',{
            method: 'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            thumbnail: values.thumbnail,
            path: values.path,
            user_id: user.id,
            categories: temp
          })
        }).then((res)=>{
            if (res.ok){
                setSubmitted(true)
            }
        })
    }

if(isSubmitted){
    return(
        <NoneFound title={'Game Uploaded'} image='../images/uploaded.png' text={''}/>
      )
}
else if (loaded){
if(user==0){
    alert('Create an account /login to upload games.')
    return <Redirect to='/'/>
}
return (
    <div className='game-form'>
        <h1>Upload Game</h1>
        <Formik

        initialValues={{
            title:'',
            thumbnail:'',
            path:'',
            description:'',
            categories: '',

        }}
        validationSchema={uploadSchema}
        onSubmit= {(values, actions)=>{
            handleSubmit(values)
            actions.resetForm()
        }}
        >
        {({errors, touched, values }) => (
            <Form autoComplete='off'>
                <label htmlFor='title'> Title: </label>
                <Field name='title' type='text'/>
                {errors && touched.title?<p>{errors.title}</p>:null}
                <br/>
                <label htmlFor='thumbnail'>Thumbnail Link: </label>
                <Field name='thumbnail' type='text'/>
                {errors && touched.thumbnail?<p>{errors.thumbnail}</p>:null}
                <br/>
                <h4>Thumbnail Preview:</h4>
                <img className='default-thumbnail' src={values.thumbnail==''?'../images/default_thumbnail.png':values.thumbnail}/>
                <br/>
                <label htmlFor='path'>Game Link:</label>
                <Field name='path' type='text'/>
                {errors && touched.path?<p>{errors.path}</p>:null}
                <br/>
                <h4>Game Preview:</h4>
                {errors.path || values.path==''?<img  className='default-embed' src='../images/default_game.gif'/>:<EmbedGame source ={values.path}/>}
                <br/>
                <label htmlFor='description'>Description:</label>
                <Field name='description' type='text' maxLength='500'  />
                {errors && touched.description?<p>{errors.description}</p>:null}
                <br/>
                <label htmlFor='categories' >Categories</label>
                <Field name='categories' type='text' placeholder='e.g.: action, bullet hell, adventure'/>
                {errors && touched.categories?<p>{errors.categories}</p>:null}
                <h4>For multiple categories, enter a comma separated list</h4>
                <br/>
                <button type='submit'>Upload Game</button>
            </Form>
        )}
        </Formik>
    </div>
  )
}
}


