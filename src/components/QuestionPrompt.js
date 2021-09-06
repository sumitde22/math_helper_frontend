import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { refreshToken, submitAnswer } from "../reducers/reducer"
import Notification from "./Notification"
// both imports are for rendering LaTeX in this app
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

// component that allows users to submit response to given problem and receive feedback on answer
const QuestionPrompt = ({problemInfo}) => {
    // used to dispatch actions to change state 
    const dispatch = useDispatch()
    // retrieve auth info needed to dispatch actions
    const authInfo = useSelector(state => state.authInfo)
    // local state that keeps track of what user has typed so far
    const [userResponse, setUserResponse] = useState('')

    // callback that tracks what a user types and fires on changes
    const handleUserInput = event => {
        event.preventDefault()
        setUserResponse(event.target.value)
    }

    // callback that submits user answer to problem and triggers changes in state
    const submitResponse = event => {
        event.preventDefault()
        const currentTime = Date.now()
        // if time since login exceeds token validity time indicated by api, request another token
        if (currentTime - authInfo['login_time'] > authInfo['token_expires']) {
            dispatch(refreshToken(authInfo.refresh_token))
        } 
        // else, dispatch attempt to submit answer for problem, which could trigger changes in application state
        else {
            dispatch(submitAnswer(authInfo.access_token, authInfo.id, problemInfo.id, userResponse))
            setUserResponse('')
        }
    }

    const centerStyle = {
        "textAlign": "center"
    }

    // cleanly display math problem using TeX component and render form for user to submit answer through
    return (
        <div style={centerStyle}>
            <Notification section="SHOW_SOLUTION" />
            <TeX block>{problemInfo.problem_latex
            }</TeX>
            {problemInfo.assumptions_latex !== null && <TeX block>{problemInfo.assumptions_latex}</TeX>}
            <Notification section="RESUBMIT" />
            <form onSubmit={submitResponse}>
                <input type="text" value={userResponse} onChange={handleUserInput}/>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>   
        </div>
    )
}

export default QuestionPrompt