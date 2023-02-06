import React from 'react'
// import React from 'react'
import {useState , useEffect} from 'react'
import { Link} from 'react-router-dom'
import {Form , Button , Row , Col } from 'react-bootstrap'
// import Loader from '../components/Loader'
// import Message from '../components/Message'

import Loader from '../Loader'
import Message from '../Message'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import FormContainer from '../components/FormContainer'
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import { register } from '../actions/userActions'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'


function ProfileScreen() {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()
    // const history = useHistory();
    const history = useNavigate()
    // const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const userDetails = useSelector(state => state.userDetails )
    console.log(userDetails)
    const {error,loading,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdaaterofile = useSelector(state => state.userLogin)
    const {success} = userUpdaaterofile

    useEffect(() =>{
        if (!userInfo)
        {
            history('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    
    },[dispatch, history , userInfo , user , success]
    )


    const submitHandler = (e) =>
    {
        e.preventDefault()
        if (password != ConfirmPassword)
        {
            setMessage('Passswords do not mach')
        }
        else {
            // dispatch(register(name , email , password))
            //console.log('Updating')
            dispatch(updateUserProfile({
                'id': user.id,
                'name' : name,
                'email' : email,
                'password' : password
            }
            ))
            setMessage('')
        }
        

    }


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant = 'danger'>{message}</Message>}
    {error && <Message variant = 'danger'>{error}</Message>}
    {loading && <Loader/>}
      <Form onSubmit = {submitHandler}>

      <Form.Group controlId = 'name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                required
                type = 'name'
                placeholder = 'Enter name'
                value = {name}
                onChange = {(e) => setName(e.target.value)}
            ></Form.Control>
            
        </Form.Group>

        <Form.Group controlId = 'email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                required
                type = 'email'
                placeholder = 'Enter Email'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
            ></Form.Control>
            
        </Form.Group>

        <Form.Group controlId = 'password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type = 'password'
                placeholder = 'Enter Password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId = 'passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                type = 'password'
                placeholder = 'Conirm Password'
                value = {ConfirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type = 'submit' variant = 'primary' >
            Update</Button>
    
            </Form>


      </Col>
    <Col md={9}>
        <h2>My Visits</h2>
    </Col>
    </Row>
  )
}

export default ProfileScreen
