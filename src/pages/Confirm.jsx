import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { apiRequests } from "../utils/apiRequests"

const Confirm = () => {
    const [address, setAddress] = useState(null)
    const { items } = useSelector(state => state.cart)
    const delivery = 30
    const calculateTotalPrice = () => {
        return items.reduce(
            (result, item) => {
                const { quantity, itemId } = item
                const itemPrice = item.option.value || 0
                const itemDiscount = itemId.discount || 0
                result.totalPrice += quantity * itemPrice
                result.totalQuantity += quantity
                result.discountPrice += ((itemPrice * itemDiscount) / 100 * quantity)
                return result
            },
            {
                totalPrice: 0,
                totalQuantity: 0,
                discountPrice: 0
            }
        )
    }
    const { totalPrice, totalQuantity, discountPrice } = calculateTotalPrice()
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

    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-8 pt-2 sm:pt-6 pb-6">
            <div className="w-full md:w-3/5 flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                        <h1>Shipping</h1>
                        <h1 className="text-orange-500">Info</h1>
                    </div>
                    {address && (
                        <div className="p-4 flex flex-col gap-2 border border-gray-500 rounded-md">
                            <h2 className="text-lg font-semibold">{address.userId.name}</h2>
                            <span>Phone no.: {address.phone}</span>
                            <span>House no. {address.houseNumber}</span>
                            <span>{address.street}</span>
                            <div className="flex gap-1">
                                <span>{address.city},</span>
                                <span>{address.state},</span>
                                <span>{address.pinCode}</span>
                            </div>
                            <span>India</span>
                            <Link to="/checkout" className="w-full border border-gray-500 rounded-md p-2 flex justify-center">Edit Address</Link>
                        </div>
                    )}
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                        <h1>Your</h1>
                        <h1 className="text-orange-500">Cart Items</h1>
                    </div>
                    <div className="grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 gap-2 md:gap-4">
                        {items && items.map((item) => (
                            <div key={item._id} className="w-full flex flex-col gap-1 shadow-md">
                                <div className="w-full h-32">
                                    <img className="w-full h-full object-cover" src={item.itemId.images[0]} alt="" />
                                </div>
                                <div className="w-full p-2">
                                    <h2 className="text-orange-500 text-md lg:text-xl font-bold">{item.itemId.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-4">
                <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                    <h1>Order</h1>
                    <h1 className="text-orange-500">Summary</h1>
                </div>
                <div className="w-full p-4 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h1>Cart Total</h1>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <h1>Quantity Selected</h1>
                        <span>{totalQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                        <h1>Delivery</h1>
                        <span>₹{delivery}</span>
                    </div>
                    <div className="flex justify-between">
                        <h1>Discount</h1>
                        <span>₹{discountPrice}</span>
                    </div>
                </div>
                <hr />
                <div className="w-full p-4">
                    <div className="flex justify-between">
                        <h1>Subtotal</h1>
                        <span>₹{totalPrice - discountPrice + delivery}</span>
                    </div>
                </div>
                <Link to="/payment" className="bg-pink-500 w-full flex justify-center p-2 mt-2 rounded-xl text-lg font-semibold text-white">Pay ₹{totalPrice - discountPrice + delivery}</Link>
            </div>
        </div>
    )
}

export default Confirm
