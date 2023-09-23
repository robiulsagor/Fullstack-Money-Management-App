import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getUser, isAuthenticated, logout } from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"

const Home = () => {

    const user = useSelector(getUser)

    const time = new Date().getHours()

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">

                <Header />

                <div>
                    <h2>
                        {(time < '4') ? " Good Night 😴" : time < '12' ? "   Good Morning" : time < '18' ? " Good Afternoon" : time < '20' ? " Good Evening" : time <= '24' && " Good Night 😴"}
                        , {user.name}!</h2>
                </div>
            </div>
        </div>
    )
}

export default Home