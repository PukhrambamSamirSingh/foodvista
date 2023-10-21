import { useState } from "react"
import { BsPlusCircle } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"

const AddItem = () => {
    const [addItem, setAddItem] = useState(false)
    const user = true

    return (
        <>
            {user && (
                <div className="flex">
                    <BsPlusCircle onClick={() => setAddItem(true)} />
                    {addItem && (
                        <div className="w-full h-full p-4 fixed bg-gray-900/50 top-0 right-0 animate__animated animate__zoomIn flex justify-center items-center">
                            <div className="w-full sm:w-3/6 bg-gray-900 p-4">
                                <div className="flex justify-between pb-4">
                                    <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                                        <h1>Add</h1>
                                        <h1 className="text-orange-500">Item</h1>
                                    </div>
                                    <div className="p-2">
                                        <RxCross2 className="text-2xl" onClick={() => setAddItem(false)} />
                                    </div>
                                </div>
                                <form className="flex flex-col gap-4">
                                    <input className="max-w-max" type="file" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item name" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item description" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="number" placeholder="Enter item price" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="number" placeholder="Enter item's cancel price" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item category" />
                                    <input className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item size" />
                                    <button className="bg-orange-500 p-2 rounded-md">Create</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default AddItem
