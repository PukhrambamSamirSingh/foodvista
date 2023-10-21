import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const TotalPrice = ({ totalPrice, totalQuantity, discountPrice }) => {
    const delivery = totalQuantity === 0 ? 0 : 30;
    const subtotal = totalPrice - discountPrice + delivery;
    return (
        <>
            <div className="w-full h-72 shadow-2xl text-2xl font-bold">
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
                        <span>₹{subtotal}</span>
                    </div>
                </div>
            </div>
            <Link to="/checkout" className="w-full pt-4">
                <button className="bg-orange-500 w-full p-2 rounded-md text-xl">
                    Proceed to Checkout
                </button>
            </Link>
        </>
    )
}

export default TotalPrice
TotalPrice.propTypes = {
    totalPrice: PropTypes.number,
    totalQuantity: PropTypes.number,
    discountPrice: PropTypes.number
}
