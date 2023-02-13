import axios from "axios"

const BASE_URL = "http://localhost:5000/api"

const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const TOKEN = user && JSON.parse(user).accessToken;
    return TOKEN;
}

const accessToken = getAccessToken();

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
    }
});
    
