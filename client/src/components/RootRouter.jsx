
// import { persistor } from './store/index'
import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Error from '../pages/Error.jsx'
import Register from '../pages/Register.jsx'
import Users from '../pages/Users';
import Transactions from '../pages/Transactions';
import CreateTransaction from '../pages/CreateTransaction';
import { persistor } from '../store'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../features/userSlice.js';
import { useEffect } from 'react';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/users',
        element: <Users />
    },
    {
        path: '/transactions',
        element: <Transactions />
    },
    {
        path: '/createTransaction',
        element: <CreateTransaction />
    },

])

const RootRouter = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector(isAuthenticated)
    console.log(isLoggedIn);

    useEffect(() => {
        // !isLoggedIn && navigate('/login')
        !isLoggedIn && redirect("../login")
        !isLoggedIn ? console.log("not logged in") : console.log("Logged in");;

    }, [])

    return (
        <RouterProvider router={router} />
    )
}

export default RootRouter