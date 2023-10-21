import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { MdLocationOn, MdKeyboardArrowDown } from "react-icons/md"
import { useContext, useState } from "react"
import Address from "../components/Address"
import { apiRequests } from "../utils/apiRequests"
import { useQuery } from "@tanstack/react-query"
import { offers } from "../data"
import { useDispatch } from "react-redux"
import { UserContext } from "../context/UserContext"
import { addToCartAsync } from "../slices/cartSlice"

const Home = () => {
    const [toggle, setToggle] = useState(false)
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
            console.log(error)
        })
    }
    const { isLoading, error, data } = useQuery({
        queryKey: ["items"],
        queryFn: async () => {
            const res = await apiRequests.get("/item/getdis")
            return res.data
        }
    })

    return (
        <div className="w-full flex flex-col min-h-screen pb-6">
            <div className="flex sm:hidden pb-4">
                {user && (
                    <div className="flex items-center gap-1">
                        <MdLocationOn />
                        <span>Deliver to {user.name}</span>
                        <MdKeyboardArrowDown className="text-xl" onClick={() => setToggle(prevState => !prevState)} />
                    </div>
                )}
            </div>
            {toggle && (
                <Address setToggle={setToggle} />
            )}
            <Header />
            <div className="w-full bg-black flex flex-col sm:flex-row-reverse sm:gap-8 sm:items-center rounded-md">
                <div className="w-full sm:w-1/2 flex flex-col gap-2 p-2">
                    <h1 className="text-2xl lg:text-4xl font-bold">{"Today's"} Special</h1>
                    <h1 className="text-3xl lg:text-5xl text-orange-500 font-bold">Surprise for you</h1>
                    <p className="text-gray-500 text-md">Burgers have evolved into numerous variations to cater to different tastes and dietary choices. Some popular variations include the cheeseburger, bacon burger, BBQ burger, veggie burger, and sliders (miniature burgers). Regional specialties, like the In-N-Out Burger in California or the Jucy Lucy in Minnesota, also offer unique twists on the classic burger.</p>
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex text-orange-500">
                            <span className="text-sm">₹</span>
                            <h1 className="text-4xl">250</h1>
                        </div>
                        <button className="p-2 bg-orange-500 text-sm shadow text-white max-w-max rounded-md">Order Now</button>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <img className="w-full" src="https://static.vecteezy.com/system/resources/previews/022/598/811/original/tasty-beef-burger-png.png" alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {offers.map((offer) => (
                    <div className="h-52 relative" key={offer.id}>
                        <div className="absolute left-2 top-2">
                            <h4 className="italic text-orange-500">Super</h4>
                            <h1 className="text-xl text-white font-bold">THIS FRIDAY<br />{offer.value}% OFF</h1>
                        </div>
                        <img className="w-full h-full object-cover" src={offer.image} alt="" />
                        <div className="absolute left-2 bottom-2 rounded-full bg-orange-500 w-16 h-16 flex flex-col items-center justify-center text-white">
                            <span>Save</span>
                            <div className="flex">
                                <span>₹</span>
                                <span>{offer.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-4 flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>{"Today's"}</h1>
                <h1 className="text-orange-500">Deal</h1>
            </div>
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 pt-8">
                {isLoading ? <h1 className="text-xl font-semibold">Loading...</h1> : error ? "Something went wrong" : data && data.map((item) => (
                    <div key={item._id} className="shadow-xl bg-black/50 rounded-lg overflow-hidden">
                        <Link to={`/${item.title}`}>
                            <img className="w-full h-48 sm:h-56 object-cover" src={item.images[0]} alt="" />
                            <div className="p-2">
                                <h3 className="text-lg font-semibold text-orange-500">{item.title}</h3>
                                <p className="text-sm">{item.desc.substring(0, 100)}...</p>
                            </div>
                        </Link>
                        <div className="flex text-orange-500 font-bold p-2 justify-between">
                            <h1 className="text-xl">₹{item.options[1].value}</h1>
                            <button className="w-6 h-6 flex justify-center items-center rounded-full bg-orange-500 text-white">
                                <PiShoppingCartSimpleBold onClick={() => handleAddToCart({ userId: user?._id, itemId: item?._id, option: item.options[1], flavour: item.flavours[0] })} className="cursor-pointer" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
