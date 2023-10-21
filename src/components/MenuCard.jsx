import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const MenuCard = ({ item }) => {
    return (
        <div className="relative shadow-2xl w-full xs:w-80 h-80 flex justify-center items-center" key={item.id}>
            <img className="w-full h-full object-contain" src={item.image} alt="" />
            <div className="w-full h-full absolute bg-gray-900/50 hover:bg-gray-900 duration-200 top-0 flex flex-col gap-4 p-4">
                <h1 className="text-5xl">{item.title}</h1>
                <p>{item.desc.substring(0, 100)}...</p>
                <div className="pt-8">
                    <Link to={`/items?category=${item.category}`} className="px-4 py-2 bg-orange-500 shadow-lg">
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MenuCard
MenuCard.propTypes = {
    item: PropTypes.object.isRequired
}
