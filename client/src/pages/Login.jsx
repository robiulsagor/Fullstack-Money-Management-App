import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const submitHandler = e => {
        e.preventDefault()
    }

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
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter your email' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className='form-control'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter your famous password' />
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