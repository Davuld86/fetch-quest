import React, {Fragment, useState} from 'react'
import SearchBar from './SearchBar'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function Banner() {
    const [loginform, toggleLoginForm] = useState(false)
    const [signupform,toggleSignupForm] = useState(false)

    return (
        <div>
          <img alt ='bun_byte_logo' src='../images/bba_logo.png'/>
          <SearchBar/>
          <Fragment>
          <h3 onClick={()=>toggleLoginForm(true)} >Login</h3>
          <h3>/</h3>
          <h3 onClick={()=> toggleSignupForm(true)} >Sign Up</h3>
          </Fragment>
          {loginform === false ? null: <LoginForm toggleLoginForm={toggleLoginForm}/>}
          {signupform ===false? null: <SignUpForm toggleSignupForm={toggleSignupForm}/>}
        </div>
      )
}

