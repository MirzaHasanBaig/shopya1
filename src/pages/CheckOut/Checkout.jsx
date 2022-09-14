import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/CartRedux';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "./../../Firebase";
import {removeProduct} from './../../redux/CartRedux'

import {userRequest} from './../../RequestMethods'
function Checkout() {
    const history = useHistory();
    const [totalordervalue, settotalordervalue] = useState(0);
    const {products,quantity,total} = useSelector((state)=>state.cart);
    const {currentUser} = useSelector((state)=>state.user);
    const [data, setdata] = useState({Shipping:"TCS",Payment:null,products});
    const key="pk_test_51LSPYLCuxJcgXEvZ99DfZP9CGUQME6kltGaWMpbHskBiQSuwVbzBdPbKLLe2BhxW6rESs0WXqacb7INol3QjRUcA00vUyiihQh";
    const [file, setfile] = useState(null);

    const hanlderemove = async(e)=>{
        const number = e.currentTarget.dataset.number;
        dispatch(removeProduct({number}));
    }

    const [click, setclick] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        settotalordervalue(data.Shipping==="DHL"?total+(500*quantity):data.Shipping==="TCS"?total+(350*quantity):total+(700*quantity))    
    },[data, quantity, total])

    const onToken = async(token) => {
            const resp = await userRequest.post("/stripe/payment",{tokenId: token.id,amount:totalordervalue})
            const Stoken = resp.data;
            const res = await userRequest.post("/order",{...data,Stoken:Stoken.id?.toString(),amount:totalordervalue});
            orderredirect(res.data._id);
    }

    const handleClick = async(e)=>{
        setdata((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }

    const handleOrderBank = async(e)=>{
        e.preventDefault();
        setclick(true);
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              console.log("Upload failed");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const getdata = async()=>{
                        const res = await userRequest.post("/order",{...data,Timage:downloadURL,amount:totalordervalue});
                        orderredirect(res.data._id);
                    }
                    getdata();
    });})}


    const orderredirect =(id)=>{
        if(id){
            dispatch(resetCart({}));
            history.push({
                pathname: '/orderinfo',
                search: `?id=${id}&status=success`,  
                state: {  
                    update: true, 
                },
                });
        }
        else{
            history.push({
                pathname: '/orderinfo',
                search: '?status=fail',  // query string
                state: {  // location state
                    update: true, 
                },
                });
        }
    }

