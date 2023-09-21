import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getError, getLoadingStatus, register, successStatus } from '../features/userSlice'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const error = useSelector(getError)
    let success = useSelector(successStatus)
    let loading = useSelector(getLoadingStatus)


    // const canSave = [name, email, password, confirmPassword].every(Boolean)

    const submitHandler = e => {
        e.preventDefault()

        console.log(loading);

        dispatch(register({
            name,
            email,
            password,
            confirmPassword
        }))
    }

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 offset-sm-1 offset-md-2 offset-lg-4 ">
                <h1 className='text-center display-4'>Register</h1>

                {loading ? (<div className=' d-flex justify-content-center align-items-center' style={{ height: '30vh' }}>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                ) : success ? (<div className='text-center mt-5'>
                    <h3 className='text-success'>Successfully Registerd!</h3>
                    <p className='mt-3'>Please <Link to='/login'>Login</Link> with this credientials to continue </p>
                </div>) : (
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className={error.name ? 'form-control is-invalid' : 'form-control '}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='Enter your name' />

                            {error.name && (
                                <div className="invalid-feedback">
                                    {error.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="text"
                                id="email"
                                className={error.email ? 'form-control is-invalid' : 'form-control '}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter your email' />

                            {error.email && (
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
                                className={error.password ? 'form-control is-invalid' : 'form-control '}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter a password' />

                            {error.password && (
                                <div className="invalid-feedback">
                                    {error.password}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={error.confirmPassword ? 'form-control is-invalid' : 'form-control '}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder='Type same Password' />

                            {error.confirmPassword && (
                                <div className="invalid-feedback">
                                    {error.confirmPassword}
                                </div>
                            )}
                        </div>

                        <span>
                            Already have an account? <Link to='/login'> Login</Link>
                        </span>

                        <button type='submit' className='btn btn-primary d-block mt-4 w-100'
                        >Submit</button>



                    </form>
                )

                }

                {/* {success ? (<div className='text-center mt-5'>
                    <h3 className='text-success'>Successfully Registerd!</h3>
                    <p className='mt-3'>Please <Link to='/login'>Login</Link> with this credientials to continue </p>
                </div>) : (
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className={error.name ? 'form-control is-invalid' : 'form-control '}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='Enter your name' />

                            {error.name && (
                                <div className="invalid-feedback">
                                    {error.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="text"
                                id="email"
                                className={error.email ? 'form-control is-invalid' : 'form-control '}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter your email' />

                            {error.email && (
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
                                className={error.password ? 'form-control is-invalid' : 'form-control '}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter a password' />

                            {error.password && (
                                <div className="invalid-feedback">
                                    {error.password}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={error.confirmPassword ? 'form-control is-invalid' : 'form-control '}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder='Type same Password' />

                            {error.confirmPassword && (
                                <div className="invalid-feedback">
                                    {error.confirmPassword}
                                </div>
                            )}
                        </div>

                        <span>
                            Already have an account? <Link to='/login'> Login</Link>
                        </span>

                        <button type='submit' className='btn btn-primary d-block mt-4 w-100'
                        >Submit</button>



                    </form>
                )
                } */}
            </div>
        </div >
    )
}

export default Register