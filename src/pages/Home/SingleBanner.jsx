import React from 'react'
import {Link} from 'react-router-dom'
function SingleBanner(props) {
  const {images} = props;
  return (
    <div className='container'>
        <div className="banner banner-fashion appear-animate br-sm mb-9 fadeIn appear-animation-visible" style={{backgroundImage: "url('"+images[0]?.image+"')", backgroundColor: "#383839", animationDuration: "1.2s"}}>
        <div className="banner-content align-items-center">
        <div className="content-left d-flex align-items-center mb-3">
        <div className="banner-price-info font-weight-bolder text-secondary text-uppercase lh-1 ls-25">{images[0]?.tag||"not-found"} <sup className="font-weight-bold">%</sup><sub className="font-weight-bold ls-25">Off</sub></div>
        <hr className="banner-divider bg-white mt-0 mb-0 mr-8" /></div>
        <div className="content-right d-flex align-items-center flex-1 flex-wrap">
        <div className="banner-info mb-0 mr-auto pr-4 mb-3">
        <h3 className="banner-title text-white font-weight-bolder text-uppercase ls-25">{images[0]?.title||"not-found"}</h3>
        <p className="text-white mb-0">{images[0]?.desc||"not-found"}</p>
        </div>
        <Link className="btn btn-white btn-outline btn-rounded btn-icon-right mb-3" to={images[0]?.link||"not-found"}>Shop Now</Link></div>
        </div>
        </div>
    </div>
  )
}

export default SingleBanner