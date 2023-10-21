import { useReducer } from "react"
import { Link, useNavigate } from "react-router-dom"
import { apiRequests } from "../utils/apiRequests"
import { INITIAL_STATE, registrationReducer } from "../reducer/registrationReducer"
import OAuth from "../components/OAuth"

const Register = () => {
    const [state, dispatch] = useReducer(registrationReducer, INITIAL_STATE)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await apiRequests.post("/auth/create", {
                ...state
            })
            dispatch({ type: "CHANGE_INPUT", payload: res.data })
            if (res.status === 200) {
                navigate("/")
            }
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: { error: error.message } })
        }
    }

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }

    return (
        <div className="w-screen h-screen flex justify-center bg-orange-50 items-center px-4">
            <div className="w-full sm:w-4/6 lg:w-3/6 xl:w-2/6 border flex flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">
                    Sign Up to FoodVista
                </h1>
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    {state.err && (
                        <span className="text-red-500 italic">{state.err}</span>
                    )}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">NAME</label>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="name" name="name" id="name" placeholder="Enter your name" minLength={4} required onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email">EMAIL</label>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="email" name="email" id="email" placeholder="Enter your email" required onChange={handleChange} />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="password">PASSWORD</label>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="password" name="password" id="password" placeholder="Enter your password" minLength={5} required onChange={handleChange} />
                    </div>
                    <button type="submit" className="bg-orange-500 p-2 text-white rounded-md">Sign Up</button>
                    <div className="flex justify-center">
                        <span>OR</span>
                    </div>
                    <OAuth />
                </form>
                <div className="flex gap-1">
                    <span>Already have an Account?</span>
                    <Link to="/login" className="text-blue-500">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
