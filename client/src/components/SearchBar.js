import { Formik, Field, Form } from 'formik'
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';




export default function SearchBar() {
  const [q, setQ] = useState(null)
    return (
      <div>
      <Formik
       initialValues={{query:''}}
       onSubmit = {(values, actions)=> {
        setQ(values.query)
        actions.resetForm();

      }}>
        {({isSubmitting, values}) =>(
        <Form autoComplete='off'>
          <Field id= 'query' name='query' placeholder='Search for games'/>
          <Link to={`/search_games/${values.query}`}><button type='submit' disabled={isSubmitting}>🔍</button></Link>
          </Form>
        )}
      </Formik>
    </div>
    )
  }

