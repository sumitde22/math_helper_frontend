import { useSelector } from "react-redux"
import Loading from "./Loading"
import QuestionPrompt from "./QuestionPrompt"

// displays component that shows a problem that is part of a user's daily quota and asks them to solve it
// if the daily problems list is empty, it means there are none left
const DailyProblemDisplay = () => {
    // get daily problems assigned to user from state
    const dailyProblems = useSelector(state => state.dailyProblems)
    const centerStyle = {"textAlign": "center"}

    // if daily problems part of state not initialized, then show loading component
    if (dailyProblems === null) {
        return <Loading />
    }
    // if daily problems list empty, indicate to user that no problems are left to be solved 
    else if (dailyProblems.length === 0) {
        return (
            <div>
                <br />
                <h2 style={centerStyle}>Daily quota solved!</h2>
            </div>
        )
    }
    // if there are daily problems remaining in the list, pick one at random and ask user to solve it
    // at the top of div, indicate how many problems are left
    // questionprompt component allows user to input their response
    else {
        const randomIndex = Math.floor(Math.random() * dailyProblems.length)
        return (
        <div>
            <h2 style={centerStyle}>Daily Problems</h2>
            <h4 style={centerStyle}>Problems Left: {dailyProblems.length}</h4>
            <br />
            <QuestionPrompt problemInfo={dailyProblems[randomIndex]} />
        </div>
        )
    }
}

export default DailyProblemDisplay