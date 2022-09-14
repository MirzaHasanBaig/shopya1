import React, { useEffect, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import {publicRequest} from './../../RequestMethods'
import _ from 'lodash'
function Store() {
    const location = useLocation();
    const [style, setstyle] = useState();
    const { innerWidth: width } = window;
    const [products, setproducts] = useState([]);
    const [vendor, setvendor] = useState({});
    const [uniqcat, setuniqcat] = useState([]);
    const url ="";
    const ven = location.pathname.split("/")[2];
    var cat = [];
    useEffect(() => {
        if(width<768){
            setstyle({position: "relative",padding:"5%",marginTop:"20px"})
        }
        else{setstyle({position:"absolute",top:"0px",padding:"5%"})
    }
    }, [width]);
    useEffect(()=>{
        try{
            const getdata = async()=>{
                const products = await publicRequest.get(`/product/user/${ven}`);
                const getvendor = await publicRequest.get(`users/find/vendor/${ven}`);
                products.data.map(product=>cat.push(product.category));
                const unique = cat.filter((x, i, a) => a.indexOf(x) === i);
                setuniqcat(unique);
                setproducts(products.data);
                setvendor(getvendor.data);
            }
            getdata();
        }catch(err){}
    },[ven])
  return (
    <div className="page-content mb-8 mt-8">
        <div className="container">
            <div className="row gutter-lg">
                <aside className="sidebar left-sidebar vendor-sidebar sticky-sidebar-wrapper sidebar-fixed">
                    <div className="sidebar-overlay"></div>
                    <a className="sidebar-close" href={url}><i className="close-icon"></i>{url}</a>
                    <Link to="!#" className="sidebar-toggle"><i className="fas fa-chevron-right"></i>{url}</Link>
                    <div className="sidebar-content">
                        <div className="pin-wrapper" style={{height: "1176.82px"}}><div className="sticky-sidebar sticky-sidebar-fixed" style={{borderBottom: "0px none rgb(102, 102, 102)", width: "280px", position: "absolute"}}>
                            <div className="widget widget-collapsible widget-categories">
                                <h3 className="widget-title"><span>All Categories</span><span className="toggle-btn"></span></h3>
                                <ul className="widget-body filter-items search-ul" style={{display: "block"}}>
                                    {uniqcat?.map(unicat=>(
                                    <li><Link to={"/products/"+unicat}>{unicat}</Link></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="widget widget-collapsible widget-contact">
                                <h3 className="widget-title"><span>Contact Vendor</span><span className="toggle-btn"></span></h3>
                                <div className="widget-body" style={{display: "block"}}>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Your Name"/>
                                    <input type="text" className="form-control" name="email" id="email_1" placeholder="you@example.com"/>
                                    <textarea name="message" maxLength="1000" cols="25" rows="6" placeholder="Type your messsage..." className="form-control" required="required"></textarea>
                                    <a href={"mailto:"+vendor.email?.toString()} className="btn btn-dark btn-rounded">Send Message</a>
                                </div>
                            </div>
                        </div></div>
                    </div>
                </aside>

                <div className="main-content">
                    <div className="store store-banner mb-4" style={{position:"relative"}}>
                        <figure className="store-media">
                            <img src={vendor.Banimage||"/assets/images/vendor/dokan/1.jpg"} alt="Vendor" width="930" height="446" style={{backgroundColor: "#414960"}}/>
                        </figure>
                        <div className="store-content"  style={{...style,height:"100%",background:"#333"}}>
                            <figure className="seller-brand">
                                <img src={vendor.logoimage||"/assets/images/vendor/brand/1.jpg"} alt="Brand" width="80" height="80"/>
                            </figure>
                            <h4 className="store-title">{vendor.username||"Not Available"}</h4>
                            <ul className="seller-info-list list-style-none mb-6">
                                <li className="store-address">
                                    <i className="w-icon-map-marker"></i>
                                    {vendor.address||"Not Avialble"}
                                </li>
                                <li className="store-phone">
                                    <a href={"tel:"+(vendor.phone||"1234567890")}>
                                        <i className="w-icon-phone"></i>
                                        {vendor.phone||"Not Found"}
                                    </a>
                                </li>
                                <li className="store-rating">
                                    <i className="w-icon-star-full"></i>
                                    4.33 rating from 3 reviews
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="title vendor-product-title mb-4"><Link>Products</Link></h2>

                    <div className="product-wrapper row cols-md-3 cols-sm-2 cols-2">
                        {products?.map(product=>(
                        <div className="product-wrap">
                            <div className="product text-center">
                                <figure className="product-media">
                                    <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())}>
                                        <img src={product.image?.toString()} alt="Product" width="300" height="338"/>
                                    </Link>
                                    <div className="product-action-vertical">
                                        <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())} className="btn-product-icon btn-cart w-icon-cart" title="Add to cart">{url}</Link>
                                        <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())} className="btn-product-icon btn-quickview w-icon-search" title="Quick View">{url}</Link>
                                    </div>
                                </figure>
                                <div className="product-details">
                                    <h3 className="product-name">
                                        <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())}>{product.title?.toString()}</Link>
                                    </h3>
                                    <div className="ratings-container">
                                        <div className="ratings-full">
                                            <span className="ratings" style={{width: "100%"}}></span>
                                            <span className="tooltiptext tooltip-top"></span>
                                        </div>
                                        <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())} className="rating-reviews">(3 reviews)</Link>
                                    </div>
                                    <div className="product-pa-wrapper">
                                        <div className="product-price">
                                           {"RS "+product.lowPrice?.toString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Store