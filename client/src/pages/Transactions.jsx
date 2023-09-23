import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import ErrDiv from "../components/ErrDiv"
import LoadingDiv from "../components/LoadingDiv"


const Transactions = () => {
    const [trans, setTrans] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState('')

    let sl = 1

    useEffect(() => {
        setLoading(true)

        axios.get("/api/transactions")
            .then(({ data }) => {
                if (data.status === 'failed') {
                    setErr("Something went wrong: Failed fetching")
                    setLoading(false)

                } else if (data.status === 'success') {
                    setTrans(data.data)
                    setLoading(false)
                    setSuccess(true)
                    setErr('')
                    console.log(data);
                }
            })
            .catch(err => {
                setLoading(false)
                err.response.status == 500 ? setErr("Server Error!") : setErr("Something went wrong!")
            })
    }, [])

    const handleDelete = async (id) => {
        const transformObject = (obj) => {
            return { ...obj }
        };

        const newArr = trans.map(transformObject)

        const matchingObjects = newArr.filter((t) => t._id !== id);

        try {
            const { data } = await axios.delete(`/api/transactions/${id}`)
            console.log(data);
            data.deleteCount == 1 && setTrans(matchingObjects)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">

                <Header />

                {loading ? <LoadingDiv /> : err ? <ErrDiv err={err} /> : success && (
                    Object.keys(trans).length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(trans).map(t => {
                                    return (
                                        <tr key={t[1]._id}>
                                            <th>{sl++} </th>
                                            <td>{t[1].amount} </td>
                                            <td>{t[1].type} </td>
                                            <td>{t[1].note} </td>
                                            <td>{
                                                t[1].author?.name ? t[1].author.name
                                                    : <i style={{ color: '#999' }} >null</i>
                                            } </td>
                                            <td>
                                                <button type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(t[1]._id)}>Delete</button>
                                            </td>
                                        </tr>)
                                })}

                            </tbody>
                        </table>
                    ) : <ErrDiv err={'No Transaction Found!'} />
                )}


            </div>
        </div >
    )
}

export default Transactions