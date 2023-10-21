import { useEffect, useState } from "react";

const images = [
    "https://freepngimg.com/save/139203-food-plate-top-nutrition-view/531x518",
    "https://www.freepnglogos.com/uploads/food-png/true-food-kitchen-35.png",
    "https://www.freepnglogos.com/uploads/food-png/food-plate-png-transparent-image-pngpix-2.png",
    "https://www.picng.com/upload/steak/png_steak_16403.png",
    "https://static.vecteezy.com/system/resources/previews/027/297/767/non_2x/hamburger-with-french-fries-on-wooden-plate-delivery-foods-isolated-on-white-transparent-background-ai-generate-png.png"
]
const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center pb-6">
            <div className="w-full sm:h-full sm:w-1/2 flex flex-col justify-center gap-2 sm:gap-4">
                <div className="flex flex-col font-bold">
                    <h1 className="text-3xl sm:text-4xl">Your Food is</h1>
                    <h1 className="text-5xl sm:text-6xl text-orange-500">Waiting For You!</h1>
                </div>
                <div className="w-full sm:w-4/5 h-48 xl:h-72">
                    {images.map((item, index) => (
                        <div key={index} className={`w-full h-full ${index !== currentIndex ? 'hidden' : ''} p-4`}>
                            <img className="w-full h-full object-contain animate__animated animate__backInLeft" src={item} alt="" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-orange-500">Always Fresh, Always Crispy & Always Hot!</p>
                    <button className="p-2 bg-orange-500 text-sm shadow text-white max-w-max rounded-md">Order Now</button>
                </div>
            </div>
            <div className="w-full h-60 xxs:h-72 xs:h-80 lg:h-96 sm:w-1/2 pt-6 pb-6">
                <img className="w-full h-full object-contain" src="https://static.wixstatic.com/media/dfbe9a_4771a178d9cd419fb632d23360c44609~mv2.png/v1/fill/w_560,h_504,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Asset%201_3x-min.png" alt="" />
            </div>
        </div>
    )
}

export default Header
