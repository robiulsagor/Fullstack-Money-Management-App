import axios from "axios"
import { useEffect, useState } from "react"


const Users = () => {
    const [users, setUsers] = useState({})

    useEffect(() => {
        axios.get("/api/users/all")
            .then(res => {
                setUsers(res.data)
                console.log(res.data);
            })
            .catch(err => console.log(err))
        console.log("get");
    }, [])


    let sl = 1

    const handleDelete = async (id) => {

        // axios.delete(`/api/users/${id}`)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         console.log("can't delete");
        //     })
        // console.log("deleted");
        // setUsers({})

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

    return (
        <div className="row mt-5">
            <div className="col-8 offset-2">



                {Object.keys(users).length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(users).map(user => {
                                return (
                                    <tr key={sl++}>
                                        <th>{sl++} </th>
                                        <td>{user[1].name} </td>
                                        <td>{user[1].email} </td>
                                        <td>
                                            <button type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user[1]._id)}>Delete</button>
                                        </td>
                                    </tr>)
                            })}

                        </tbody>
                    </table>
                ) : (
                    <h2>Loading....</h2>
                )
                }
            </div>
        </div>
    )
}

export default Users