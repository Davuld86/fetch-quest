import React from 'react'

export default function SignUpForm({toggleSignupForm}){

    return (
      <div>
        <h2>Sign Up</h2>
        <button onClick={()=> toggleSignupForm(false)} >X</button>
        <label>Username:</label>
        <input type='text'/>
        <label>Password</label>
        <input type='text'/>
        <label>Confirm Password</label>
        <input type='text'/>
        <button>Create Account</button>
      </div>
    )
  }

