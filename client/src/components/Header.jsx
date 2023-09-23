import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../features/userSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(isAuthenticated)

    useEffect(() => {
        console.log("logout function called");
        !isLoggedIn && navigate('login')
    }, [isLoggedIn])


    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='mt-3 mb-5'>
            <div className="d-flex  gap-1 gap-lg-3" style={{ flexWrap: 'wrap' }}>
                <NavLink to='/'
                    className={({ isActive, isPending }) => isActive ? "btn btn-secondary" : "btn btn-primary"}>Home</NavLink>
                <NavLink to='/users'
                    className={({ isActive, isPending }) => isActive ? "btn btn-secondary" : "btn btn-primary"}>Users</NavLink>
                <NavLink to='/transactions'
                    className={({ isActive, isPending }) => isActive ? "btn btn-secondary" : "btn btn-primary"}>Transactions</NavLink>
                <NavLink to='/createTransaction'
                    className={({ isActive, isPending }) => isActive ? "btn btn-secondary" : "btn btn-primary"}>Create Transaction</NavLink>
                <button className="btn btn-danger " onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Header