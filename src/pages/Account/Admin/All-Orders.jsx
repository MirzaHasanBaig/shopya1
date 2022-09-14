import React,{useState,useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {userRequest} from './../../../RequestMethods'

function AllOrders() {
    const location = useLocation();
    const [detail,setdetail] = useState("false");
    const [page, setpage] = useState([location.pathname.split("/")[0],"account","1"]);
    const [product,setproduct] = useState({});
    const [review,setreview] = useState({});
    const [PL, setPL] = useState(0);
    const [data, sedata] = useState([]);
    const [inputs,setinputs] = useState({});
    useEffect(()=>{
        const getdata = async()=>{
            const res = await userRequest.get(`/order/all/${page[2]}`);
            sedata(res.data);
            console.log(res);
        }
        getdata();
    },[location.pathname, page])
    useEffect(()=>{setPL(product.PL)},[product])

    useEffect(()=>{
        if(location.pathname.split("/")[2]){
        setpage(location.pathname.split("/"));}
        else{setpage([location.pathname.split("/")[0],"account","1"])};
    },[location.pathname])

    const PostPL = async()=>{
        try{
        await userRequest.put(`/product/update/`+product.product.productid,{PL:PL});
        alert("Successfully Update");}catch{
        alert("Failed to Update")
        }
    }
    const url = "";

    const handleClick = async(n,i)=>{
        const id  = data[n].products[i].productid;
        const myproduct = await userRequest.get("/product/getbyid/"+id);
        const {products,...otherdata} = data[n];
        const product = products[i]; 
        setproduct({product,...myproduct.data,...otherdata});
        console.log({product,...myproduct.data,...otherdata});
    }

    useEffect(()=>{console.log(product);},[product])

    const handleChange= (e)=>{
        setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})
    }

    const deleteproduct = async(id)=>{
        try{
        var ans = window.confirm("Deleting Product of id "+id);
        if(ans){
        await userRequest.delete("/order/"+id);
        alert("Successfully Deleted");}
        else{alert("Failed to Deleted")}
    }catch(err){
            alert("Failed to Deleted")
       }
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

    const handleUpdate = async(id)=>{
        try{
            await userRequest.patch(("/order/"+id),inputs);
            alert("Sucessfully Update!");
            window.location.reload(false);
        }catch(err){
            alert("Failed to Update!");
        }
    }
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
    {detail==="false"?(<>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>All Orders</h4>
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
                <tr key={products._id+datum._id} style={(n%2===0)?{background:"#eee"}:{background:"#fff"}}>
                    <td className="order-id" style={{textAlign:"center"}}>{"#"+datum._id||"Not Found"}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(datum.createdAt))||"Not Found"}</td>
                    <td className="order-status" style={{textAlign:"center"}}>{products.status||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                        <span className="order-price" style={{textAlign:"center"}}>{"PKR "+(products.lowPrice*products.quantity||"Not Found")}</span> for
                        <span className="order-quantity" style={{textAlign:"center"}}>{(" "+products.quantity||"Not Found")}</span> {(" "+products.quantity>1?" items":" item")}
                    </td>
                    <td className="order-action"  style={{display:"flex"}}>    
                        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" style={{width:"max-content",padding:"5px",marginLeft:"2px"}} onClick={()=>{setdetail("true");handleClick(n,i);}}><img src="/assets/images/eye-svgrepo-com.svg" alt="view" style={{width:"20px"}}/></span>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail("update");handleClick(n,i);}}><img src="/assets/images/pencil-svgrepo-com.svg" alt="update" style={{width:"20px"}}/></span>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{deleteproduct(datum?._id)}}><img src="/assets/images/trash-svgrepo-com.svg" alt="delete" style={{width:"20px"}}/></span>
                    </td>
                </tr>
                    ))
                ))}
            </tbody>
        </table>

        <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go Home<i className="w-icon-long-arrow-right"></i></Link></>
    ):detail==="true"?(<div className="mt-4 mb-4">
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
                </div><div className='col-sm-12'>
                    <label>Priority Level </label>
                    <input type="number" className='mb-3' placeholder={product?.PL} onChange={(e)=>{setPL(e.target.value)}}/>
                    <span className='btn btn-dark' onClick={PostPL}>Update PL</span>
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
        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail("false")}}>Return to List</span>
    </div>):(
        <div>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-account mr-2">
                <i className="w-icon-user"></i>
            </span>
            <div className="icon-box-content mb-2 mt-2">
                <h4 className="icon-box-title mb-0 ls-normal" style={{fontSize:"21px"}}>Order Update</h4>
            </div>
        </div>
        <h4 className="title title-password ls-25 font-weight-bold">Update Form</h4>
        <form className="form account-details-form" action="#" method="post">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Payment Type </label>
                        <input placeholder={product.Payment||"Not Found"} type="text" onChange={handleChange} name="Payment" className="form-control form-control-md" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="lastname">Shipping Method</label>
                        <input onChange={handleChange} placeholder={product.Shipping||"Not Found"} type="text" name="Shipping" className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="lastname">Order Total</label>
                        <input onChange={handleChange} placeholder={product.amount||"Not Found"} type="text" name="Shipping" className="form-control form-control-md"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer Email</label>
                        <input onChange={handleChange} type="text" placeholder={product.email||"Not Found"}  name="email" className="form-control form-control-md" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer First Name</label>
                        <input onChange={handleChange} type="text" placeholder={product.firstname||"Not Found"}  name="firstname" className="form-control form-control-md" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer Last Name</label>
                        <input onChange={handleChange} type="text" placeholder={product.lastname||"Not Found"} name="lastname" className="form-control form-control-md" />
                    </div>
                </div>
            </div><div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer Phone</label>
                        <input onChange={handleChange} type="text" placeholder={product.phone||"Not Found"} name="phone" className="form-control form-control-md" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer ZipCode</label>
                        <input onChange={handleChange} type="text" placeholder={product.zip||"Not Found"} name="zip" className="form-control form-control-md" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="firstname">Buyer Town/City</label>
                        <input onChange={handleChange} type="text" placeholder={product.town||"Not Found"} name="town" className="form-control form-control-md" />
                    </div>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="display-name">Order Shipping Address 1</label>
                <input onChange={handleChange} type="text" placeholder={product.streetaddress1||"Not Found"} name="streetaddress1" className="form-control form-control-md mb-0"/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="display-name">Order Shipping Address 2</label>
                <input onChange={handleChange} type="text" placeholder={product.streetaddress2||"Not Found"} name="streetaddress2" className="form-control form-control-md mb-0"/>
            </div>
            <span className="btn btn-dark btn-rounded btn-sm mb-4" onClick={()=>{handleUpdate(product._id)}}>Save Changes</span>
            </form>
    </div>
    )}
    </div>
    </React.Fragment>
  )
}

export default AllOrders