import React, {useState} from 'react'

export default function SignUpForm({toggleSignupForm, handleSignUp }){
const formDefault = {username:'', password:'', confirmP:''}
const [formData, setFormData] = useState(formDefault)

const handleForm = e=>{
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]:value
    })
}


return (
      <div>
        <form onSubmit={(e)=> {e.preventDefault(); handleSignUp(formData);setFormData(formDefault)}}>
        <h2>Sign Up</h2>
        <button onClick={()=> toggleSignupForm(false)} >X</button>
        <label>Username:</label>
        <input type='text' name= 'username' value={formData.username} onChange={handleForm}/>
        <label>Password</label>
        <input type='text' name ='password' value ={formData.password} onChange={handleForm}/>
        <label>Confirm Password</label>
        <input type='text' name='confirmP' value={formData.confirmP} onChange={handleForm}/>
        <button >Create Account</button>

        </form>
      </div>
    )
  }

