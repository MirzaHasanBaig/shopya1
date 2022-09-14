import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {userRequest} from './../../../RequestMethods'
import {useSelector} from 'react-redux';
function Orders() {
    const [detail,setdetail] = useState(false);
    const [product,setproduct] = useState({});
    const [review,setreview] = useState({});
    const {currentUser} = useSelector((state) => state.user);
    const [data, sedata] = useState([]);
    useEffect(()=>{
        const getdata = async()=>{
            const res = await userRequest.get(`/order/buyer/${currentUser._id}`);
            sedata(res.data);
        }
        getdata();
    },[currentUser._id])

    const url = "";

    const handleClick = async(n,i)=>{
        const id  = data[n].products[i].productid;
        const myproduct = await userRequest.get("/product/getbyid/"+id);
        const {products,...otherdata} = data[n];
        const product = products[i]; 
        console.log({product,...myproduct.data,...otherdata});
        setproduct({product,...myproduct.data,...otherdata});
    }

    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
    }

    const handlechangereview = (e)=>{
        setreview((prev) => {
        return { ...prev, [e.target.name]: e.target.value};
    })}


    const submitReview = async()=>{
        try{
        await userRequest.put(("/order/buyyerreview/"+product._id+"/"+product.product._id),review);
        alert("Your Review has sucessfully submitted");
    }
        catch(err){
            alert("Your Review can't submitted");
        }
    }
    
  return (
    <React.Fragment>
    <div className="mb-4">
    {!detail?(<>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>Buy Orders</h4>
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
                {data.reverse()?.slice(0,10).map((datum,n)=>(
                    datum.products?.map((products,i)=>(        
                <tr key={datum._id}>
                    <td className="order-id" style={{textAlign:"center"}}>{"#"+datum._id||"Not Found"}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(datum.createdAt))||"Not Found"}</td>
                    <td className="order-status" style={{textAlign:"center"}}>{products.status||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                        <span className="order-price" style={{textAlign:"center"}}>{"PKR "+(products.lowPrice*products.quantity||"Not Found")}</span> for
                        <span className="order-quantity" style={{textAlign:"center"}}>{(" "+products.quantity||"Not Found")}</span> {(" "+products.quantity>1?" items":" item")}
                    </td>
                    <td className="order-action">
                        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail(true);handleClick(n,i);}}>View</span>
                    </td>
                </tr>
                    ))
                ))}
            </tbody>
        </table>

        <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go
            Home<i className="w-icon-long-arrow-right"></i></Link></>
    ):(<div className="mt-4 mb-4">
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
                <div className='col-sm-12'>
                    <label>Order Star Number: </label>
                    <label>{(product.product?.star)||"Not Found"}</label></div>
                <div className='col-sm-12'>
                    <label>Order Review: </label>
                    <label>{(product.product?.review)||"Not Found"}</label>
                </div>
                <div className='col-sm-12 mt-5'>
                    <Link className='btn' to={"/store/"+product.creatorid||"Not-Found"}>Visit Vendor</Link>
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
            </div>
        </div>
        <hr/>
        <div className='row mt-4 mb-4'>
            <div className="review-form-wrapper">
                <h3 className="title tab-pane-title font-weight-bold mb-1">Submit Your Review</h3>
                <form action="#" method="POST" className="review-form">
                    <div className="rating-form">
                        <label htmlFor="rating">Your Rating Of This Product :</label>
                        <span className="rating-stars" name="star" >
                            <a className="star-1" href={url} name="star" onClick={(e)=>{setreview((prev) => {return { ...prev, [e.target.name]: 1}})}}>1</a>
                            <a className="star-2" href={url} name="star" onClick={(e)=>{setreview((prev) => {return { ...prev, [e.target.name]: 2}})}}>2</a>
                            <a className="star-3" href={url} name="star" onClick={(e)=>{setreview((prev) => {return { ...prev, [e.target.name]: 3}})}}>3</a>
                            <a className="star-4" href={url} name="star" onClick={(e)=>{setreview((prev) => {return { ...prev, [e.target.name]: 4}})}}>4</a>
                            <a className="star-5" href={url} name="star" onClick={(e)=>{setreview((prev) => {return { ...prev, [e.target.name]: 5}})}}>5</a>
                        </span>
                    </div>
                    <textarea onChange={handlechangereview} name="review" cols="30" rows="6" placeholder="Write Your Review Here..." className="form-control" id="review"></textarea>
                    <span className="btn btn-dark mt-5" onClick={submitReview}>Submit Review</span>
                </form>
             </div>    
        </div>
        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail(false)}}>Return to List</span>
    </div>)}
    </div>
    </React.Fragment>
  )
}

export default Orders