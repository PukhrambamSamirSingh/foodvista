import SelectImg from "../components/SelectImg"
import Flavour from "../components/Flavour"
import Size from "../components/Size"
import { AiFillStar } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import Reviews from "../components/Reviews"
import { useNavigate, useParams } from "react-router-dom"
import { apiRequests } from "../utils/apiRequests"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import Loading from "../components/Loading"
import { useDispatch } from "react-redux"
import { UserContext } from "../context/UserContext"
import { addToCartAsync } from "../slices/cartSlice"
import { deleteItemAsync } from "../slices/itemSlice"

const ItemId = () => {
    const { user } = useContext(UserContext)
    const { title } = useParams()
    const [selectOption, setSelectOption] = useState({
        key: "",
        value: 0
    })
    const [selectFlavour, setSelectFlavour] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            console.log("Error in adding item", error)
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteItemAsync(id))
            .then(() => {
                navigate(`/items?category=${data?.category}`)
            }).catch((error) => {
                throw new Error(error)
            })
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["item", title],
        queryFn: async () => {
            const { data } = await apiRequests.get(`/item/get/${title}`)
            return data
        }
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 pb-6 pt-6">
            <SelectImg images={data.images} />
            {data && (
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between relative">
                            <h1 className="text-2xl md:text-4xl font-bold text-orange-500">{data.title}</h1>
                            {(data?.userId?._id === user?._id) && (
                                <div className="w-14 h-14 absolute right-0">
                                    <MdDelete onClick={() => handleDelete(data?._id)} className="text-2xl cursor-pointer" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            <div className="flex pt-1 text-yellow-300">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                            <span>(12 reviews)</span>
                        </div>
                        <p className="text-md text-gray-400">{data.desc}</p>
                        <Flavour options={data.flavours} selectFlavour={selectFlavour} setSelectFlavour={setSelectFlavour} />
                        <Size discount={data.discount} options={data.options} selectOption={selectOption} setSelectOption={setSelectOption} />
                        <div className="w-full flex gap-4">
                            <button disabled={
                                !selectFlavour || !(selectOption && selectOption.value > 0) || !user
                            } className="bg-orange-500 px-4 py-2 rounded-md" onClick={() => handleAddToCart({ userId: user?._id, itemId: data?._id, option: selectOption, flavour: selectFlavour })}>Add To Cart</button>
                        </div>
                    </div>
                    <div className="pt-10">
                        <Reviews id={data._id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemId
