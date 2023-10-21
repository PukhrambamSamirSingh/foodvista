export const initialState = {
    userId: JSON.parse(localStorage.getItem("User"))?._id,
    images: [],
    title: "",
    desc: "",
    category: "",
    discount: 0,
    available: 0,
    flavours: [],
    options: [{
        key: "",
        value: 0
    }],
    totalStars: 0,
    starNumber: 0
}

export const itemReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "SET_IMAGES":
            return {
                ...state,
                images: action.payload.images
            }
        case "ADD_OPTION":
            return {
                ...state,
                options: [...state.options, { key: action.payload.key, value: action.payload.value }]
            }
        case "REMOVE_OPTION":
            return {
                ...state,
                options: state.options.filter((_, index) => index !== action.payload.index)
            }
        case "ADD_FLAVOUR":
            return {
                ...state,
                flavours: [...state.flavours, action.payload]
            }
        case "REMOVE_FLAVOUR":
            return {
                ...state,
                flavours: state.flavours.filter(flavour => flavour !== action.payload)
            }
        default:
            return state
    }
}

