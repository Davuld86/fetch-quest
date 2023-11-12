import { Formik, Field, Form } from 'formik'
import React, { Component } from 'react'

export default function SearchBar({handleSearch}) {
    return (
      <div>
      <Formik
       initialValues={{query:''}}
       onSubmit = {async(values, actions)=> {
      handleSearch(values);
      actions.resetForm();
      }}>
        {({isSubmitting}) =>(
        <Form>
          <Field id= 'query' name='query' placeholder='Search for games'/>
          <button type='submit' disabled={isSubmitting}>🔍</button>
          </Form>
        )}
      </Formik>
    </div>
    )
  }

