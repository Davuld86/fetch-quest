import React, { useContext, useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { FriendContext, SocketContext, UserContext } from './App'


export default function LoggedInCont() {
const socket = useContext(SocketContext)
const [user, setUser] = useContext(UserContext)
const [friends, toggleFriends] = useContext(FriendContext)
const [loginForm,toggleLoginForm ] = useState(false)
const [dropdown, toggleDropDown] = useState(false)
const [logout, toggleLogout] = useState(false)



useEffect(()=>{

    socket.on('login', (data) => {
      console.log(data);
    })

    return function cleanup() {
      socket.disconnect();
    }
  },[socket])


function handleLogin(formData){
    socket.emit('login', {username: formData.username,password: formData.password})
    fetch('/api/login', {
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
            toggleLoginForm(false)
        }
        else{
            res.json().then((data)=>alert(data.error))
        }
    })
}

function handleLogout(){
    fetch('/api/logout',{
        method:'DELETE',
        headers:{
            'Content-Type':'applicaiton/json'
        }
    }).then((res)=>{
        if(res.ok){
            setUser(null)
            return (<Redirect to='/'/>)
        }
    })
}

if (user){
    return(
        <div style={{display:'flex', flexDirection:'column'}} >
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} className='logged-in'>
        <h5>{user.username}</h5>
        <h5>{user.coins==null?0: user.coins}🪙</h5>
        <img src={user.pfp} style={{width:'50px', height:'50px', borderRadius:'50%', border:'2px solid black'}}/>
        <Link to={`/messages`}><img title='Messages' src='../images/msg.png' /></Link>
        <img title='Friends' onClick={()=>toggleFriends((p)=>!p)} src='../images/friends.png' style={{width:'40px',height:'40px', cursor:'pointer'}}/>
        <img onClick={()=>toggleLogout((p)=>!p)} title='Settings' src='../images/down.png' style={{width:'25px',height:'25px', cursor:'pointer'}}/>
        </div>
        {logout?
        <div className='menu-items' style={{display:'flex', flexDirection:'column', zIndex:'9'}}>
         <Link to={`/account/${user.id}`}><button onClick={()=>toggleLogout((p)=>!p)}>Profile</button></Link>
        <Link to={`/account-settings/${user.id}`}><button onClick={()=>toggleLogout((p)=>!p)}>Account Settings</button></Link>
       <Link to='/'><button onClick={handleLogout}>Log out</button> </Link>
        </div>:null
        }
        </div>
    )
}
else{
    return (
        <div style={{display:'flex', flexDirection:'column'}} >
        <div style={{display:'flex'}}>
        <img src='../images/def_pfp.png' style={{width:'50px', height:'50px', borderRadius:'50%', border:'2px solid black'}}/>
        <h5 onClick={()=>toggleDropDown((p)=>!p)}>🔽</h5>
        </div>
        {dropdown?
        <div className='menu-items' style={{display:'flex'}}>
       <button onClick={()=>{toggleLoginForm(true); toggleDropDown(false)}}>Login</button>
        </div>
        :null}
        {loginForm?<LoginForm handleLogin={handleLogin} toggleLoginForm={toggleLoginForm}/>:null}
        </div>
      )
}

}
