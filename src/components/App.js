import Login from './Login'
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reloadUser } from '../reducers/reducer';

// top-level app that is rendered by ReactDom as root element
const App = () => {
    // used to dispatch actions to change state
    const dispatch = useDispatch()
    // if app is loaded and userInfo exists in localStorage, it means page has been refreshed. dispatch action to reload information
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('userInfo')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          dispatch(reloadUser(user))
        }
      }, [])
    
    // get "logged-in" state from redux
    const authInfo = useSelector(state => state.authInfo)
    // if logged in, show dashboard, otherwise show login page
    if (authInfo !== null) {
        return <Dashboard />
    } else {
        return <Login />
    }
}

export default App;
