import React, {useState} from 'react'

export default function LoginForm({toggleLoginForm, handleLogin}) {
    const formDefault = {username: '', password:''}
    const [formData, setFormData] = useState(formDefault)

    const handleForm = (e) =>{
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={(e)=> {e.preventDefault(); handleLogin(formData); setFormData(formDefault)}}>
        <button onClick={()=>toggleLoginForm(false)}>X</button>
        <label>Username:</label>
        <input type='text' value={formData.username} onChange={handleForm} name='username' />
        <label>Password:</label>
        <input type='text' name='password' value={formData.password} onChange={handleForm}/>
        <button>login</button>
        </form>
      </div>
    )
}
