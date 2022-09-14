import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import {publicRequest} from './../../RequestMethods'
function Products(props) {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const getdata = async ()=>{
      const res = await publicRequest.get("/product/1");
      setProducts(res.data);
    }
    getdata();
  },[])
  return (
<div className='container'>
<div className="product-wrapper-1 appear-animate mb-5 fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
<div className="title-link-wrapper pb-1 mb-4">
<h2 className="title ls-normal mb-0">Clothing &amp; Apparel</h2>
<a className="font-size-normal font-weight-bold ls-25 mb-0" href="shop-boxed-banner.html">More Products</a></div>
<div className="row">
<div className="col-lg-3 col-sm-4 mb-4">
<div className="banner h-100 br-sm" style={{backgroundImage: "url('"+props.images[0]?.image+"')", backgroundColor: "#ebeced"}}>
<div className="banner-content content-top">
<h5 className="banner-subtitle font-weight-normal mb-2">{props.images[0]?.title}</h5>
<hr className="banner-divider bg-dark mb-2" />
<h3 className="banner-title font-weight-bolder ls-25 text-uppercase"><br /> <span className="font-weight-normal text-capitalize">{props.images[0]?.tag}</span></h3>
<Link className="btn btn-dark btn-outline btn-rounded btn-sm" to={props.images[0]?.link}>shop Now</Link></div>
</div>
</div>
<div className="col-lg-9 col-sm-8">
<div className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                                'spaceBetween': 20,
                                'slidesPerView': 2,
                                'breakpoints': {
                                    '992': {
                                        'slidesPerView': 3
                                    },
                                    '1200': {
                                        'slidesPerView': 4
                                    }
                                }
                            }">
<div id="swiper-wrapper-e68be0371510c0d37" className="swiper-wrapper " style={{transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms"}}>
<div className="swiper-slide product-col swiper-slide-active" style={{width: "216.25px", marginRight: "20px"}}>
{Products?.slice(0,2).map(item=>(
<div className="product-wrap product text-center hover-shadow" key={item._id?.toString()}>
<figure className="product-media" style={{height:"216.25px"}}>
  <Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>
    <img src={process.env.PUBLIC_URL+item.image?.toString()} alt="Product" width="216" height="243" />
  </Link>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
</div>
<div className="product-price"><ins className="new-price">{item.lowPrice?.toString()}</ins><del className="old-price">{item.prices?.toString()}</del></div>
</div>
</div>
))}
</div>
<div className="swiper-slide product-col swiper-slide-next" style={{width: "216.25px", marginRight: "20px"}}>
{Products?.slice(2,4).map(item=>(
<div className="product-wrap product text-center hover-shadow" key={item._id?.toString()}>
<figure className="product-media" style={{height:"216.25px"}}>
  <Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>
    <img src={process.env.PUBLIC_URL+item.image?.toString()} alt="Product" width="216" height="243" />
  </Link>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(3 reviews)</Link></div>
<div className="product-price"><ins className="new-price">{item.lowPrice?.toString()}</ins><del className="old-price">{item.prices?.toString()}</del></div>
</div>
</div>
))}
</div>
<div className="swiper-slide product-col" style={{width: "216.25px", marginRight: "20px"}}>
{Products?.slice(4,6).map(item=>(
<div className="product-wrap product text-center hover-shadow" key={item._id?.toString()}>
<figure className="product-media" style={{height:"216.25px"}}>
  <Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>
    <img src={process.env.PUBLIC_URL+item.image?.toString()} alt="Product" width="216" height="243" />
  </Link>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(3 reviews)</Link></div>
<div className="product-price"><ins className="new-price">{item.lowPrice?.toString()}</ins><del className="old-price">{item.prices?.toString()}</del></div>
</div>
</div>
))}
</div>
<div className="swiper-slide product-col" style={{width: "216.25px", marginRight: "20px"}}>
{Products?.slice(6,8).map(item=>(
<div className="product-wrap product text-center hover-shadow" key={item._id?.toString()}>
<figure className="product-media" style={{height:"216.25px"}}>
  <Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>
    <img src={process.env.PUBLIC_URL+item.image?.toString()} alt="Product" width="216" height="243" />
  </Link>
</figure>
<div className="product-details">
<h4 className="product-name"><Link to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
<div className="ratings-container">
<div className="ratings-full"> </div>
<Link className="rating-reviews" to={process.env.PUBLIC_URL+"/product/"+item.creatorid?.toString()+"/"+_.kebabCase(item.title?.toString())}>(3 reviews)</Link></div>
<div className="product-price"><ins className="new-price">{item.lowPrice?.toString()}</ins><del className="old-price">{item.prices?.toString()}</del></div>
</div>
</div>
))}
</div>
</div>
</div>
</div>
</div>
</div>
</div>
  )
}

export default Products