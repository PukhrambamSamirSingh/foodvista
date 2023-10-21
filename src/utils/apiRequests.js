import axios from "axios"

export const apiRequests = axios.create({
    baseURL: "https://food-vista-api.onrender.com/api",
    withCredentials: true
})