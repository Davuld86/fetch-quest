import React, { useState } from 'react'
import LoginForm from './LoginForm'


export default function LoggedInCont({user, setUser}) {
const [loginForm,toggleLoginForm ] = useState(false)
const [dropdown, toggleDropDown] = useState(false)
const [logout, toggleLogout] = useState(false)

function handleLogin(formData){
    fetch('api/login', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password
        })
    }).then((res)=>{
        if(res.ok){
            res.json().then((data)=>setUser(data))
        }
        else{
            res.json().then((data)=>alert(data.error))
        }
    })
}

function handleLogout(){
    fetch('api/logout',{
        method:'DELETE',
        headers:{
            'Content-Type':'applicaiton/json'
        }
    }).then((res)=>{
        if(res.ok){
            setUser(null)
        }
    })
}

if (user){
    return(
        <div style={{display:'flex', flexDirection:'column'}} >
        <div style={{display:'flex'}}>
        <h5>{user.username}</h5>
        <img src={user.pfp} style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
        <h5 onClick={()=>toggleLogout((p)=>!p)}>🔽</h5>
        </div>
        <div style={{display:'flex'}}>
        {logout?<button onClick={handleLogout}>Log out</button>:null}
        </div>
        </div>
    )
}
else{
    return (
        <div style={{display:'flex', flexDirection:'column'}} >
        <div style={{display:'flex'}}>
        <img src='../images/def_pfp.png' style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
        <h5 onClick={()=>toggleDropDown((p)=>!p)}>🔽</h5>
        </div>
        <div style={{display:'flex'}}>
        {dropdown?<button onClick={()=>{toggleLoginForm(true); toggleDropDown(false)}}>Login</button>:null}
        </div>
        {loginForm?<LoginForm handleLogin={handleLogin} toggleLoginForm={toggleLoginForm}/>:null}
        </div>
      )
}

}
