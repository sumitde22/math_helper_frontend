import authService from "../services/authService"
import problemService from "../services/problemService"
import userService from "../services/userService"

const defaultNotificationState = {show: false, message: "", math_expression: null, section: "", success: true}
const defaultState = {notificationInfo: defaultNotificationState, authInfo: null, allProblems: null, dailyProblems: null, userStatistics: null, problemStatistics: null}

// controls state of application
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // set authentication info based on data sent by action
        case "LOGIN":
            return { ...state, authInfo: action.payload}
        case "RELOAD_USER":
            return {...state, authInfo: action.payload}
        case "REFRESH_TOKEN":
            return {...state, authInfo: {...state.authInfo, "access_token": action.payload["access_token"], "refresh_token": action.payload["refresh_token"], "login_time": action.payload["login_time"]}}
        // set index of all problems based on action data
        case "GET_PROBLEMS":
            return { ...state, allProblems: action.payload}
        // set daily problems to solve today based on action data
        case "GET_DAILY_PROBLEMS":
            return { ...state, dailyProblems: action.payload}
        // set user statistics based on action data
        case "GET_PROBLEM_STATISTICS":
            return {...state, problemStatistics: action.payload}
        case "GET_USER_STATISTICS":
            return { ...state, userStatistics: action.payload}
        // release all data current stored in state
        case "LOGOUT":
            return defaultState
        case "DELETE_USER":
            return defaultState
        // toggle notification data
        case "SHOW_NOTIFICATION":
            return { ...state, notificationInfo: action.payload}
        case "HIDE_NOTIFICATION":
            return { ...state, notificationInfo: defaultNotificationState}
        default:
            return state
    }
}

// action dispatched by other action creators that creates notification state for Notification component to display
export const showNotification = (message, math_expression, section, success) => {
    return {type: 'SHOW_NOTIFICATION', payload: {show: true, message, math_expression, section, success}}
}

export const hideNotification = () => {
    return {type: 'HIDE_NOTIFICATION'}
}

// send user info to api to try and create new user for app
// handle error gracefully and show relevant error message if unable to 
export const createUser = (username, password) => {
    return async dispatch => {
        try {
            const userInfo = await authService.createUser(username, password)
            dispatch(showNotification(`User ${userInfo.username} successfully created!`, null, "CREATE_USER", true))
        } catch (error) {
            dispatch(showNotification(`Error: ${error.msg}`, null, "CREATE_USER", false))
        }
    }
}

// send authentication info to api to try and login
// if login successful, use token to retrieve all initial state info (daily problems, problem index, etc)
// else, handle error gracefully and show relevant error message
export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const userInfo = await authService.loginUser(username, password)
            // save auth info to local storage, allows user to refresh page and stay logged in
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))

            // token expires in 1 hour, so save login time to ensure expired token is not sent
            userInfo['login_time'] = Date.now()
            const action = {type: 'LOGIN', payload: userInfo}
            dispatch(action)

            // get all initial state info
            dispatch(getDailyProblems(userInfo.access_token))
            dispatch(getProblems(userInfo.access_token))
            dispatch(getUserStatistics(userInfo.id, userInfo.access_token))
        } catch (error) {
            dispatch(showNotification(`Error: ${error.msg}`, null, "LOGIN", false))
        }
    }
}

// reload state using stored login info (when page is refreshed and state is lost)
export const reloadUser = (authInfo) => {
    return async dispatch => {
        try {
            // token expires in 1 hour, so save login time to ensure expired token is not sent
            authInfo['login_time'] = Date.now()
            const action = {type: "RELOAD_USER", payload: authInfo}
            dispatch(action)

            // get all initial state info
            dispatch(getDailyProblems(authInfo.access_token))
            dispatch(getProblems(authInfo.access_token))
            dispatch(getUserStatistics(authInfo.id, authInfo.access_token))
        } catch (error) {
            dispatch(showNotification('Error: Login token expired. Please log back in.', null, "LOGIN", false))
        }
    }
}

