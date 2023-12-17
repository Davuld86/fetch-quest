import React, { useContext, useState } from 'react'
import { UserContext } from './App'
import { Field, Form, Formik } from 'formik'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import DialogueBox from './DialogueBox'


export default function EditAccount() {
    const id = window.location.pathname.slice(18)
    const [user, setUser] = useContext(UserContext)
    const [submitted, setSubmit] = useState(false)
    const [box, toggleBox] = useState(false)

    function handleSubmit(data){
        setUser( {...user, pfp: data.pfp, bio: data.bio})

        fetch(`/api/user/${user.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                bio: data.bio,
                pfp: data.check?`../images/characters/${user.character[0].job}_${user.character[0].color}.png`:data.pfp
            })
        })
        .then((res)=>{
            if(res.ok){
                setSubmit(true)
            }
        })
    }
    function handleDelete(){
        fetch(`/api/user/${user.id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                setUser(null)
            }
        })
    }

if(submitted){
    return  <Redirect to={`/`}/>
}
if (user){
if(user.id == parseInt(id)){
    return (
    <div className='profile-page'>
        {box? <DialogueBox title={'Delete Account'} text={'This action cannot be undone.'} onYes={handleDelete} onNo={()=>toggleBox(false)}/>:null}
        <h1>Edit Profile</h1>
        <h2>Username: {user.username}</h2>
    <Formik
    initialValues={{
        pfp: user.pfp=='../images/def_pfp.png'? '':user.pfp==`../images/characters/${user.character[0].job}_${user.character[0].color}.png`?'': user.pfp,
        bio: user.bio,
        check: user.pfp ==`../images/characters/${user.character[0].job}_${user.character[0].color}.png`?true:false

    }}
    onSubmit={(values)=>{
        handleSubmit(values)
    }}
    >
        {({values, setFieldValue})=>
        <Form autoComplete='off'>
            <label htmlFor='pfp'> Profile Picture URL: </label>
            <Field type='text' name='pfp'/>

            <label htmlFor='check'>Use character image</label>
            <Field  type='checkbox' name='check' onClick={()=>setFieldValue('pfp',`../images/characters/${user.character[0].job}_${user.character[0].color}.png`)}/>
            <br/>

            {values.check? <img src={`../images/characters/${user.character[0].job}_${user.character[0].color}.png`} style={{maxHeight:'150px'}}/>
            :values.pfp==''?<img src='../images/def_pfp.png' style={{maxHeight:'150px'}}/>
            :<img src={values.pfp} style={{maxHeight:'150px'}}/>}
            <br/>
            <label htmlFor='bio'> Bio:</label>
            <br/>
            <Field type='text' name='bio' placeholder='Enter bio' maxLength='160'></Field>
            <p>{values.bio?values.bio.length:0} of 160</p>
            <br/>
            <button type='submit'>Submit changes</button>
        </Form>
  }
    </Formik>
    <h2>Delete account</h2>
    <button onClick={()=>toggleBox(true)}>Delete Account</button>
    </div>
    )
}
else{
    return(
        <Redirect to={`/account-settings/${user.id}`}/>
    )
}
}
else{
    return (
       <Redirect to={`/`}/>
  )
}

}
