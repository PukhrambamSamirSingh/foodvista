import PropTypes from "prop-types"
import { flavours } from "../data"

const Flavour = ({ options, selectFlavour, setSelectFlavour }) => {
    const handleFlavour = (option) => {
        setSelectFlavour(option)
    }

    return (
        <div className="flex gap-4">
            {options.map((option, i) => (
                <button key={option} className={`${selectFlavour === option ? "bg-orange-500 text-white" : "border-2"} border-gray-500 rounded-md flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2`} onClick={() => handleFlavour(option)}>
                    <img className="w-6 h-6 object-contain" src={flavours[i]} alt="" />
                    <span className="text-sm sm:text-md uppercase">{option}</span>
                </button>
            ))}
        </div>
    )
}

export default Flavour
Flavour.propTypes = {
    options: PropTypes.array.isRequired,
    selectFlavour: PropTypes.string,
    setSelectFlavour: PropTypes.func.isRequired
}
