import "./App.css"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import About from "./pages/About";
import Home from "./pages/Home"
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Menu from "./pages/Menu";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import "animate.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import ItemId from "./pages/ItemId";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Items from "./pages/Items";
import Checkout from "./pages/Checkout";
import Confirm from "./pages/Confirm";
import Profile from "./pages/Profile";
import { UserProvider } from "./context/UserContext";
import Add from "./pages/Add";
import Payment from "./pages/Payment";

const App = () => {
    const queryClient = new QueryClient()
    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <div className="flex flex-col bg-gray-900 text-white">
                        <Navbar />
                        <div className="p-4 sm:px-16 xl:px-48" style={{
                            minHeight: "calc(100vh - 60px)"
                        }}>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </UserProvider>
            </QueryClientProvider>
        )
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/menu",
                    element: <Menu />
                },
                {
                    path: "/services",
                    element: <Services />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
                {
                    path: "/:title",
                    element: <ItemId />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/orders",
                    element: <Orders />
                },
                {
                    path: "/items",
                    element: <Items />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/confirm",
                    element: <Confirm />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/add",
                    element: <Add />
                },
                {
                    path: "/payment",
                    element: <Payment />
                }
            ],
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/forgot",
            element: <Forgot />
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
