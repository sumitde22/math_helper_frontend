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
                        <th>Solved</th>
                        <th>Attempts</th>
                        <th>Most Recent Attempt</th>
                      </tr>
                    </thead>
                    <tbody>
                        {allProblems.map(problem => 
                            <tr key={problem.id}>
                                <td> <Link to={`/problems/${problem.id}`}><TeX math={problem.latex_rep} /> </Link> </td>
                                <td>{problem.solved}</td>
                                <td>{problem.attempts}</td>
                                <td>{problem.most_recent_solved !== null ? problem.most_recent_solved.substring(0, 16) : "N/A"}</td>
                            </tr>
                        )}
                    </tbody>
                </Table> 
            </div>
        )
    }
    
}

export default ProblemIndex