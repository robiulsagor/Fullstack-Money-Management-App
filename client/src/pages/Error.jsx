import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>Error Happend! <br />
            You hit a wrong route!
            <br />
            <br />
            Go to <Link to="/">Home</Link>
        </div>
    )
}

export default Error