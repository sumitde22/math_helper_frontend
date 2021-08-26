import { useDispatch } from 'react-redux';
import { Link, Route, Switch, useHistory} from 'react-router-dom';
import UserStatistics from './UserStatistics';
import ProblemIndex from './ProblemIndex';
import ProblemStatistics from './ProblemStatistics';
import { logoutUser } from '../reducers/reducer';
import UserInstructions from './UserInstructions';
import DailyProblemDisplay from './DailyProblemDisplay';
import About from './About';

// when logged in, this component represents a router that will display the correct page based on the url route
const Dashboard = () => {
    // used to dispatch actions to change state 
    const dispatch = useDispatch()
    // adding to this object allows you to redirect user and keep track of history
    const history = useHistory()

    // callback function that dispatches logout action when link is clicked
    const logout = event => {
      event.preventDefault()
      dispatch(logoutUser())
      history.push('/')
    }

    const linkStyle = {padding: 10}

    // Links represent a navbar that user can click to navigate throughout app
    // Switch compares each route object to url and renders component for matching Route
    // if none match, render 404 error page
    return (
      <div>
        <div>
          <Link style={linkStyle} to="/">home</Link>
          <Link style={linkStyle} to="/problems">problems</Link>
          <Link style={linkStyle} to="/info">user info</Link>
          <Link style={linkStyle} to="/instructions">instructions</Link>
          <Link style={linkStyle} to="/about">about</Link>
          <Link style={linkStyle} to="/" onClick={logout}>logout</Link>
        </div>
        <Switch>
          <Route path="/problems/:id">
            <ProblemStatistics />
          </Route>
          <Route path="/problems">
            <ProblemIndex />
          </Route>
          <Route path="/info">
            <UserStatistics />
          </Route>
          <Route path="/instructions">
            <UserInstructions />
          </Route>
          <Route path="/about">
            <About />
          </Route>          
          <Route exact path="/">
            <DailyProblemDisplay />
          </Route>
          <Route path="*">
            <div>
              <h2>404 Resource Not Found</h2>
            </div>
          </Route>
        </Switch>
      </div>
    )
}

export default Dashboard