// gets new authentication token after old one expires
export const refreshToken = (refreshToken) => {
    return async dispatch => {
        const payload = await authService.getNewToken(refreshToken)
        // token expires in 1 hour, so save login time to ensure expired token is not sent
        payload['login_time'] = Date.now()
        const action = {type: 'REFRESH_TOKEN', payload}
        dispatch(action)
        // whatever action was intended will not be executed, so let user know to reexecute action
        dispatch(showNotification('Error: Login token expired and had to be refreshed. Please try action again', null, "RESUBMIT", false))
    }
}

// clear all state info when user logs out
export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch({type: 'LOGOUT'})
    }
}

// send user answer to problem and retrieve new state after update
export const submitAnswer = (token, userId, problemId, userAnswer) => {
    return async dispatch => {
        try {
            const responseInfo = await problemService.solveProblem(token, problemId, userAnswer)
            // determine if problem solved correctly and display notification accordingly
            const message = responseInfo['correct'] ? 'Correct! Sample solution: ' : 'Incorrect. Correct answer: '
            dispatch(showNotification(message, responseInfo['sample_solution'], "SHOW_SOLUTION", responseInfo['correct']))
        } catch (error) {
            dispatch(showNotification(`Error: ${error.msg}`, null, "SUBMISSION_ERROR", false))
        }
        
        // submitting an answer changes the state regarding problems left and statistics so update state 
        dispatch(getDailyProblems(token))
        dispatch(getProblems(token))
        dispatch(getUserStatistics(userId, token))
        dispatch(getProblemStatistics(token, problemId))
    }
}

// clear a problem's attempt log
export const resetQuestion = (token, userId, problemId) => {
    return async dispatch => {
        const message = await problemService.resetProblem(token, problemId)
        dispatch(showNotification(message, null, "RESET_PROBLEM", true))
        
        // resetting problem changes the state so update state accordingly
        dispatch(getDailyProblems(token))
        dispatch(getProblems(token))
        dispatch(getUserStatistics(userId, token))
    }
}

// clear a user's attempt log
export const resetUser = (userId, token) => {
    return async dispatch => {
        const message = await userService.resetUser(userId, token)
        dispatch(showNotification(message, null, "RESET_USER", true))
        
        // resetting user changes the state so update state accordingly
        dispatch(getDailyProblems(token))
        dispatch(getProblems(token))
        dispatch(getUserStatistics(userId, token))
    }
}

// delete user and clear state
export const deleteUser = (userId, token) => {
    return async dispatch => {
        const message = await userService.deleteUser(userId, token)
        dispatch({type: 'DELETE_USER'})
        dispatch(showNotification(message, null, "LOGIN", true))
    }
}

// gets the problems assigned today to be solved for current user
// only called when user logged in and token has not expired
export const getDailyProblems = token => {
    return async dispatch => {
        const payload = await problemService.getDailyProblems(token)
        const action = {
            type: 'GET_DAILY_PROBLEMS',
            payload
        }
        dispatch(action)
    }
}

// gets all the problems in the index and the user's statistics for them
// only called when user logged in and token has not expired
export const getProblems = token => {
    return async dispatch => {
        const payload = await problemService.getAllProblems(token)
        const action = {
            type: 'GET_PROBLEMS',
            payload
        }
        dispatch(action)
    }
}

export const getProblemStatistics = (token, problem_id) => {
    return async dispatch => {
        const payload = await problemService.getProblemStatistics(token, problem_id)
        const action = {
            type: 'GET_PROBLEM_STATISTICS',
            payload
        }
        dispatch(action)
    }
}

// gets by day-by-day statistics for how many problems a user has solved
// only called when user logged in and token has not expired
export const getUserStatistics = (user_id, token) => {
    return async dispatch => {
        const payload = await userService.getUserStatistics(user_id, token)
        const action = {
            type: 'GET_USER_STATISTICS',
            payload
        }
        dispatch(action)
    }
}


export default reducer