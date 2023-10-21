import { apiRequests } from "../utils/apiRequests"

export const fetchItems = ({ search }) => {
    return apiRequests.get(`/item/get${search}`)
}

export const deleteItem = (id) => {
    return apiRequests.delete(`/item/delete/${id}`)
}
