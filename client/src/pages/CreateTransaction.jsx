import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Header from '../components/Header'
import { getUser, resetFields } from '../features/userSlice'

const CreateTransaction = () => {
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [user, setUser] = useState('Sagor')
    const [userId, setUserId] = useState('')
    const [note, setNote] = useState('fdfdff')

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const getUserInfo = useSelector(getUser)

    useEffect(() => {
        dispatch(resetFields())
    }, [])

    useEffect(() => {
        setUser(getUserInfo.name)
        setUserId(getUserInfo._id)
    }, [getUserInfo])

    const canSave = amount !== '' && type !== ''

    const submitHandler = e => {
        e.preventDefault()

        console.log({ amount, type, note });

        try {
            axios.post('/api/transactions', { amount, type, note })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">
                <Header />

                <h1 className='text-center display-4'>Create Transaction</h1>

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
                            <label htmlFor="amount" className="form-label">Amount:</label>
                            <input
                                type="number"
                                id="amount"
                                className={error.amount ? 'form-control is-invalid' : 'form-control '}
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder='Enter amount' />

                            {error.amount && (
                                <div className="invalid-feedback">
                                    {error.amount}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type:</label>
                            <select className="form-select" aria-label="type" onChange={e => setType(e.target.value)}>
                                <option defaultValue={''}>Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>


                            {error.type && (
                                <div className="invalid-feedback">
                                    {error.type}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">User / Author:</label>
                            <input
                                type="text"
                                id="user"
                                className={'form-control '}
                                value={user}
                                disabled />

                            <input
                                type="hidden"
                                className={'form-control '}
                                value={userId}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="note" className="form-label">Note: </label>
                            <textarea id="note" cols="30" rows="5"
                                placeholder='Type your note'
                                className='form-control' value={note}
                                onChange={e => setNote(e.target.value)}> </textarea>
                        </div>

                        <button type='submit' className='btn btn-primary d-block mt-4 w-100'
                            disabled={!canSave} >Submit</button>



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

export default CreateTransaction