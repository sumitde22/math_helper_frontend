import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { getProblemStatistics, refreshToken, resetQuestion} from "../reducers/reducer"
import Loading from "./Loading"
import Notification from "./Notification"
import QuestionPrompt from "./QuestionPrompt"

// a specific problem's reference page
const ProblemStatistics = () => {
    // used to dispatch actions to change state 
    const dispatch = useDispatch()
    // used to determine url parts
    const match = useRouteMatch("/problems/:id")
    // retrieve auth info needed to dispatch actions
    const authInfo = useSelector(state => state.authInfo)
    // if problem list has not been initialized, keep default null state
    // otherwise, try to find the problem that matches the id indicated in the url
    const problemStatistics = useSelector(state => {
        if (state.problemStatistics === null || state.problemStatistics.id !== parseInt(match.params.id)) {
            return null
        } else {
            return state.problemStatistics
        }
    })

    useEffect(() => {
        const currentTime = Date.now()
        // if time since login exceeds token validity time indicated by api, request another token
        if (currentTime - authInfo['login_time'] > authInfo['token_expires']) {
          dispatch(refreshToken(authInfo.refresh_token))
        } else if (problemStatistics === null || problemStatistics.id !== parseInt(match.params.id)) {
          dispatch(getProblemStatistics(authInfo.access_token, parseInt(match.params.id)))
        }
    }, [])

    // callback function that dispatches action to remove previous attempts of this problem
    // won't modify state if token has expired and will just refetch token
    const resetQuestionOnClick = event => {
        event.preventDefault()
        const currentTime = Date.now()
        // if time since login exceeds token validity time indicated by api, request another token
        if (currentTime - authInfo['login_time'] > authInfo['token_expires']) {
          dispatch(refreshToken(authInfo.refresh_token))
        } 
        // otherwise, dispatch action to reset question
        else {
          dispatch(resetQuestion(authInfo.access_token, authInfo.id, problemStatistics.id))
        }
    }

    // if problem list has not been initialized, display loading spinner
    if (problemStatistics === null) {
        return <div><Loading /><br /><Notification section="RESUBMIT" /></div>
    } 
    // if no problem found to match url id, indicate error
    else if (problemStatistics === undefined) {
        return `Problem with id ${match.params.id} doesn't exist`
    } 
    // other, display problem statistics, allow user to answer problem to check their answer, and allow user to reset question statistics
    // resubmit notification flashes when token expires and reset problem has to be reclicked
    else {
        return (
            <div>
                <br />
                <h3>Solved: {problemStatistics.solved}</h3>
                <h3>Attempted: {problemStatistics.attempts}</h3>
                <h3>Most Recent Attempt: {problemStatistics.most_recent_solved !== null ? problemStatistics.most_recent_solved.substring(0, 16) : "N/A"}</h3>
                <QuestionPrompt problemInfo={problemStatistics} />
                <br />
                <Notification section="RESET_PROBLEM" />
                <button onClick={resetQuestionOnClick}>Reset Question</button>
                <Notification section="RESUBMIT" />
            </div>
        )
    }
}

export default ProblemStatistics