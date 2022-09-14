import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {userRequest} from './../../../RequestMethods'
import {useSelector} from 'react-redux';

function Sells() {
    
    const {currentUser} = useSelector((state) => state.user);
    const [orderdetail, setorderdetail] = useState(false);
    const [status, setstatus] = useState({});
    const [product, setproduct] = useState({});
    const [data, sedata] = useState([]);
    useEffect(()=>{
        const getdata = async()=>{
            const res = await userRequest.get(`/order/seller/${currentUser._id}`);
            sedata(res.data);
        }
        getdata();
    },[currentUser._id])

    const handleClick = async(n)=>{
        setorderdetail(true);
        const id  = data[n].product.productid;
        const myproduct = await userRequest.get("/product/getbyid/"+id);
        console.log({...myproduct,...data[n]});
        setproduct({...myproduct?.data,...data[n]});
    }

    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
    }

    const handleStatus = async(e)=>{
        try{
        await userRequest.put(("/order/sellerreview/"+product._id+"/"+product.product._id),status);
        console.log(status);
        alert("Status has sucessfully set");
    }
        catch(err){
            alert("Some thing went wrong");
        }
    }
    
  return (
    <div className="mb-4">{
        !orderdetail?
        <React.Fragment>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>Sell Orders</h4>
            </div>
        </div>
        <table className="shop-table account-orders-table mb-6">
            <thead>
                <tr>
                    <th className="order-id">Product ID</th>
                    <th className="order-date">Date</th>
                    <th className="order-status">Status</th>
                    <th className="order-total">Total</th>
                    <th className="order-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.reverse()?.map((datum,n)=>
                <tr key={n}>
                    <td className="order-id" style={{textAlign:"center"}}>{"#"+datum._id}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(datum.createdAt))}</td>
                    <td className="order-status" style={{textAlign:"center"}}>{datum.product.status}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                        <span className="order-price" style={{textAlign:"center"}}>{"PKR "+(datum.product.quantity*datum.product.lowPrice)}</span> for
                        <span className="order-quantity" style={{textAlign:"center"}}>{" "+datum.product.quantity}</span>{datum.product.quantity>1?" items":" item"}
                    </td>
                    <td className="order-action">
                        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{handleClick(n)}}>View</span>
                    </td>
                </tr>      
                )}
            </tbody>
        </table>
        <Link to="shop-banner-sidebar.html" className="btn btn-dark btn-rounded btn-icon-right">Go
        Home<i className="w-icon-long-arrow-right"></i></Link>
        </React.Fragment>:
        <div className="mt-4 mb-4">
        <div className='row mt-4 mb-4'>
            <div className='col-sm-12 col-md-4'>
                <img src={product.image||"Not-Found"} alt={product.title} style={{width:"100%"}}/>
            </div>
            <div className='col-sm-12 col-md-4'>
                <h4>Product Information</h4>
                <div className='col-sm-12'>
                    <label>Product Name: </label>
                    <label>{product.title||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Tag: </label>
                    <label>{product.tags||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Category: </label>
                    <label>{product.category||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Size: </label>
                    <label>{product.product?.size||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Color: </label>
                    <label>{product.product?.color||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Quantity: </label>
                    <label>{product.product?.quantity||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Price Per Item: </label>
                    <label>{product.product?.lowPrice||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Product Total: </label>
                    <label>{(product.product?.quantity*product.product?.lowPrice)||"Not Found"}</label>
                </div>
            </div>
            <div className='col-sm-12 col-md-4'>
                <h4>Shipping Information</h4>
                <div className='col-sm-12'>
                    <label>Payment Type: </label>
                    <label>{product.Payment||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Delivery Charges: </label>
                    <label>{product.Shipping==="TCS"?350:product.Shipping==="DHL"?500:700||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Courier Company: </label>
                    <label>{product.Shipping||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Street Address 1: </label>
                    <label>{product.streetaddress1||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Street Address 2: </label>
                    <label>{product.streetaddress2||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Shipping Town: </label>
                    <label>{product.town||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Shipping Zipcode: </label>
                    <label>{product.zip||"Not Found"}</label>
                </div>
                <div className='col-sm-12'>
                    <label>Buyer Email: </label>
                    <a href={"mailto:"+product.email}>{product.email||"Not Found"}</a>
                </div>
                <div className='col-sm-12'>
                    <label>Buyer Phone: </label>
                    <a href={"tel:"+product.phone}>{product.phone||"Not Found"}</a>
                </div>
                <div className='col-sm-12 mt-2'>
                    <label style={{fontSize:"16px"}}>Set Order Status: </label>
                    <select name='status' style={{padding:"4px",fontSize:"16px"}} onChange={(e)=>{setstatus({status:e.target.value})}}>
                        <option value={"Pending"} default="selected">pending</option>
                        <option value={"Active"}>Active</option>
                        <option value={"Completed"}>Completed</option>
                        <option value={"Canceled"}>Cancel</option>
                    </select>
                </div>
                <span className='btn mt-5' onClick={handleStatus}>Submit Status</span>
            </div>
            <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded mt-5" onClick={()=>{setorderdetail(false)}}>Return to List</span>
        </div>
        </div>
        }
    </div>
  )
}

export default Sells