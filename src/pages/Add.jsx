import { useContext, useReducer, useState } from "react"
import { itemReducer } from "../reducer/itemReducer"
import { initialState } from "../reducer/itemReducer"
import { apiRequests } from "../utils/apiRequests"
import upload from "../utils/upload"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Add = () => {
    const { err } = useContext(UserContext)
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const [images, setImages] = useState([]);
    const [state, dispatch] = useReducer(itemReducer, initialState)
    const [loading, setLoading] = useState(false)
    if (err) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
            </div>
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await apiRequests.post("/item/create", {
                ...state
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: res.data
            })
            if (res.status === 200) {
                navigate(`/items?category=${res.data.category}`)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }
    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const images = await Promise.all(
                [...files].map(async file => {
                    const url = await upload(file)
                    return url
                })
            )
            dispatch({
                type: "SET_IMAGES",
                payload: { images }
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;

        // Display image previews
        const imagePreviews = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const imageUrl = URL.createObjectURL(file);
            imagePreviews.push(imageUrl);
        }

        setFiles(selectedFiles);
        setImages(imagePreviews);
    };

    const handleOption = (e) => {
        e.preventDefault()
        const sizeKey = e.target.sizeKey.value.trim()
        const sizeValue = parseInt(e.target.sizeValue.value)
        if (sizeKey && sizeValue) {
            dispatch({
                type: "ADD_OPTION",
                payload: { key: sizeKey, value: sizeValue }
            })
        }
        e.target.sizeKey.value = ""
        e.target.sizeValue.value = ""
    }
    const handleFlavour = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_FLAVOUR",
            payload: e.target[0].value
        })
        e.target[0].value = ""
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 pb-6">
            <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>Add</h1>
                <h1 className="text-orange-500">Item</h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="images">Add Images</label>
                        <input name="images" id="images" className="" type="file" multiple onChange={handleFileChange} />
                        <div className="flex flex-wrap gap-4">
                            {images.map((imageUrl, index) => (
                                <img className="w-48 h-28 object-cover" key={index} src={imageUrl} alt={`Image ${index}`} />
                            ))}
                        </div>
                        <button onClick={handleUpload} className="bg-orange-500 p-2 rounded-md">{loading ? "Uploading" : "Upload"}</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <input name="title" id="title" className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item name" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc">Description</label>
                        <textarea cols="30" rows="6" name="desc" id="desc" className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item description" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="discount">Discount</label>
                        <input name="discount" id="discount" className="p-2 bg-transparent outline-none border rounded-md" type="number" placeholder="Enter discount value e.g 5" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="available">Available Quantity</label>
                        <input name="available" id="available" className="p-2 bg-transparent outline-none border rounded-md" type="number" placeholder="Enter plates no. value e.g 4" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <input name="category" id="category" className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item category" onChange={handleChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="options">Add sizes</label>
                        <form onSubmit={handleOption} className="w-full flex gap-2">
                            <input
                                name="sizeKey"
                                id="sizeKey"
                                className="w-3/6 p-2 bg-transparent outline-none border rounded-md"
                                type="text"
                                placeholder="Enter item size e.g. small, medium, large"
                                required
                            />
                            <input
                                name="sizeValue"
                                id="sizeValue"
                                className="w-2/6 p-2 bg-transparent outline-none border rounded-md"
                                type="number"
                                placeholder="Value"
                                required
                            />
                            <button type="submit" className="w-1/6 p-2 bg-orange-500 rounded-md">add</button>
                        </form>
                        <div className="flex flex-wrap gap-2">
                            {state?.options?.slice(1).map((option, index) => (
                                <button className="bg-orange-500 rounded-md px-4 py-2 flex gap-2 items-center" key={index}>
                                    {option.key} - {option.value}
                                    <RxCross2 className="text-xl" onClick={() => dispatch({
                                        type: "REMOVE_OPTION",
                                        payload: { index }
                                    })} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="flavours">Add Flavours</label>
                        <form onSubmit={handleFlavour} className="w-full flex gap-2">
                            <input name="flavours" id="flavours" className="w-4/6 p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item flavours e.g. mild, spicy, hot" />
                            <button type="submit" className="px-6 py-2 bg-orange-500 rounded-md">add</button>
                        </form>
                        <div className="flex gap-2">
                            {state?.flavours?.map(flavour => (
                                <button key={flavour} className="bg-orange-500 rounded-md px-4 py-2 flex gap-2 items-center">
                                    {flavour}
                                    <RxCross2 className="text-xl" onClick={() =>
                                        dispatch({
                                            type: "REMOVE_FLAVOUR",
                                            payload: flavour
                                        })
                                    } />
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="bg-orange-500 p-2 rounded-md">{loading ? "Creating..." : "Create"}</button>
                </div>
            </div>
        </div>
    )
}

export default Add
