import React,{useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector,useDispatch } from "react-redux";
import { publicRequest } from '../../RequestMethods';
import {removeProduct} from './../../redux/CartRedux'

import _ from 'lodash'
function Topheader() {
    const dispatch= useDispatch();
    const history = useHistory();
    const {currentUser } = useSelector((state) => state.user);
    const [search, setsearch] = useState("");
    const [cat, setcat] = useState([]);
    const {products,quantity,total} = useSelector((state) => state.cart);

  const hanlderemove = async(e)=>{
    const number = e.currentTarget.dataset.number;
    dispatch(removeProduct({number}));
}

  const handleCat = (e)=>{
    history.push(process.env.PUBLIC_URL+"/products/"+e.target.value);
  } 

  const enterpress = (e)=> {
    if(e.which === 13) {
        history.push(process.env.PUBLIC_URL+"/products/"+search);
    }}
    useEffect(()=>{
        const getdata = async()=>{
            const res =  await publicRequest.get("/categories");
            setcat(res.data);
        }
        getdata();
    },[])
  return (
    <div className="header-middle" style={{padding:"15px 0px"}} onKeyPress={enterpress}>
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="/#" className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle">
                        </a>
                        <Link to="/" className="logo ml-lg-0">
                            <img src="/assets/images/logo-shopya.png" alt="logo" width="144" height="45" />
                        </Link>
                        <form method="get" action="#"className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper">
                            <div className="select-box">
                                <select id="category" name="category" onChange={handleCat}>
                                    {cat?.map((cate,n)=>(
                                        <option key={n}value={cate.name}>{cate.name}</option>
                                    ))}
                                </select>
                            </div>
                            <input type="text" className="form-control" name="search" placeholder="Search in..." required onChange={(e)=>{setsearch(e.target.value)}}/>
                            <Link className="btn btn-search" to={process.env.PUBLIC_URL+"/products/"+_.kebabCase(search)}><i className="w-icon-search"></i>
                            </Link>
                        </form>
                    </div>
                    <div className="header-right ml-4">
                        <div className="header-call d-xs-show d-lg-flex align-items-center pr-2">
                            <a href="tel:#" className="w-icon-call">&nbsp;</a>
                            <div className="call-info d-lg-show">
                                <h4 className="chat font-weight-normal font-size-md text-normal ls-normal text-light mb-0">
                                    <a href="mailto:example@mail.com" className="text-capitalize">Live Chat</a> or :</h4>
                                <a href="tel:0800123456" className="phone-number font-weight-bolder ls-50">0(800)123-456</a>
                            </div>
                        </div>
                        <div className="dropdown cart-dropdown c cart-offcanvas mr-0 mr-lg-2">
                            <div className="cart-overlay"></div>
                            <a href="/#" className="cart-toggle label-down link">
                                <i className="w-icon-cart">
                                    <span className="cart-count">{quantity||0}</span>
                                </i>
                                <span className="cart-label">Cart</span>
                            </a>
                            <div className="dropdown-box">
                                <div className="cart-header">
                                    <span>Shopping Cart</span>
                                    <a href="/#" className="btn-close">Close<i className="w-icon-long-arrow-right"></i></a>
                                </div>

                                <div className="products">
                                     {products?.map((product,n)=>(
                                    <div className="product product-cart" key={n}>
                                        <div className="product-detail">
                                            <a href={process.env.PUBLIC_URL+_.kebabCase(product.title?.toString())} className="product-name">{product.title?.toString()}</a>
                                            <div className="price-box">
                                                <span className="product-quantity">{product.quantity?.toString()}</span>
                                                <span className="product-price">{product.lowPrice?.toString()}</span>
                                            </div>
                                        </div>
                                        <figure className="product-media">
                                            <a href={process.env.PUBLIC_URL+_.kebabCase(product.title?.toString())}>
                                                <img src={product.image?.toString()} alt="product" height="84"
                                                    width="94" />
                                            </a>
                                        </figure>
                                        <button className="btn btn-link btn-close" aria-label="button" data-number={n} onClick={hanlderemove}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>    
                                    ))}
                                </div>

                                <div className="cart-total">
                                    <label>Subtotal:</label>
                                    <span className="price">{"RS "+total}</span>
                                </div>

                                <div className="cart-action cart-header">
                                    <Link to="/cart" className="btn-close btn btn-dark btn-outline btn-rounded">View Cart</Link>
                                    <Link to="/checkout" className="btn-close btn btn-primary  btn-rounded" style={{color:"white"}}>Checkout</Link>
                                </div>
                            </div>
                        </div>
                        {currentUser&&
                        <div className="art-offcanvas mr-0 ml-4">
                            <Link to="/account" className="label-down">
                                <img src={currentUser.logoimage||"/assets/images/agents/2-100x100.png"} style={{height:"40px",borderRadius:"50%",width:"40px"}} alt="value"/>
                                <span className="cart-label">{currentUser.username}</span>
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            </div>
            
  )
}

export default Topheader