import axios from 'axios'

// base url for authenticating/creating users for app
const baseUrl = '/api/auth'

// sends user info and returns user info if created successfully
const createUser = async (username, password) => {
    try {
        const apiResponse = await axios.post(`${baseUrl}/register`, {username, password})
        const userInfo = apiResponse.data
        return userInfo
    } catch (error) {
        throw error.response.data
    }
}

// attempts login with user info and returns user info + auth tokens if successful
const loginUser = async (username, password) => {
    try {
        const apiResponse = await axios.post(`${baseUrl}/login`, {username, password})
        const userInfo = apiResponse.data
        return userInfo
    } catch (error) {
        throw error.response.data
    }
}

// retrieves new token using refresh token sent during login
const getNewToken = async refreshToken => {
    try {
        const apiResponse = await axios.post(`${baseUrl}/refresh`, {}, {headers: {'Authorization': `Bearer ${refreshToken}`}})
        const newTokenInfo = apiResponse.data
        return newTokenInfo
    } catch (error) {
        throw error.response.data
    }
}

const authService = {createUser, loginUser, getNewToken}
export default authService