const disabled = {background:"grey",cursor: "not-allowed"}

    const handleOrder = async(e)=>{
        e.preventDefault();
        const res = await userRequest.post("/order",{...data,amount:totalordervalue});
        orderredirect(res.data._id);
    }
  return (
    <div className="page-content mt-10">{!currentUser?
        <div className='mt-10 mb-10' style={{textAlign:"center"}}>
            <h2>Please login to Perform Checkout</h2>
            <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
    :
        <div className="container">
            <form className="form checkout-form" action="#" method="post">
                <div className="row mb-9">
                    <div className="col-lg-7 pr-lg-4 mb-4">
                        <h3 className="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">
                            Billing and Shipping Details
                        </h3>
                        <div className="row gutter-sm">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>First name *</label>
                                    <input type="text" className="form-control form-control-md" name="firstname" required="" onChange={handleClick}/>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Last name *</label>
                                    <input type="text" className="form-control form-control-md" name="lastname" required="" onChange={handleClick}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Country / Region *</label>
                            <div className="select-box" style={{display:"block"}}>
                                <select name="country" className="form-control form-control-md" style={{minWidth:"100%"}} onChange={handleClick}>
                                    <option value="pk" defaultValue="selected">Pakistan(PK)</option>
                                    <option value="us">United States(US)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Street address *</label>
                            <input type="text" placeholder="House number and street name" className="form-control form-control-md mb-2" name="streetaddress1" required="" onChange={handleClick}/>
                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="form-control form-control-md" name="streetaddress2" required="" onChange={handleClick}/>
                        </div>
                        <div className="row gutter-sm">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Town / City *</label>
                                    <input type="text" className="form-control form-control-md" name="town" required="" onChange={handleClick}/>
                                </div>
                                <div className="form-group">
                                    <label>ZIP *</label>
                                    <input type="text" className="form-control form-control-md" name="zip" required="" onChange={handleClick}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>State *</label>
                                    <div className="select-box" style={{display:"block"}}>
                                        <select name="state" className="form-control form-control-md" style={{minWidth:"100%"}} onChange={handleClick}>
                                            <option value="sindh" defaultValue="selected">Sindh</option>
                                            <option value="punjab">Punjab</option>
                                            <option value="balochistan">Balochistan</option>
                                            <option value="kashmir">Kashmir</option>
                                            <option value="kpk">KPK</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input type="text" className="form-control form-control-md" name="phone" required="" onChange={handleClick}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-7">
                            <label>Email address *</label>
                            <input type="email" className="form-control form-control-md" name="email" required="" onChange={handleClick}/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="order-notes">Order notes (optional)</label>
                            <textarea className="form-control mb-0" id="order-notes" name="ordernotes" cols="30" rows="4" placeholder="Notes about your order, e.g special notes for delivery" onChange={handleClick}></textarea>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-4 sticky-sidebar-wrapper">
                        <div className="pin-wrapper" style={{height: "899.025px"}}><div className="order-summary-wrapper sticky-sidebar" style={{borderBottom: "1px solid rgb(238, 238, 238)", width: "505px"}}>
                            <h3 className="title text-uppercase ls-10">Your Order</h3>
                            <div className="order-summary">
                                <table className="order-table">
                                    <thead style={{textAlign:"left"}}>
                                        <tr>
                                            <th colSpan="2">
                                                <h4>Product</h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product,n)=>(
                                        <tr className="bb-no" key={product._id?.toString()}>
                                            <td className="product-name">{product.title?.toString()+"-"+product.color?.toString()+"-"+product.size?.toString()} <i className="fas fa-times"></i> <span className="product-quantity">{product.quantity?.toString()}</span></td>
                                            <td className="product-total">{"RS "+(product.lowPrice*product.quantity)?.toString()}</td>
                                            <td data-number={n} onClick={hanlderemove}><i className="fas fa-times"></i>Remove</td>
                                        </tr>
                                        ))}
                                        <tr className="cart-subtotal bb-no">
                                            <td>
                                                <b>Subtotal</b>
                                            </td>
                                            <td>
                                                <b>{"RS "+total?.toString()}</b>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr className="shipping-methods">
                                            <td colSpan="2" className="text-left">
                                                <h4 className="title title-simple bb-no mb-3 pb-0 pt-3">Shipping
                                                </h4>
                                                <ul id="shipping-method" className="mb-4">
                                                    <li>
                                                        <div className="custom-radio">
                                                            <input type="radio" id="free-shipping" className="custom-control-input" name="Shipping" value="TCS" onClick={handleClick}/>
                                                            <label htmlFor="free-shipping" className="custom-control-label color-dark" >TCS General</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-radio">
                                                            <input type="radio" id="local-pickup" className="custom-control-input" name="Shipping" value="DHL" onClick={handleClick}/>
                                                            <label htmlFor="local-pickup" className="custom-control-label color-dark">DHL Fast</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-radio">
                                                            <input type="radio" id="flat-rate" className="custom-control-input" name="Shipping" value="Courier" onClick={handleClick}/>
                                                            <label htmlFor="flat-rate" className="custom-control-label color-dark">Courier Fast</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="order-total" style={{textAlign:"left"}}>
                                            <th>
                                                <h4>Total</h4>
                                            </th>
                                            <td>
                                                <h4>{"RS "+totalordervalue?.toString()}</h4>
                                            </td>
                                        </tr>
                                        <tr className="payment-methods">
                                            <td colSpan="2" className="text-left">
                                            <h4 className="title title-simple bb-no mb-3 pb-0 pt-3">Payment Type
                                            </h4>
                                            <ul id="payment-method" className="mb-4" style={{listStyle:"none",padding:"0px"}}>
                                            <li>
                                            <div className="custom-radio">
                                            <input type="radio" id="COD" className="custom-control-input" name="Payment" value="COD" onClick={handleClick}/>
                                            <label htmlFor="COD" className="custom-control-label color-dark">Cash On Delivery</label>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="custom-radio">
                                            <input type="radio" id="Bank" className="custom-control-input" name="Payment" value="Bank" onClick={handleClick}/>
                                            <label htmlFor="Bank" className="custom-control-label color-dark">Bank Transfer</label>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="custom-radio">
                                            <input type="radio" id="Card" className="custom-control-input" name="Payment" value="Card" onClick={handleClick}/>
                                            <label htmlFor="Card" className="custom-control-label color-dark">Card Payment</label>
                                            </div>
                                            </li>
                                            </ul>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="form-group place-order pt-6">
                                    {data.Payment==="COD"?<button className="btn btn-dark btn-block btn-rounded" onClick={handleOrder} style={click?disabled:{background:"black"}}>Place Order</button>:
                                    data.Payment==="Bank"?
                                            <div className='mt-2 mb-2'>
                                            <div className="form-group">
                                                <label>Transaction ID *</label>
                                                <input type="text" className="form-control form-control-md" name="TID" required="" onChange={handleClick}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Transaction Prove *</label>
                                                <input type="file" className="form-control form-control-md" name="Timage" required="" onChange={(e) => setfile(e.target.files[0])}/>
                                            </div>
                                            <button className="btn btn-dark btn-block btn-rounded" style={click?disabled:{background:"black"}} onClick={handleOrderBank}>Place Order</button>
                                        </div>
                                    :
                                    data.Payment==="Card"?
                                    <StripeCheckout stripeKey={key} token={onToken} amount={totalordervalue} currency="USD" locale='auto'>
                                    <span className="btn btn-dark btn-block btn-rounded">Place Order</span>
                                    </StripeCheckout>:<></>}
                                </div>
                            </div>
                        </div></div>
                    </div>
                </div>
            </form>
        </div>}
    </div>
  )
}

export default Checkout