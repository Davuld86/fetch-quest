import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
export default function LoginForm({toggleLoginForm, handleLogin}) {
  const [showPassword, setShowPassword] = useState(false)
  const validate = values => {
    const errors={};
    if(!values.username){
      errors.username = 'Required';
    }
    if(!values.password){
      errors.password = 'Required';
    }
  }
    return (
      <div>
        <h1>Login</h1>
        <button onClick={()=>toggleLoginForm(false)}>X</button>
        <Formik
         initialValues={{username: '', password:''}}
         onSubmit={async(values)=> {await new Promise((r) => setTimeout(r,500));
        handleLogin(values);
        values= {username: '', password:''}
        }}>
          <Form>
            <label htmlFor='username'>Username:</label>
            <Field id= 'username' name='username' />
            <br/>
            <label htmlFor='password'>Password:</label>
            <Field id='password' name='password' type={showPassword? 'text': 'password'}/>
            <br/>
            <label htmlFor='checkbox'>Show Password</label>
            <input type='checkbox' onChange={()=> setShowPassword((prev)=> (!prev))}/>
            <br/>
            <button type='submit'>Login</button>
          </Form>
        </Formik>
      </div>
    )
}
