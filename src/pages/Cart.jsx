import { Link } from "react-router-dom"
import CartCard from "../components/CartCard"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import { getCartItemsAsync } from "../slices/cartSlice"
import TotalPrice from "../components/TotalPrice"

const Cart = () => {
    const { err } = useContext(UserContext)
    const { loading, items, error } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartItemsAsync())
    }, [dispatch])
    if (err) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <h3 className="text-xl">
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    to access your cart items
                </h3>
            </div>
        )
    }

    if (loading) {
        return (
            <Loading />
        )
    }
    if (error) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{error}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <h3 className="text-xl">
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    to access your cart items
                </h3>
            </div>
        )
    }
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

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 md:pt-6 pb-6" style={{
            minHeight: "calc(100vh - 60px)"
        }}>
            <div className="w-full md:w-1/2 flex md:hidden flex-col gap-4">
                <TotalPrice
                    totalPrice={totalPrice}
                    totalQuantity={totalQuantity}
                    discountPrice={discountPrice}
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {items.length === 0 && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-center">Your cart is empty!<br />Add some items to your cart</h1>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png" alt="" />
                    </div>
                )}
                {items && items.map((item => (
                    <CartCard key={item._id} item={item} />
                )))}
            </div>
            <div className="w-full md:w-1/2 hidden md:flex flex-col gap-4">
                <TotalPrice
                    totalPrice={totalPrice}
                    totalQuantity={totalQuantity}
                    discountPrice={discountPrice}
                />
            </div>
        </div>
    )
}

export default Cart
