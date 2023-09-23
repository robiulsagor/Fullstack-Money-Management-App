import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import LoadingDiv from "../components/LoadingDiv"
import ErrDiv from "../components/ErrDiv"


const Users = () => {
    const [users, setUsers] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)

        try {
            axios.get("/api/users/all")
                .then(({ data }) => {
                    console.log(data);
                    if (data.status === 'failed') {
                        setErr(`Something went wrong: ${data.message}`)
                        setLoading(false)
                    } else if (data.status === 'success') {
                        setUsers(data.data)
                        setLoading(false)
                        setSuccess(true)
                        setErr('')
                    }
                })
                .catch(err => {
                    console.log("error 1");
                    console.log(err);
                    setLoading(false)
                    err.response.status == 500 ? setErr("Server Error!") : setErr("Something went wrong!")
                })
        } catch (error) {
            console.log("error");
            setLoading(false)
            err.response.status == 500 ? setErr("Server Error!") : setErr("Something went wrong!")
        }
    }, [])

    const handleDelete = async (id) => {
        const transformObject = (obj) => {
            return { ...obj }
        };

        const newArr = users.map(transformObject)

        const matchingObjects = newArr.filter((user) => user._id !== id);

        try {
            console.log("deleted");
            const { data } = await axios.delete(`/api/users/${id}`)
            console.log(data.deletedCount);
            data.deletedCount == 1 && setUsers(matchingObjects)
        } catch (error) {
            console.log(error);
        }
    }

    let sl = 1


    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">

                <Header />
                {loading ? <LoadingDiv /> : err ? <ErrDiv err={err} /> : success && (
                    Object.keys(users).length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Income</th>
                                    <th scope="col">Expense</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(users).map(user => {
                                    return (
                                        <tr key={user[1]._id}>
                                            <th>{sl++} </th>
                                            <td>
                                                <Link to={`/users/${user[1]._id}`}>{user[1].name}</Link>
                                            </td>
                                            <td>{user[1].email} </td>
                                            <td>{user[1].income} </td>
                                            <td>{user[1].expense} </td>
                                            <td>{user[1].balance} </td>
                                            <td>
                                                <button type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(user[1]._id)}>Delete</button>
                                            </td>
                                        </tr>)
                                })}

                            </tbody>
                        </table>
                    )
                        : <ErrDiv err="No User Found!" />
                )}


            </div>
        </div >
    )
}

export default Users