import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="w-full flex flex-col gap-2 bg-gray-800 text-gray-400 pt-4 pb-2">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 px-4 sm:px-48 py-2 gap-4">
                <div className="w-full flex flex-col justify-center items-center md:items-start">
                    <Link to="/">
                        <img className="w-14 h-14 object-contain" src="https://res.cloudinary.com/samircloud/image/upload/v1696399987/xy6zmu0phdzlsb0seff2.png" alt="" />
                    </Link>
                    <span className="text-sm">Anywhere, anytime, enjoy your shopping time.</span>
                </div>
                <div className="flex flex-col gap-3 justify-center items-center md:justify-start">
                    <h3 className="text-orange-500 font-semibold text-lg">Information</h3>
                    <Link to="/about" className="text-sm">About Us</Link>
                    <span className="text-sm">Event</span>
                    <span className="text-sm">More search</span>
                </div>
                <div className="flex flex-col gap-3 justify-center items-center md:justify-start">
                    <h3 className="text-orange-500 font-semibold text-lg">Helpful Links</h3>
                    <Link to="/services" className="text-sm">Services</Link>
                    <span className="text-sm">Support</span>
                    <span className="text-sm">Terms & Conditions</span>
                    <span className="text-sm">Privacy</span>
                </div>
                <div className="flex flex-col gap-3 justify-center items-center md:justify-start">
                    <h3 className="text-orange-500 font-semibold text-lg">Our Menu</h3>
                    <span className="text-sm">Driver</span>
                    <span className="text-sm">Catalog</span>
                    <span className="text-sm">Launch</span>
                </div>
            </div>
            <hr />
            <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between px-4 sm:px-48 py-2">
                <div className="flex gap-4">
                    <span className="text-sm">FAQ</span>
                    <span className="text-sm">Contact Us</span>
                    <span className="text-sm">Legal</span>
                </div>
                <p className="text-sm">All Rights Reserved Fast Food Creative 2023</p>
            </div>
        </div>
    )
}

export default Footer
