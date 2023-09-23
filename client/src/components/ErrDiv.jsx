import React from 'react'

const ErrDiv = ({ err }) => {
    return (
        <div className="d-flex flex-column justify-content-center  align-items-center" style={{ height: '30vh' }}>
            <h2 className="text-danger">{err} </h2>
        </div>
    )
}

export default ErrDiv