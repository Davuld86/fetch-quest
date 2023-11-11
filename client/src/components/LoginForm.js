import React, {useState} from 'react'
import { Formik, Form, Field} from 'formik';
import { loginSchema } from '../schemas';

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
         validationSchema={loginSchema}
         onSubmit={async(values, actions)=> {await new Promise((r) => setTimeout(r,500));
        handleLogin(values);
        actions.resetForm();
        }}>
          {({errors, isSubmitting, touched}) =>(
          <Form>
            <label htmlFor='username'>Username:</label>
            <Field id= 'username' name='username' />
            {errors.username && touched.username? (<p>{errors.username}</p>):null}

            <br/>
            <label htmlFor='password'>Password:</label>
            <Field id='password' name='password' type={showPassword? 'text': 'password'}/>
            {errors.password && touched.password ? (<p>{errors.password}</p>):null}
            <br/>
            <label htmlFor='checkbox'>Show Password</label>
            <input type='checkbox' onChange={()=> setShowPassword((prev)=> (!prev))}/>
            <br/>
            <button type='submit' disabled ={isSubmitting||!errors}>Login</button>
          </Form>
          )}
        </Formik>
      </div>
    )
}
