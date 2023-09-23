import React from 'react'

const LoadingDiv = () => {
    return (
        <div className="d-flex flex-column justify-content-center  align-items-center" style={{ height: '30vh' }}>
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <br />
            <h2>Loading...</h2>
        </div>
    )
}

export default LoadingDiv