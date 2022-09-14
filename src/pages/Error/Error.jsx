import React from 'react'
import {Link} from 'react-router-dom'
function Error() {
  return (
    <React.Fragment>
        <div className="page-content error-404" style={{margin:"5vw 15vw"}}>
            <div className="container">
                <div className="banner">
                    <div className="banner-content text-center">
                        <h2 className="banner-title">
                            <span className="text-secondary">Oops!!!</span> Something Went Wrong Here
                        </h2>
                        <p className="text-light">There may be a misspelling in the URL entered, or the page you are looking for may no longer exist</p>
                        <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go Back Home<i className="w-icon-long-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Error