import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoadingDiv from '../components/LoadingDiv'
import ErrDiv from '../components/ErrDiv'

const User = () => {
    const { userId } = useParams()
    const [userData, setUserData] = useState({})
    const [transactions, setTransactions] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        try {
            axios.get(`/api/users/${userId}`)
                .then(res => {

                    if (res.data.status === 'success') {
                        setStatus(res.data.status)
                        setUserData(res.data)
                        setTransactions(res.data.transactions)
                    } else if (res.data.status === 'failed') {
                        setStatus(res.data.status)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }, [])

    console.log(transactions);
    let sl = 1

    const handleDelete = async (id) => {
        const newTrans = transactions.filter(t => t._id !== id)
        console.log(newTrans);


        try {
            const { data } = await axios.delete(`/api/transactions/${id}`)
            console.log(data);
            setTransactions(newTrans)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">

                <Header />

                <h2>Transaction Details</h2>

                {loading ? <LoadingDiv /> : status === 'failed' ?
                    <ErrDiv err="Something went wrong!" />
                    : status === 'success' && (
                        <div className=" mt-3">
                            <span>Name: <b> {userData.name} </b> </span> <br />
                            <span>Email: <b>  {userData.email} </b> </span> <br />
                            <span>Total Income: <b> {userData.income} </b> </span> <br />
                            <span>Total Expense: <b> {userData.expense} </b> </span><br />
                            <span>Total Balance: <b> {userData.balance} </b> </span>

                            <table className="table mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Note</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {transactions.map(transaction => (
                                        <tr>
                                            <td>{sl++} </td>
                                            <td>{transaction.amount} </td>
                                            <td>{transaction.type} </td>
                                            <td>{transaction.note} </td>
                                            <td>
                                                <button type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(transaction._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>


                            {transactions.map(transaction => {
                                console.log(transaction.amount);
                            })}
                        </div>

                    )
                }



            </div>
        </div >
    )
}

export default User