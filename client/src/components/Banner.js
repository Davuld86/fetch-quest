import React, {Fragment, useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import NoUser from './NoUser'
import LoggedUser from './LoggedUser'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Logo from './Logo'
import './Banner.css'

export default function Banner({logged, setLogged}) {
    useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((logged) => setLogged(logged));
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
            .then(d=>{ setLogged(d)})

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
            alert('Account created!')
          }
          else{
           r.json().then((d)=> alert(d.error))
          }
        })
      }

    function handleLogOut(){
      fetch('/logout',{
        method: 'DELETE'
    }).then((r) =>{
        if (r.ok){
          setLogged(null)
        }
      })

    }

    return (
        <div className='banner'>
          <Logo/>
          <SearchBar/>
          {logged? <LoggedUser handleLogOut={handleLogOut} user= {logged}/>:<NoUser handleLogin={handleLogin} handleSignUp={handleSignUp}/>}
        </div>
      )
}

