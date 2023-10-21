import { apiRequests } from "../utils/apiRequests"

export const addToCart = ({ userId, itemId, option, flavour }) => {
    return apiRequests.post(`/cart/create/${itemId}`, { userId, itemId, option, flavour })
}

export const getCartItems = () => {
    return apiRequests.get("/cart/get")
}

export const deleteItem = (id) => {
    return apiRequests.delete(`/cart/delete/${id}`)
}

export const increaseQuantity = (id) => {
    return apiRequests.put(`/cart/increase/${id}`)
}

export const decreaseQuantity = (id) => {
    return apiRequests.put(`/cart/decrease/${id}`)
}