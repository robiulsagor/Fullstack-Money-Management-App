import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated, logout } from "../features/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector(isAuthenticated)

    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        !isLoggedIn && navigate('/login')
    }, [handleLogout])


    return (
        <div className="row">
            <div className="col-8 ">

                <div>
                    <h2>Welcome to Homepage</h2>
                </div>

                <button className="btn btn-danger mt-5" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Home