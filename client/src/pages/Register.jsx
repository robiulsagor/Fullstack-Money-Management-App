import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const canSave = [name, email, password, confirmPassword].every(Boolean)

    const submitHandler = e => {
        e.preventDefault()
    }

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 offset-sm-1 offset-md-2 offset-lg-4 ">
                <h1 className='text-center display-4'>Register</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='Enter your name' />
                    </div>

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
                            placeholder='Enter a password' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className='form-control'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='Type same Password' />
                    </div>

                    <span>
                        Already have an account? <Link to='/login'> Login</Link>
                    </span>

                    <button type='submit' className='btn btn-primary d-block mt-4 w-100'
                        disabled={!canSave}>Submit</button>



                </form>
            </div>
        </div>
    )
}

export default Register