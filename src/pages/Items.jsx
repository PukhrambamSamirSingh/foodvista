import { useEffect } from "react"
import ItemCard from "../components/ItemCard"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import { fetchItemsAsync } from "../slices/itemSlice"
import Loading from "../components/Loading"

const Items = () => {
    const { search } = useLocation()

    const { loading, items, error } = useSelector(state => state.item)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchItemsAsync({ search }))
    }, [dispatch, search])

    if (loading) {
        return (
            <Loading />
        )
    }
    if (error) {
        return (
            <div>
                Error:{error}
            </div>
        )
    }

    return (
        <div className="w-full h-full xxs:pt-6 pb-6">
            {items.length === 0 && (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                        <h1>No {"Item's"}</h1>
                        <h1 className="text-orange-500">Found</h1>
                    </div>
                    <img className="w-full h-full sm:w-96 sm:h-96 object-contain" src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044861-6430770.png" alt="" />
                </div>
            )}
            <div className="w-full grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Items
