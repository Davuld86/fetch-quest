import React, {useState} from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

import './None.css'

export default function NoUser({handleLogin, handleSignUp}) {
    const [loginform, toggleLoginForm] = useState(false)
    const [signupform,toggleSignupForm] = useState(false)

    return (
    <div style={{display:'flex'}} className='user'>
          <h3 onClick={()=>{toggleLoginForm(true);toggleSignupForm(false)}} >Login</h3>
          <h3>/</h3>
          <h3 onClick={()=> {toggleSignupForm(true);toggleLoginForm(false)}} >Sign Up</h3>
          {loginform === false == true ? null: <LoginForm toggleLoginForm={toggleLoginForm} handleLogin={handleLogin} />}
          {signupform ===false == true ? null: <SignUpForm toggleSignupForm={toggleSignupForm} handleSignUp={handleSignUp} />}
    </div>
  )
}
