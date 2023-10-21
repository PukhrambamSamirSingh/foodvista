import axios from "axios"

export const apiRequests = axios.create({
    baseURL: "http://food-vista-api.onrender.com/api",
    withCredentials: true
})