import React, {useState} from 'react'
import { Field, Form, Formik } from 'formik';
import { signUpSchema } from '../schemas';

export default function SignUpForm({toggleSignupForm, handleSignUp }){
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div>
    <h1>Sign Up</h1>
    <button onClick={()=>toggleSignupForm(false)}>X</button>
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        handleSignUp(values)

        actions.resetForm()
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <label htmlFor="username">Username</label>
          <Field name="username" />
          {errors.username && touched.username? (<p>{errors.username}</p>):null}

          <label htmlFor="password">Password</label>
          <Field name="password" type='password'/>
          {errors.password && touched.password ? (<p>{errors.password}</p>):null}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field name="confirmPassword" type="password" />
          {errors.confirmPassword && touched.confirmPassword ? (<p>{errors.confirmPassword}</p>):null}

          <button type="submit" disabled={isSubmitting || !errors}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
    )
  }

