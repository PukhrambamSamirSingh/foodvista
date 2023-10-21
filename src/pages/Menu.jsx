import MenuCard from "../components/MenuCard"
import { menus } from "../data"

const Menu = () => {
    return (
        <div className="w-full min-h-screen flex flex-wrap pt-6 md:flex-row gap-4 md:gap-8 sm:items-center justify-center pb-6">
            {menus.map((item) => (
                <MenuCard key={item.id} item={item} />
            ))}
        </div>
    )
}

export default Menu
