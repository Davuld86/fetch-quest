import React, {Fragment, useState} from 'react'
import SearchBar from './SearchBar'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function Banner() {
    const [loginform, toggleLoginForm] = useState(false)
    const [signupform,toggleSignupForm] = useState(false)

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
          r.ok? r.json() :r.json().then((d)=> alert(d.error))
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
          <img alt ='bun_byte_logo' src='../images/bba_logo.png'/>
          <SearchBar handleSearch ={handleSearch}/>

          <Fragment>
          <h3 onClick={()=>{toggleLoginForm(true);toggleSignupForm(false)}} >Login</h3>
          <h3>/</h3>
          <h3 onClick={()=> {toggleSignupForm(true);toggleLoginForm(false)}} >Sign Up</h3>
          </Fragment>
          {loginform === false == true ? null: <LoginForm toggleLoginForm={toggleLoginForm} handleLogin={handleLogin} />}
          {signupform ===false == true ? null: <SignUpForm toggleSignupForm={toggleSignupForm} handleSignUp={handleSignUp} />}
        </div>
      )
}

