import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux' 
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {removeProduct, resetCart} from './../../redux/CartRedux'

function Cart() {
    const dispatch = useDispatch();
    const {products,total} = useSelector((state) => state.cart);
    const [render, setrender] = useState(products)

  const hanlderemove = async(e)=>{
    const number = e.currentTarget.dataset.number;
    dispatch(removeProduct({number}));
}

useEffect(()=>{
    setrender(products)
},[products])


  return (
    <div className="page-content" style={{marginTop: "50px"}}>
                <div className="container">
                    <div className="row gutter-lg mb-10">
                        <div className="col-lg-8 pr-lg-4 mb-6">
                            <table className="shop-table cart-table">
                                <thead>
                                    <tr>
                                        <th className="product-name" style={{fontWeight:"600",fontSize:"14px"}}><span>Product</span></th>
                                        <th></th>
                                        <th className="product-price"><span>Price</span></th>
                                        <th className="product-quantity"><span>Quantity</span></th>
                                        <th className="product-subtotal"><span>Subtotal</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {render?.map((product,n)=>(
                                    <tr key={n}>
                                        <td className="product-thumbnail" style={{display:"flex",justifyContent:"center"}}>
                                            <div className="p-relative" style={{display:"inline-flex"}}>
                                                <Link to={process.env.PUBLIC_URL+"/"+product.creatorid?.toString()+"/</td>"+_.kebabCase(product.title?.toString())}>
                                                    <figure>
                                                        <img src={product.image?.toString()} alt="product" style={{width:"100px",height:"auto"}}/>
                                                    </figure>
                                                </Link>
                                                <button className="btn btn-close" style={{position:"absolute",right:0,top:0,padding:"5px",borderRadius:"50%"}} data-number={n} onClick={hanlderemove} >
                                                    <i className="fas fa-times"></i></button>
                                            </div>
                                        </td>
                                        <td className="product-name">
                                            <Link to={process.env.PUBLIC_URL+"/"+product.creatorid?.toString()+"/</td>"+_.kebabCase(product.title?.toString())}>
                                                {product.title?.toString()+" - "+product.color?.toString()+" - "+product.size?.toString()}
                                            </Link>
                                        </td>
                                        <td className="product-price"><span className="amount">{"RS "+product.lowPrice?.toString()}</span></td>
                                        <td className="" style={{padding:"0px 20px",display:"flex",justifyContent:"center"}}>
                                                <p className="quantity" type="number" min="1" max="100000">{product.quantity?.toString()+(product.quantity>1?" items":" item")}</p>
                                        </td>
                                        <td className="product-subtotal">
                                            <span className="amount">{"RS "+(product.lowPrice*product.quantity)?.toString()}</span>
                                        </td>
                                </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="cart-action mb-6 mt-6" style={{display:"flex",alignItems:"center"}}>
                                <Link to="/" className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto"><i className="w-icon-long-arrow-left"></i>Continue</Link>
                                <button onClick={()=>{dispatch(resetCart({}))}} className="btn btn-dark btn-rounded btn-icon-left btn-shopping"><i className="w-icon-bin"></i>Reset</button>
                    
                            </div>

                            <form className="coupon">
                                <h5 className="title coupon-title font-weight-bold text-uppercase">Coupon Discount</h5>
                                <input type="text" className="form-control mb-4" placeholder="Enter coupon code here..." required=""/>
                                <button className="btn btn-dark btn-outline btn-rounded">Apply Coupon</button>
                            </form>
                        </div>
                        <div className="col-lg-4 sticky-sidebar-wrapper">
                            <div className="pin-wrapper" style={{height: "791.375px"}}><div className="sticky-sidebar" style={{borderBottom: "0px none rgb(102, 102, 102)", width: "393.325px"}}>
                                <div className="cart-summary mb-4">
                                    <h3 className="cart-title text-uppercase">Cart Totals</h3>
                                    <div className="cart-subtotal d-flex align-items-center justify-content-between">
                                        <label className="ls-25">Total</label>
                                        <span>{"RS "+total}</span>
                                    </div>
                                    <hr className="divider"/>
                                    <Link to="/checkout" className="btn btn-block btn-dark btn-icon-right btn-rounded mt-2 mb-2 btn-checkout">
                                        Proceed to checkout<i className="w-icon-long-arrow-right"></i></Link>
                                </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Cart