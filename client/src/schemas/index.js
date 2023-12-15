import * as yup from 'yup'


export const loginSchema = yup.object().shape({
    username : yup.string().required('Required'),
    password : yup.string().required('Required')
})

export const signUpSchema = yup.object().shape({
    username: yup.string().required('Required'),
    password: yup.string().min(5,'Password must be at least 5 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null], 'Passwords must match').required('Required')
})

export const messageSchema = yup.object().shape({
    message: yup.string().required()
})
