import axios from "axios"

export const apiRequests = axios.create({
    baseURL: "http://foodvista-api.onrender.com/api",
    withCredentials: true
})