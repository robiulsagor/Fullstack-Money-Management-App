import { Link, NavLink } from "react-router-dom"


const Home = () => {
    return (
        <div>
            <div>
                <h2>Welcome to Homepage</h2>
            </div>

            <NavLink className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''} to='/'>Home</NavLink>
            <NavLink className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''} to='/login'>Login</NavLink>
            <NavLink className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''} to='/register'> Register</NavLink>
        </div>
    )
}

export default Home