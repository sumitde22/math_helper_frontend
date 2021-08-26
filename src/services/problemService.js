import axios from 'axios'

// base url for getting/solving problems for app
const baseUrl = '/api/problems'

// get all problems for app and user's statistics for solving them
const getAllProblems = async token => {
    const apiResponse = await axios.get(`${baseUrl}/`, {headers: {'Authorization': `Bearer ${token}`}})
    const allProblems = apiResponse.data
    return allProblems
}

// get problems that are assigned today for user
// empty list implies all problems have been solved
const getDailyProblems = async token => {
    const apiResponse = await axios.get(`${baseUrl}/daily`, {headers: {'Authorization': `Bearer ${token}`}})
    const dailyProblems = apiResponse.data
    return dailyProblems
}

// send user response to problem and returns whether or not a correct/valid response was sent
const solveProblem = async (token, problem_id, answer) => {
    try {
        const payload = {'answer': answer}
        const apiResponse = await axios.post(`${baseUrl}/solve/${problem_id}`, payload, {headers: {'Authorization': `Bearer ${token}`}})
        const correctInfo = apiResponse.data
        return correctInfo
    } catch(error) {
        throw error.response.data
    }
}

// remove logs of all previous attempts of this problem by user
const resetProblem = async (token, problem_id) => {
    const payload = {'reset': true}
    const apiResponse = await axios.put(`${baseUrl}/${problem_id}`, payload, {headers: {'Authorization': `Bearer ${token}`}})
    const confirmationMessage = apiResponse.data['msg']
    return confirmationMessage
}

const problemService = {getAllProblems, getDailyProblems, solveProblem, resetProblem}

export default problemService