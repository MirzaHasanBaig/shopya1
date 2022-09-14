import React,{useState,useEffect} from 'react';
import _ from 'lodash'
import { useLocation,useHistory } from "react-router-dom";
import { publicRequest } from '../../RequestMethods';
import { addProduct } from "../../redux/CartRedux"
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

function Product(props) {

    const [ban,setban] = useState([]);
  useEffect(()=>{
    const getdata=async()=>{
      const res = await publicRequest.get("/functionality/images");
      setban(res.data);
    }
    getdata();
  },[])
  const [allprod,setallprod] = useState([]);
  useEffect(()=>{
    const getdata=async()=>{
      const res = await publicRequest.get("/product/1");
      setallprod(res.data);
    }
    getdata();
  },[])

    const [data,setdata] = useState({quantity:1});
    const [review, setreview] = useState({});
    const [product, setProduct] = useState({});
    const location = useLocation();

    const dispatch = useDispatch();

    const handleClick = async(e)=>{
        setdata((prev) => {
        return { ...prev, [e.target.name]: e.target.attributes.value.value };
      })
      console.log(data);
    }

    const handleQuantity = (e)=>{
        e.preventDefault();
        if(e.target.value === "increase"){
            setdata((prev) => {
                return { ...prev, quantity: data.quantity+1};
              })
        }else if(e.target.value === "decrease"&&data.quantity>1){
            setdata((prev) => {
                return { ...prev, quantity: data.quantity-1};
              })
        }
    }


    let history = useHistory();
    let url ="";
    let urlContent ="";
    const idinKCase = location.pathname.split("/")[2];
    const nameinKCase = location.pathname.split("/")[3];
    const name = _.lowerCase(nameinKCase);

    useEffect(()=>{
    try{
    const getdata = async()=>{
    const res = await publicRequest.get("/product/"+idinKCase+"/"+name);
    const res2 = await publicRequest.get("/order/review/"+res.data._id);
    !res.data&&history.push("/not-found");
    setProduct(res.data);
    setreview(res2.data);
    }
    getdata();
    }
    catch(err){
        history.push("/not-found");
    }
    },[history, idinKCase, name])


    const addCart = async(e)=>{
        e.preventDefault();
        const {base,avialablity,colors,sizes,_id,...other} = product
        const values= {...other,...data,productid:_id};
        dispatch(addProduct(values));
        history.push("/cart");
    }

  return (
    <div className="page-content mt-10 mb-10">
        <div className="container">
            <div className="row gutter-lg">
                <div className="main-content">
                    <div className="product product-single row">
                        <div className="col-md-6 mb-6">
                            <div className="product-gallery product-gallery-sticky">
                                <img alt={product.title} src={product.image?.toString()} style={{height:"100%",width:"100%"}}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-6">
                            <div className="product-details" data-sticky-options="{'minWidth': 767}">
                                <h1 className="product-title">{product.title?.toString()}</h1>
                                <div className="product-bm-wrapper">
                                    <div className="product-meta">
                                        <div className="product-categories">
                                            Category:
                                            <span className="product-category"><Link to={process.env.PUBLIC_URL+"/products/"+product.category?.toString()}>{product.category?.toString()}</Link></span>
                                        </div>
                                        <div className="product-sku">
                                            SKU: <span>{"MS"+product._id?.toString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="product-divider"/>

                                <div className="product-price"><ins className="new-price">{"RS "+product.lowPrice?.toString()}</ins><ins className="new-price" style={{color:"grey",fontSize:"16px",textDecoration:"line-through"}}>{"RS "+product.prices?.toString()}</ins></div>

                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{width: `${review?.AVgStar*20||0}%`}}></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                    <a href="#product-tab-reviews" className="rating-reviews scroll-to">({review?.Allreview?.length||0+" "}
                                        Reviews)</a>
                                    <Link to={"/store/"+product.creatorid?.toString()} className="btn" style={{marginLeft:"10px"}}>Visit Vendor Store</Link>
                                </div>
                                <div className="product-short-desc">
                                    {product.descrip?.slice(0,1000)}
                                </div>

                                <hr className="product-divider"/>

                                <div className="product-form product-variation-form product-color-swatch">
                                    <label>Color:</label>
                                    <div className="d-flex align-items-center product-variations">
                                    {product.colors?.map(color=>(
                                        <a key={color} name="color" onClick={handleClick} href={url} className="color" style={{backgroundColor: color,border:"1px solid"}} value={color}>&nbsp;</a>
                                    ))}
                                    </div>
                                </div>
                                <div className="product-form product-variation-form product-size-swatch">
                                    <label className="mb-1">Size:</label>
                                    <div className="flex-wrap d-flex align-items-center product-variations">
                                        {product.sizes?.map(size=>(
                                        <a key={size} name="size" onClick={handleClick} href={url} className="size" value={size}>{size}</a>
                                        ))}
                                    </div>
                                </div>

                                <div className="sticky-content-wrapper">
                                    <div className="product-form container">
                                            <div className="product-qty-form">
                                            <div className="input-group">
                                                <p className="quantity form-control" style={{display:"flex",alignItems:"center"}}>{data.quantity}</p>
                                                <button className="quantity-plus w-icon-plus" value="increase" onClick={handleQuantity}></button>
                                                <button className="quantity-minus w-icon-minus" value="decrease" onClick={handleQuantity}></button>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary disabled" onClick={addCart}>
                                            <i className="w-icon-cart"></i>
                                            <span >Add to Cart</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="social-links-wrapper">
                                    <span className="divider d-xs-show"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab tab-nav-boxed tab-nav-underline product-tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a href="#product-tab-description" className="nav-link">Description</a>
                            </li>
                            <li className="nav-item">
                                <a href="#product-tab-reviews" className="nav-link">Customer Reviews ({review?.Allreview?.length||0})</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane  active in" id="product-tab-description">
                                <div className="row mb-4">
                                    <div className="col-md-9 mb-5">
                                        <h4 className="title tab-pane-title font-weight-bold mb-2">Detail</h4>
                                        <p className="mb-4">{product.descrip?.toString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="product-tab-reviews">
                                <div className="row mb-4">
                                    <div className="col-xl-4 col-lg-5 mb-4">
                                        <div className="ratings-wrapper">
                                            <div className="avg-rating-container">
                                                <h4 className="avg-mark font-weight-bolder ls-50">{review?.AVgStar||"0"}</h4>
                                                <div className="avg-rating">
                                                    <p className="text-dark mb-1">Average Rating</p>
                                                    <div className="ratings-container">
                                                        <div className="ratings-full">
                                                            <span className="ratings" style={{width: `${review?.AVgStar*20||0}%`}}></span>
                                                            <span className="tooltiptext tooltip-top"></span>
                                                        </div>
                                                        <a href={url} className="rating-reviews">({review?.Allstar?.length||"0"} Reviews)</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ratings-value d-flex align-items-center text-dark ls-25">
                                                <span className="text-dark font-weight-bold">{review?.AVgStar*20||0}%</span>Recommended
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-7 mb-4">
                                        <div className="review-form-wrapper">
                                            {review?.Allstar?.map((star,i)=>
                                            <div className='row' style={i%2===0?{background:"#eee"}:{background:"#fff"}}>
                                                <div className='col-md-12' style={{fontSize:"14px",fontWeignt:"700"}}>Star: {(star||0)+(star>1?" Stars":" Star")}</div>
                                                <div className='col-md-12' style={{fontSize:"16px",fontWeignt:"700"}}>Reveiws: {_.upperCase(review?.Allreview[i])||"Not Found"}</div>
                                            </div>  
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="tab tab-nav-boxed tab-nav-outline tab-nav-center">
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="related-product-section">
                        <div className="title-link-wrapper mb-4">
                            <h4 className="title">Related Products</h4>
                            <a href={url} className="btn btn-dark btn-link btn-slide-right btn-icon-right">More
                                Products<i className="w-icon-long-arrow-right"></i>{urlContent}</a>
                        </div>
                        <div className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                            'spaceBetween': 20,
                            'slidesPerView': 2,
                            'breakpoints': {
                                '576': {
                                    'slidesPerView': 3
                                },
                                '768': {
                                    'slidesPerView': 4
                                },
                                '992': {
                                    'slidesPerView': 3
                                }
                            }
                        }">
                            <div className="swiper-wrapper " id="swiper-wrapper-fa855c65961181c0" aria-live="polite" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                                {allprod?.slice(0,4).map((product,n)=>(
                                <div key={n} className="swiper-slide product swiper-slide-active" role="group" aria-label={(n+1)+"/ 4"} style={{width: "296.667px", marginRight: "20px"}}>
                                    <figure className="product-media">
                                        <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>
                                            <img src={process.env.PUBLIC_URL+product.image} alt="Product" width="300" height="338"/>
                                        </Link>
                                        <div className="product-action-vertical">
                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}  className="btn-product-icon btn-cart w-icon-cart" title="Add to cart">{urlContent}</Link>
                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}  className="btn-product-icon btn-wishlist w-icon-heart" title="Add to wishlist">{urlContent}</Link>
                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}  className="btn-product-icon btn-compare w-icon-compare" title="Add to Compare">{urlContent}</Link>
                                        </div>
                                        <div className="product-action">
                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)} className="btn-product btn-quickview" title="Quick View">Quick
                                                View</Link>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>{product.title}</Link></h4>
                                        
                                        <div className="product-pa-wrapper">
                                            <div className="product-price">{"RS "+product.lowPrice}</div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                    </section>
                </div>
                <aside className="sidebar product-sidebar sidebar-fixed right-sidebar sticky-sidebar-wrapper">
                    <div className="sidebar-overlay"></div>
                    <a className="sidebar-close" href={url}><i className="close-icon"></i>{urlContent}</a>
                    <a href={url} className="sidebar-toggle d-flex d-lg-none"><i className="fas fa-chevron-left"></i>{urlContent}</a>
                    <div className="sidebar-content scrollable">
                        <div className="pin-wrapper" style={{height: "958.825px"}}><div className="sticky-sidebar sticky-sidebar-fixed" style={{borderBottom: "0px none rgb(102, 102, 102)", width: "280px", position: "absolute"}}>
                            <div className="widget widget-banner mb-9">
                                <Link className="banner banner-fixed br-sm" to={ban[8]?.link}>
                                    <figure>
                                        <img src={ban[8]?.image} alt="Banner" width="266" height="220" style={{backgroundColor: "#1D2D44"}}/>
                                    </figure>
                                    <div className="banner-content">
                                        <div className="banner-price-info font-weight-bolder text-white lh-1 ls-25">
                                        {ban[8]?.tag}<sup className="font-weight-bold">%</sup><sub className="font-weight-bold text-uppercase ls-25">Off</sub>
                                        </div>
                                        <h4 className="banner-subtitle text-white font-weight-bolder text-uppercase mb-0">
                                           {ban[8]?.title}</h4>
                                    </div>
                                </Link>
                            </div>

                            <div className="widget widget-products">
                                <div className="title-link-wrapper mb-2">
                                    <h4 className="title title-link font-weight-bold">More Products</h4>
                                </div>

                                <div className="swiper nav-top">
                                    <div className="swiper-container swiper-theme nav-top swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                                        'slidesPerView': 1,
                                        'spaceBetween': 20,
                                        'navigation': {
                                            'prevEl': '.swiper-button-prev',
                                            'nextEl': '.swiper-button-next'
                                        }
                                    }">
                                        <div className="swiper-wrapper" id="swiper-wrapper-5af9ac6fc9fbfb5e" aria-live="polite" style={{transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms"}}>
                                            <div className="widget-col swiper-slide swiper-slide-active" role="group" aria-label="1 / 2" style={{width: "270px", marginRight: "20px"}}>
                                                {allprod?.slice(4,7).map((product,i)=>(
                                                <div className="product product-widget" key={i}>
                                                    <figure className="product-media">
                                                        <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>
                                                            <img src={process.env.PUBLIC_URL+product.image} alt="Product" width="100" height="113"/>
                                                        </Link>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>{product.title}</Link>
                                                        </h4>
                                                        
                                                        <div className="product-price">{"RS "+product.lowPrice}</div>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                            <div className="widget-col swiper-slide swiper-slide-next" role="group" aria-label="2 / 2" style={{width: "270px", marginRight: "20px"}}>
                                            {allprod?.slice(7,10).map((product,i)=>(
                                                <div className="product product-widget" key={i}>
                                                    <figure className="product-media">
                                                        <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>
                                                            <img src={process.env.PUBLIC_URL+product.image} alt="Product" width="100" height="113"/>
                                                        </Link>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)}>{product.title}</Link>
                                                        </h4>
                                                        <div className="ratings-container">
                                                        </div>
                                                        <div className="product-price">{"RS "+product.lowPrice}</div>
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="swiper-button-next" tabIndex="0" aria-label="Next slide" aria-controls="swiper-wrapper-5af9ac6fc9fbfb5e" aria-disabled="false"></button>
                                        <button className="swiper-button-prev swiper-button-disabled" disabled="" tabIndex="-1" aria-label="Previous slide" aria-controls="swiper-wrapper-5af9ac6fc9fbfb5e" aria-disabled="true"></button>
                                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                </div>
                            </div>
                        </div></div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
  )
}

export default Product