import React, { useContext, useState } from 'react'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { FriendContext, UserContext } from './App'


export default function LoggedInCont() {
const [user, setUser] = useContext(UserContext)
const [friends, toggleFriends] = useContext(FriendContext)
const [loginForm,toggleLoginForm ] = useState(false)
const [dropdown, toggleDropDown] = useState(false)
const [logout, toggleLogout] = useState(false)


function handleLogin(formData){
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
        }
    })
}

if (user){
    return(
        <div style={{display:'flex', flexDirection:'column'}} >
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <h5>{user.username}</h5>
        <h5>{user.coins==null?0: user.coins}🪙</h5>
        <img src={user.pfp} style={{width:'50px', height:'50px', borderRadius:'50%', border:'2px solid black'}}/>
        <Link to={`/messages`}><h5 title='Messages'>🗨️</h5></Link>
        <h5 onClick={()=>toggleLogout((p)=>!p)} title='Settings'>🔽</h5>
        <img title='Friends' onClick={()=>toggleFriends((p)=>!p)} src='../images/friends.png' style={{width:'25px',height:'25px', cursor:'pointer'}}/>

        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
        {logout? <Link to={`/account/${user.id}`}><button onClick={()=>toggleLogout((p)=>!p)}>Profile</button></Link>:null}
        {logout?<Link to={`/account-settings/${user.id}`}><button onClick={()=>toggleLogout((p)=>!p)}>Account Settings</button></Link>:null}
        {logout?<button onClick={handleLogout}>Log out</button>:null}
        </div>
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
        <div style={{display:'flex'}}>
        {dropdown?<button onClick={()=>{toggleLoginForm(true); toggleDropDown(false)}}>Login</button>:null}
        </div>
        {loginForm?<LoginForm handleLogin={handleLogin} toggleLoginForm={toggleLoginForm}/>:null}
        </div>
      )
}

}
