import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { MdClose } from "react-icons/md"
import { TbMapPinCode } from "react-icons/tb"
import { UserContext } from "../context/UserContext"
import { apiRequests } from "../utils/apiRequests"

const Address = ({ setToggle }) => {
    const { user } = useContext(UserContext)
    const [address, setAddress] = useState(null)
    const [changePincode, setChangePincode] = useState(false)
    const [pinCode, setPinCode] = useState("")
    useEffect(() => {
        try {
            const getAddress = async () => {
                const res = await apiRequests.get("/address/get")
                setAddress(res.data)
            }
            getAddress()
        } catch (error) {
            throw new Error(error)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await apiRequests.put("/address/updatepin", { pinCode })
            setPinCode("")
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div className="w-full min-h-[260px] animate__animated animate__backInUp animate__faster fixed -ml-2 xxs:-ml-4 p-4 bottom-[-1px] bg-gray-950 z-10 flex flex-col gap-2 sm:hidden">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 font-bold text-2xl">
                    <h1>Your</h1>
                    <h1 className="text-orange-500">Address</h1>
                </div>
                <MdClose className="text-2xl" onClick={() => setToggle(false)} />
            </div>
            <div className="border rounded-md p-4">
                <h2 className="text-xl text-white font-semibold">{user && user.name}</h2>
                {address && (
                    <div className="flex flex-col text-gray-500 mt-2">
                        <span>House no. {address.houseNumber}</span>
                        <span>{address.state}</span>
                        <span>{address.city}</span>
                        <span>Pincode: {address.pinCode}</span>
                    </div>
                )}
            </div>
            <div className="w-full">
                {changePincode ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white">
                            <MdClose className="text-xl" onClick={() => setChangePincode(false)} />
                            <span>Change current pincode</span>
                        </div>
                        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
                            <input value={pinCode} className="p-2 rounded-md bg-transparent outline-none border text-white" type="text" placeholder="Enter new pincode" onChange={(e) => setPinCode(e.target.value)} minLength={6} />
                            <button className="bg-green-500 py-2 rounded-md text-white">Apply</button>
                        </form>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center" onClick={() => setChangePincode(true)}>
                        <TbMapPinCode className="text-xl text-white" />
                        <span className="text-blue-500">Change current pincode</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Address
Address.propTypes = {
    setToggle: PropTypes.func
}
