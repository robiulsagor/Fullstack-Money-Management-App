import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getError, isAuthenticated, login } from '../features/userSlice'
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const error = useSelector(getError)
    const isLoggedIn = useSelector(isAuthenticated)

    const submitHandler = e => {
        e.preventDefault()
        setFormSubmitted(true)

        dispatch(login({
            email, password
        }))
    }

    useEffect(() => {
        isLoggedIn && navigate("/")
    }, [submitHandler])


    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 offset-sm-1 offset-md-2 offset-lg-4 ">
                <h1 className='text-center display-4'>Login</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="text"
                            id="email"
                            className={(formSubmitted && error.email) ? 'form-control is-invalid' : 'form-control '}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter your email' />

                        {(formSubmitted && error.email) && (
                            <div className="invalid-feedback">
                                {error.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className={(formSubmitted && error.password) ? 'form-control is-invalid' : 'form-control '}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter your famous password' />

                        {(formSubmitted && error.password) && (
                            <div className="invalid-feedback">
                                {error.password}
                            </div>
                        )}
                    </div>

                    <span>
                        Already have an account? <Link to='/register'> Register</Link>
                    </span>

                    <button type='submit' className='btn btn-primary d-block mt-4 w-100'>Submit</button>



                </form>
            </div>
        </div>
    )
}

export default Login