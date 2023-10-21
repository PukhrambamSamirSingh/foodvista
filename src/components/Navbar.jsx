import { Link } from "react-router-dom"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { useContext, useEffect, useState } from "react"
import { FaHamburger } from "react-icons/fa"
import { GiCrossedSabres } from "react-icons/gi"
import { BsPlusCircle } from "react-icons/bs"
import { UserContext } from "../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync } from "../slices/cartSlice"

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const { user } = useContext(UserContext)
    const items = useSelector(state => state.cart.items)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartItemsAsync())
    }, [dispatch])

    return (
        <div className="w-full flex items-center justify-between bg-orange-500 text-white px-4 py-2 sm:px-16 xl:px-48 sticky top-0 z-10">
            <Link to="/" className="w-12 h-12 sm:w-14 sm:h-14">
                <img className="w-full h-full object-contain" src="https://res.cloudinary.com/samircloud/image/upload/v1696399987/xy6zmu0phdzlsb0seff2.png" alt="" />
            </Link>
            <div className="hidden md:flex gap-6">
                <Link to="/">
                    Home
                </Link>
                <Link to="/menu">
                    Menu
                </Link>
                <Link to="/services">
                    Services
                </Link>
                <Link to="/about">
                    About Us
                </Link>
                <Link to="/contact">
                    Contact Us
                </Link>
            </div>
            <div className="flex items-center justify-between gap-6">
                {/* <AddItem /> */}
                {user?.isAdmin && (
                    <Link to="/add">
                        <BsPlusCircle />
                    </Link>
                )}
                <Link to="/cart" className="relative">
                    <PiShoppingCartSimpleBold className="text-xl" />
                    <span className="absolute top-[-8px] left-2 bg-gray-500 w-4 h-4 flex items-center justify-center rounded-full">{items && items.length}</span>
                </Link>
                <div className="hidden md:block">
                    {user ? (
                        <Link to="/profile">
                            <img className="w-12 h-12 object-cover rounded-full" src={user.profilePic} alt="" />
                        </Link>
                    ) : (
                        <Link to="/login" className="px-4 py-2 rounded-md border">Sign In</Link>
                    )}
                </div>
                <div className="w-full relative block md:hidden">
                    <FaHamburger onClick={() => setToggle(true)} />
                    {toggle && (
                        <div className="w-full fixed top-16 sm:top-[72px] bg-gray-900/50 right-0 animate__animated animate__bounceInRight flex justify-between" style={{
                            height: "calc(100vh - 60px)"
                        }}>
                            <div className="p-2">
                                <GiCrossedSabres onClick={() => setToggle(false)} />
                            </div>
                            <div className="bg-orange-500 w-2/3 h-full flex justify-center items-center text-center">
                                <div className="flex flex-col gap-6">
                                    <Link to="/">
                                        Home
                                    </Link>
                                    <Link to="/menu">
                                        Menu
                                    </Link>
                                    <Link to="/services">
                                        Services
                                    </Link>
                                    <Link to="/about">
                                        About Us
                                    </Link>
                                    {user && (
                                        <Link to="/profile">
                                            Profile
                                        </Link>
                                    )}
                                    <Link to="/contact">
                                        Contact Us
                                    </Link>
                                    {!user && (
                                        <Link to="/login" className="px-6 py-2 rounded-md border block sm:hidden">Sign In</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
