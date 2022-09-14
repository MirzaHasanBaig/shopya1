import React from 'react'
import {Link} from 'react-router-dom'
function Banners(props) {
  const {images} = props;
  return (
    <div className="container">
<div className="row category-banner-wrapper appear-animate pt-6 pb-8 fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
{images?.map((img,n)=>(
<div key={n}className="col-md-6 mb-4">
<Link to={img.link} className="banner banner-fixed br-xs">
<figure><img style={{backgroundColor: "#ecedec"}} src={img.image} alt="Category Banner" width="610" height="160" /></figure>
<div className="banner-content y-50 mt-0">
<h5 className="banner-subtitle font-weight-normal text-dark"><span className="text-secondary font-weight-bolder text-uppercase ls-25">{img.desc}</span></h5>
<h3 className="banner-title text-uppercase"><br /><span className="font-weight-normal text-capitalize">{img.title}</span></h3>
<div className="banner-price-info font-weight-normal"><span className="text-secondary font-weight-bolder">{img.tag}</span></div>
</div>
</Link>
</div>
))}
</div>
 </div>
  )
}

export default Banners