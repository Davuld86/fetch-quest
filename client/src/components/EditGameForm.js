import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import NoneFound from './NoneFound'
import { uploadSchema } from '../schemas'
import EmbedGame from './EmbedGame'
import Loading from './Loading'

export default function EditGameForm() {
    const gameID = window.location.pathname.slice(11)
    const [logged, setLogged] = useState(null)
    const [game, setGame] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        fetch("/check_session").then((r) => {
         if (r.ok) {
           r.json().then((log) => setLogged(log));
         }
         else{
             setLogged(0)
         }
       }).then( ()=> {
       fetch(`/game/${gameID}/`).then((r) => {
         if (r.ok) {
           r.json().then((game) => {setGame(game)});
         }
         else{
          setGame(0)
         }
     })
     setLoading(false)
    })
       }, []);

function handleSubmit(values){
    let temp = []
        values.categories.split(',').map((word)=>{
            temp.push(word.trim().replace(/\s/g,'-').toLowerCase())
        })
    setGame({
        ...game,
        title: values.title,
        thumbnail: values.thumbnail,
        path: values.path,
        description: values.description,
        categories: temp
    })

    fetch(`/game/${game.id}/`, {
        method:'PATCH',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify({
            title: game.title,
            thumbnail: game.thumbnail,
            path: game.path,
            description: game.description,
            categories: temp
        })
    })
    .then((res)=>{
        if(res.ok){
            setSubmitted(true)
        }
    })

}

function handleDelete(){
    console.log('Sending delete req')
}

if(submitted){
    alert('Changes submitted')
    return <Redirect to={`/play/${game.id}`}/>
}
if(isLoading){
    return <Loading/>
    }
//not logged in
if(logged==0){
    return <Redirect to={'/'}/>
}
//no game found
else if(game==0){
    return <NoneFound text={'This game does not exist'} image={'../images/no_game.png'}/>
}

else if(isLoading==false && game&&logged){


    // game isn't created by current user
    if(game.created_by.id != logged.id){
        alert('Attempting to edit a game that is not created by you.')
        return <Redirect to={`play/${game.id}`}/>
    }
    else{

        return (
            <div>
                <h1>Edit Game</h1>
                <Formik
                initialValues={{
                    title: game.title,
                    thumbnail: game.thumbnail,
                    path: game.path,
                    description: game.description,
                    categories: game.categories.map((category)=> category.name).join(',')

                }}
                validationSchema={uploadSchema}
                onSubmit= {(values, actions)=>{
                    handleSubmit(values)
                }}
                >
                {({errors, touched, values }) => (
                    <Form autoComplete='off'>

                        <br/>
                        <label htmlFor='title'> Title: </label>
                        <Field name='title' type='text'/>
                        {errors && touched.title?<p>{errors.title}</p>:null}
                        <br/>
                        <label htmlFor='thumbnail'>Thumbnail Link: </label>
                        <Field name='thumbnail' type='text'/>
                        {errors && touched.thumbnail?<p>{errors.thumbnail}</p>:null}
                        <br/>
                        <h4>Thumbnail Preview:</h4>
                        <img src={values.thumbnail==''?'../images/default_thumbnail.png':values.thumbnail} style={{maxWidth:'80px'}}/>
                        <br/>
                        <label htmlFor='path'>Game Link:</label>
                        <Field name='path' type='text'/>
                        {errors && touched.path?<p>{errors.path}</p>:null}
                        <br/>
                        <h4>Game Preview:</h4>
                        <EmbedGame source ={values.path}/>
                        <br/>
                        <label htmlFor='description'>Description:</label>
                        <Field name='description' type='text' maxLength='500'  />
                        {errors && touched.description?<p>{errors.description}</p>:null}
                        <br/>
                        <label htmlFor='categories' >Categories</label>
                        <Field name='categories' type='text' placeholder='e.g.: action, bullet hell, adventure'/>
                        {errors && touched.categories?<p>{errors.categories}</p>:null}
                        <p>For multiple categories, enter a comma separated list</p>
                        <br/>
                        <button type='submit'>Save Changes</button>
                    </Form>
                )}
                </Formik>
            <h3>Delete Game</h3>
            <button onClick={()=>handleDelete()}>Delete Game</button>
            </div>
          )
    }
}



}
