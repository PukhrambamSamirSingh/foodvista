import { BiImageAdd } from "react-icons/bi"
import upload from "../utils/upload"
import { apiRequests } from "../utils/apiRequests"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

const ProfileImg = () => {
    const { user } = useContext(UserContext)
    const [selected, setSelected] = useState(null)
    const [saving, setSaving] = useState(false)
    const [pic, setPic] = useState({
        profilePic: user?.profilePic
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selected) {
            console.log("No image is uploaded")
        }
        setSaving(true)
        try {
            const url = await upload(selected)
            const res = await apiRequests.put("/user/setimage", {
                profilePic: url
            })
            setPic({ ...pic, ...res.data })
            setSaving(false)
        } catch (error) {
            setSaving(false)
            console.log(error)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelected(file)
        } else {
            console.log("No image is uploaded")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {user && (
                <div className="w-48 h-48 xs:w-60 xs:h-60 md:w-48 md:h-48 lg:w-60 lg:h-60 relative">
                    {selected ? (
                        <img className="w-full border border-gray-500 rounded-full h-full object-cover" src={URL.createObjectURL(selected)} alt="" />
                    ) : (
                        <img className="w-full border border-gray-500  rounded-full h-full object-cover" src={user.profilePic} alt="" />
                    )}
                    <div className="w-full h-full absolute top-0 left-0 hover:bg-gray-900/50 duration-200 hover:text-white flex items-center justify-center">
                        <label htmlFor="file">
                            <BiImageAdd className="text-3xl cursor-pointer" />
                            <input type="file" name="file" id="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
            )}
            <div className="pt-2">
                <button className="bg-orange-500 px-4 py-2 rounded-lg">
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    )
}

export default ProfileImg
