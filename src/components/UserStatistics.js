import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser, refreshToken, resetUser} from "../reducers/reducer";
import Notification from "./Notification";
import { Table } from "react-bootstrap";
import Loading from "./Loading";

// component that displays a user's day-to-day attempt log
const UserStatistics = () => {
  // used to dispatch actions to change state
  const dispatch = useDispatch()
  // adding to this object allows you to redirect user and keep track of history
  const history = useHistory()
  // retrieve auth info needed to dispatch actions
  const authInfo = useSelector(state => state.authInfo)
  // get user statistics from redux state
  const userStatistics = useSelector(state => state.userStatistics)
  const centerStyle = {"textAlign": "center"}

  // callback function that dispatches action to remove all previous attempts for this user
  const resetUserOnClick = event => {
    event.preventDefault()
    const currentTime = Date.now()
    // if time since login exceeds token validity time indicated by api, request another token
    if (currentTime - authInfo['login_time'] > authInfo['token_expires']) {
        dispatch(refreshToken(authInfo.refresh_token))
    } 
    // otherwise, dispatch action to reset user
    else {
        dispatch(resetUser(authInfo.id, authInfo.access_token))
    }
  }

  // callback function that dispatches action to remove user and all its info from app completely
  const deleteUserOnClick = event => {
    event.preventDefault()
    const currentTime = Date.now()
    // if time since login exceeds token validity time indicated by api, request another token
    if (currentTime - authInfo['login_time'] > authInfo['token_expires']) {
        dispatch(refreshToken(authInfo.refresh_token))
    } 
    // otherwise, dispatch action to delete user and redirect to homepage
    else {
        dispatch(deleteUser(authInfo.id, authInfo.access_token))
        history.push('/')
    }
  }
  
  // if user statistics have not been initialized, display loading spinner
  if (userStatistics === null) {
      return <Loading />
  } 
  // other, display user statistics, allow user to remove all previous attempts, and allow user to remove themselves from app entirely
  // resubmit notification flashes when token expires and reset/delete user has to be reclicked
  else {
      return (
        <div>
          <br />
          <h2 style={centerStyle}>{authInfo.username}</h2>
          <br />
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Solved</th>
                <th>Attempts</th>
              </tr>
            </thead>
            <tbody>
              {userStatistics.map(date_statistic => 
              <tr key={date_statistic.attempt_date}>
                <td >{date_statistic.attempt_date.substring(0, 16)} </td>
                <td >{date_statistic.solved} </td>
                <td >{date_statistic.attempts}</td>
              </tr>)}
            </tbody>
          </Table>
          <br />
          <Notification section="RESET_USER" />
          <br />
          <button onClick={resetUserOnClick}>Reset User</button>
          <button onClick={deleteUserOnClick}>Delete User</button>
          <Notification section="RESUBMIT" />
      </div>)}
  }
    
export default UserStatistics;