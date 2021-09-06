import { Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loading from "./Loading"
// both imports are for rendering LaTeX in this app
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

// display a table of all problems in this app and the user's statistics for each one
const ProblemIndex = () => {
    // get index of all problems from state
    const allProblems = useSelector(state => state.allProblems)
    // if problems have not been initialized yet, indicate loading
    if (allProblems === null) {
        return <Loading />
    } 
    // otherwise, display list of problems in table
    // TeX component displays in math format
    else {
        return (
            <div>
                <br />
                <h2>Problem Index</h2>
                <br />
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Problem</th>
                        <th>Type</th>
                        <th>Correct Streak</th>
                        <th>Earliest Due</th>
                      </tr>
                    </thead>
                    <tbody>
                        {allProblems.map(problem => 
                            <tr key={problem.id}>
                                <td> <Link to={`/problems/${problem.id}`}><TeX math={problem.problem_latex} /> </Link> </td>
                                <td>{problem.expression_type}</td>
                                <td>{problem.correct_streak}</td>
                                <td>{problem.earliest_calculated_due_date !== null ? problem.earliest_calculated_due_date.substring(0, 16) : "N/A"}</td>
                            </tr>
                        )}
                    </tbody>
                </Table> 
            </div>
        )
    }
    
}

export default ProblemIndex