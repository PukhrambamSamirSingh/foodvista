import { useState } from "react"
import PropTypes from "prop-types"

const SelectImg = ({ images }) => {
    const [selectedImg, setSelectedImg] = useState(0)

    return (
        <div className="w-full md:w-1/2">
            <div className="w-full hidden md:flex flex-col items-center gap-8 sticky top-[60px]" style={{
                height: "calc(100vh - 60px)"
            }}>
                <div className="w-full lg:w-[500px] h-72 lg:h-[60vh]">
                    <img className="w-full h-full object-cover" src={images[selectedImg]} alt="" />
                </div>
                <div className="flex gap-4 justify-center items-center">
                    {images.map((image, i) => (
                        <img className={`${selectedImg === i ? "border-2 rounded-md" : "border-none"} w-12 h-8 sm:w-16 sm:h-12 object-cover cursor-pointer`} key={i} src={image} alt="" onClick={() => setSelectedImg(i)} />
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 flex md:hidden flex-col items-center gap-8">
                <div className="w-screen lg:w-[500px] h-72 lg:h-[60vh]">
                    <img className="w-full h-full object-cover" src={images[selectedImg]} alt="" />
                </div>
                <div className="flex gap-4 justify-center items-center">
                    {images.map((image, i) => (
                        <img className={`${selectedImg === i ? "border-2 rounded-md" : "border-none"} w-16 h-12 object-cover cursor-pointer`} key={i} src={image} alt="" onClick={() => setSelectedImg(i)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectImg
SelectImg.propTypes = {
    images: PropTypes.array.isRequired
}