import {useDispatch} from 'react-redux';
import {useState} from 'react';
import Notification from './Notification';
import { createUser, loginUser } from '../reducers/reducer';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    // used to dispatch actions to change state
    const dispatch = useDispatch()
    // simple hooks to keep track of inputs on page
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newUser, setNewUser] = useState("")
    const [newPassword, setNewPassword] = useState("")

    // callback that dispatches action to login user based on current inputs
    const loginHandler = event => {
        event.preventDefault()
        dispatch(loginUser(username, password))
        setNewUser("")
        setNewPassword("")
    }

    // callback that dispatches action to create user based on current inputs
    const createUserHandler = event => {
        event.preventDefault()
        dispatch(createUser(newUser, newPassword))
        setNewUser("")
        setNewPassword("")
    }

    // tracks changes in input box and updates component state accordingly
    const handleUsernameChange = event => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    // tracks changes in input box and updates component state accordingly
    const handlePasswordChange = event => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    // tracks changes in input box and updates component state accordingly
    const handleNewUser = event => {
        event.preventDefault()
        setNewUser(event.target.value)
    }

    // tracks changes in input box and updates component state accordingly
    const handleNewPassword = event => {
        event.preventDefault()
        setNewPassword(event.target.value)
    }

    // login form based on react-bootstrap component
    const loginComponent = 
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    // create user form based on react-bootstrap component
    const createUserComponent = 
    <Form onSubmit={createUserHandler}>
      <Form.Group className="mb-3" controlId="formCreateUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" value={newUser} onChange={handleNewUser}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCreateBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={newPassword} onChange={handleNewPassword}/>
        <Form.Text muted>
          Your password must be at least 7 characters long and cannot contain the /, &, or ? character.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    // insert forms into final component, and allow notifications to be flashed in appropriate positions
    return (
      <div>
        <h1>Calc Buddy</h1>
        <br />
        <Notification section="LOGIN" />
        <h2>Login</h2>
        {loginComponent}
        <br />
        <Notification section="CREATE_USER" />
        <h2>Create User</h2>
        {createUserComponent}
      </div>
      
    )
}

export default Login;