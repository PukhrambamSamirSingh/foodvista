import PropTypes from "prop-types";

const Size = ({ options, selectOption, setSelectOption, discount }) => {

    const handleOption = (option) => {
        setSelectOption(option)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 relative">
                <h1 className="text-2xl text-orange-500 font-bold">₹{selectOption?.value}</h1>
                <h1 className="absolute left-28 text-xl text-gray-500">{discount} % off</h1>
            </div>
            <div className="flex gap-4">
                {options.slice(1).map((option, i) => (
                    <button key={i} className={`${selectOption === option ? "bg-orange-500 text-white" : "border-2"} border-gray-500 rounded-md flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-md uppercase`} onClick={() => handleOption(option)}>
                        {option?.key}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Size;

Size.propTypes = {
    options: PropTypes.array.isRequired,
    selectOption: PropTypes.object,
    setSelectOption: PropTypes.func.isRequired,
    discount: PropTypes.number.isRequired
};
