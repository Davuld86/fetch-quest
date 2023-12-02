import React, {Fragment, useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import NoUser from './NoUser'
import LoggedUser from './LoggedUser'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Logo from './Logo'
import './Banner.css'

export default function Banner({changePath}) {

    const [user, setUser] = useState(null)

    useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);


    function handleLogin(data){

        let [username, password] = [data.username, data.password]
        fetch('/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          }),
        })
        .then((r)=>{
          if(r.ok){
            r.json()
            .then(d=>{console.log(d); setUser(d)})

          }
           else{
            r.json()
            .then((d)=> alert(d.error))
           }
        })
    }

    function handleSignUp(data){
        let [username, password] = [data.username, data.password]
        fetch('/signup', {
          method: 'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
        .then((r)=> {
          if(r.ok){
            r.json()
          }
          else{
           r.json().then((d)=> alert(d.error))
          }
        })
      }

    function handleLogOut(){
      console.log('logging out')
      fetch('/logout',{
        method: 'DELETE'
    }).then((r) =>{
        if (r.ok){
          setUser(null)
        }
      })

    }

    return (
        <div className='banner'>
          <Logo/>
          <SearchBar/>
          {user? <LoggedUser handleLogOut={handleLogOut} user= {user}/>:<NoUser handleLogin={handleLogin} handleSignUp={handleSignUp}/>}
        </div>
      )
}

