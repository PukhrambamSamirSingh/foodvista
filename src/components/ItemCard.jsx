import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { AiFillStar } from "react-icons/ai"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { addToCartAsync } from "../slices/cartSlice"

const ItemCard = ({ item }) => {
    const { user } = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAddToCart = ({ userId, itemId, option, flavour }) => {
        const cartOption = {
            key: option.key,
            value: option.value
        }
        dispatch(addToCartAsync({
            userId,
            itemId,
            option: cartOption,
            flavour
        })).then(() => {
            navigate("/cart")
        }).catch((error) => {
            console.log("Error occurred while adding item to cart", error)
        })
    }

    return (
        <div className="w-full h-96 shadow-2xl relative rounded-md overflow-hidden">
            <Link to={`/${item.title}`}>
                <div className="w-full h-48 sm:h-56">
                    <img className="w-full h-full object-cover" src={item.images[0]} alt="" />
                </div>
            </Link>
            <div className="p-4">
                <Link to="/item" className="flex flex-col justify-center gap-2">
                    <div className="flex justify-between">
                        <div className="text-orange-500">
                            <h1 className="text-2xl font-bold">₹{item.options[1].value}</h1>
                            <h1 className="text-xl">{item.name}</h1>
                        </div>
                        <div className="flex pt-1 text-yellow-300">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div>
                    </div>
                    <p className="text-gray-500">{item.desc.substring(0, 60)}...</p>
                </Link>
                <div className="absolute bottom-2 right-2 w-6 h-6 flex justify-center items-center rounded-full bg-orange-500 text-white cursor-pointer">
                    <PiShoppingCartSimpleBold className="cursor-pointer" onClick={() => handleAddToCart({ userId: user?._id, itemId: item?._id, option: item.options[1], flavour: item.flavours[0] })} />
                </div>
            </div>
        </div>
    )
}

export default ItemCard
ItemCard.propTypes = {
    item: PropTypes.object.isRequired
}
