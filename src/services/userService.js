import axios from 'axios'

// base url for get info about user
const baseUrl = '/api/users'

// sends request to get day-by-day statistics for user attempts
const getUserStatistics = async (user_id, token) => {
    const apiResponse = await axios.get(`${baseUrl}/${user_id}`, {headers: {'Authorization': `Bearer ${token}`}})
    const userStatistics = apiResponse.data
    return userStatistics
}

// send request to remove all references to user from app and send appropriate confirmation message
const deleteUser = async (user_id, token) => {
    const apiResponse = await axios.delete(`${baseUrl}/${user_id}`, {headers: {'Authorization': `Bearer ${token}`}})
    const confirmationMessage = apiResponse.data['msg']
    return confirmationMessage
}

// sends request to remove all logs of user attempts so far
const resetUser = async (user_id, token) => {
    const payload = {'reset': true}
    const apiResponse = await axios.put(`${baseUrl}/${user_id}`, payload, {headers: {'Authorization': `Bearer ${token}`}})
    const confirmationMessage = apiResponse.data['msg']
    return confirmationMessage
}

const userService = {getUserStatistics, deleteUser, resetUser}

export default userService