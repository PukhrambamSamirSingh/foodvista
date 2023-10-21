import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { apiRequests } from "../utils/apiRequests"
import { useNavigate } from "react-router-dom"

const OAuth = () => {
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            const res = await apiRequests.post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                profilePic: result.user.photoURL
            })
            if (res.status === 200) {
                localStorage.setItem("User", JSON.stringify(res.data))
                navigate("/")
            }
        } catch (error) {
            console.log("Could not sign in with google", error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type="button" className="flex border-2 p-2 rounded-md items-center justify-center gap-2 bg-gray-800">
            <FcGoogle className="text-xl" />
            <span className="uppercase text-white">Continue with google</span>
        </button>
    )
}

export default OAuth
