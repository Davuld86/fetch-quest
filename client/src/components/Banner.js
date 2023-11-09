import React, {Fragment, useState} from 'react'
import SearchBar from './SearchBar'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function Banner() {
    const [loginform, toggleLoginForm] = useState(false)
    const [signupform,toggleSignupForm] = useState(false)

    function handleLogin(data){
        console.log('sending login req', data)

    }

    function handleSignUp(data){
        console.log('sendinag signup req:', data)
    }

    return (
        <div>
          <img alt ='bun_byte_logo' src='../images/bba_logo.png'/>
          <SearchBar/>
          <Fragment>
          <h3 onClick={()=>toggleLoginForm(true)} >Login</h3>
          <h3>/</h3>
          <h3 onClick={()=> toggleSignupForm(true)} >Sign Up</h3>
          </Fragment>
          {loginform === false || signupform == true ? null: <LoginForm toggleLoginForm={toggleLoginForm} handleLogin={handleLogin} />}
          {signupform ===false || loginform == true ? null: <SignUpForm toggleSignupForm={toggleSignupForm} handleSignUp={handleSignUp} />}
        </div>
      )
}

