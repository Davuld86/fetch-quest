import React, {Fragment, useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import NoUser from './NoUser'
import LoggedUser from './LoggedUser'

export default function Banner() {

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
        console.log('sending login req', data)
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
        console.log('sendinag signup req:',data)
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

    function handleSearch(query){
      console.log(query)
    }

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <img alt ='bun_byte_logo' src='../images/bba_logo.png' style={{width:'15%'}}/>
          <img src='../images/bba_text.png'style={{width:'30%'}}></img>

          <SearchBar handleSearch ={handleSearch}/>
          {user? <LoggedUser user= {user}/>:<NoUser handleLogin={handleLogin} handleSignUp={handleSignUp}/>}
        </div>
      )
}

