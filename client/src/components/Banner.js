import React, {Fragment, useState} from 'react'
import SearchBar from './SearchBar'
import NoUser from './NoUser'
import LoggedUser from './LoggedUser'

export default function Banner() {

    const [user, setUser] = useState(null)

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
        <div>
          <img alt ='bun_byte_logo' src='../images/bba_logo.png' style={{width:'50%'}}/>
          <SearchBar handleSearch ={handleSearch}/>
          {user? <LoggedUser user= {user}/>:<NoUser handleLogin={handleLogin} handleSignUp={handleSignUp}/>}
        </div>
      )
}

