import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import {publicRequest} from './../../RequestMethods'

function Popullar() {
  const history = useHistory();
  const [Products, setProducts] = useState([]);
  useEffect(()=>{
    try{
    const getdata = async()=>{
    const res = await publicRequest.get("/product/1");
    !res.data&&history.push("/not-found");
    setProducts(res.data);
    }
    getdata();
    }catch(err){
      history.push("/not-found");
  }
  },[])
  return (
<div className='container'>
<h2 className="title justify-content-center ls-normal mb-4 mt-10 pt-1 appear-animate fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>Popular Departments</h2>
<div className="tab tab-nav-boxed tab-nav-outline appear-animate fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
<ul className="nav nav-tabs justify-content-center">
<li className="nav-item mr-2 mb-2"><a className="nav-link active br-sm font-size-md ls-normal" href="#tab1-1">New arrivals</a></li>
<li className="nav-item mr-2 mb-2"><a className="nav-link br-sm font-size-md ls-normal" href="#tab1-2">Best seller</a></li>
<li className="nav-item mr-2 mb-2"><a className="nav-link br-sm font-size-md ls-normal" href="#tab1-3">most popular</a></li>
<li className="nav-item mr-0 mb-2"><a className="nav-link br-sm font-size-md ls-normal" href="#tab1-4">Featured</a></li>
</ul>
</div>
<div className="tab-content product-wrapper appear-animate fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
<div id="tab1-1" className="tab-pane active pt-4">
<div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
{Products?.slice(0,10).map(item=>(
<div className="product-wrap hover-shadow" key={item._id?.toString()}>
<div className="product text-center">
<figure className="product-media" style={{height:"217px"}}><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}> 
<img src={item.image?.toString()} alt="Product" width="300" height="338" /></Link>
<div className="product-action-vertical"> </div>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="product-price"><ins className="new-price">{"RS "+item.lowPrice?.toString()}</ins></div>
</div>
</div>
</div>)
)}
</div>
</div>
<div id="tab1-2" className="tab-pane pt-4">
<div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
{Products?.slice(0,10).map(item=>(
<div className="product-wrap hover-shadow " key={item._id?.toString()}>
<div className="product text-center">
<figure className="product-media" style={{height:"217px"}}><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}> 
<img src={item.image?.toString()} alt="Product" width="300" height="338" /></Link>
<div className="product-action-vertical"> </div>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(1 Reviews)</Link></div>
<div className="product-price"><ins className="new-price">{"RS "+item.lowPrice?.toString()}</ins></div>
</div>
</div>
</div>)
)}
</div>
</div>
<div id="tab1-3" className="tab-pane pt-4">
<div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
{Products?.slice(0,10).map(item=>(
<div className="product-wrap hover-shadow " key={item._id?.toString()}>
<div className="product text-center">
<figure className="product-media" style={{height:"217px"}}><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}> 
<img src={item.image?.toString()} alt="Product" width="300" height="338" /></Link>
<div className="product-action-vertical"> </div>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(1 Reviews)</Link></div>
<div className="product-price"><ins className="new-price">{"RS "+item.lowPrice?.toString()}</ins></div>
</div>
</div>
</div>)
)}
</div>
</div>
<div id="tab1-4" className="tab-pane pt-4">
<div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
{Products?.slice(0,10).map(item=>(
<div className="product-wrap hover-shadow " key={item._id?.toString()}>
<div className="product text-center">
<figure className="product-media" style={{height:"217px"}}><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}> 
<img src={item.image?.toString()} alt="Product" width="300" height="338" /></Link>
<div className="product-action-vertical"> </div>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(1 Reviews)</Link></div>
<div className="product-price"><ins className="new-price">{"RS "+item.lowPrice?.toString()}</ins></div>
</div>
</div>
</div>)
)}
</div>
</div>
</div>
    </div>
  )
}

export default Popullar