import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { userRequest } from '../../../RequestMethods';
import _ from 'lodash'

function BuyLicense() {
    const [blogs, setblogs] = useState([]);
    const [inputs, setinputs] = useState({});
    const [license, setlicense] = useState({});
    const [detail, setdetail] = useState(false);
    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
    }  

    const handlechange = async(e)=>{
        setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})
        console.log(inputs);
    }

    const deletelicense = async(id)=>{
        try{
            const ans = window.confirm("Permanently Deleting license of id "+id);
            if(ans){
                await userRequest.delete(`functionality/license/${id}`);
                alert("successful to delete");
                window.location.reload(false);
            }else{alert("failed to delete")}
            }catch{
            alert("failed to delete");
        }
    }
    useEffect(() => {
        const getdata = async()=>{
            const res = await userRequest.get("functionality/license");
            setblogs(res.data);
            console.log(res.data);
        }
        getdata();
    }, []);
    
    const postdata = async(id)=>{
            const ans = window.confirm("Permanently Updating license of id "+id);
            if(ans){
                alert("Successful to Update");
                await userRequest.put(("functionality/license/"+id),inputs);
                window.location.reload(false);
            }else{alert("Failed to Update 1")}
    }
  return (
    <div>
        {!detail?
    <div>
        <div className="icon-box icon-box-side icon-box-light">
        <span className="icon-box-icon icon-orders">
            <i className="w-icon-orders"></i>
        </span>
        <div className="icon-box-content mt-2 mb-2">
            <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>All Licenses</h4>
        </div>
        </div>
        <table className="shop-table account-orders-table mb-6">
            <thead>
                <tr>
                    <th className="order-date">License Status</th>
                    <th className="order-date">Username</th>
                    <th className="order-total">Date</th>
                    <th className="order-date">Payment ID</th>
                    <th className="order-total">License Type</th>
                    <th className="order-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {blogs?.map((product,i)=>(        
                <tr key={i} style={(i%2===0)?{background:"#eee"}:{background:"#fff"}}>
                <td className="order-total" style={{textAlign:"center"}}>{(_.upperCase(product.status))||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>{product.username||"Not Found"}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(product.createdAt))||"Not Found"}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{product.token||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                        <span className="order-price" style={{textAlign:"center"}}>{((product.type)||"Not Found")}</span>
                    </td>
                    <td className="order-action" style={{display:"flex",alignContent:"center"}}>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setlicense(blogs[i]);setdetail(true);setinputs(blogs[i])}}>
                            <img src="/assets/images/pencil-svgrepo-com.svg" alt="update" style={{width:"20px"}}/>
                        </span>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded">
                            <img src="/assets/images/trash-svgrepo-com.svg" alt="delete" style={{width:"20px"}} onClick={()=>{deletelicense(product._id)}}/>
                        </span>
                    </td>
                </tr>
                    ))}
            </tbody>
        </table>
        <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go Home<i className="w-icon-long-arrow-right"></i></Link>
    </div>:
    <div>
        <div className="icon-box icon-box-side icon-box-light">
                <span className="icon-box-icon icon-account mr-2">
                    <i className="w-icon-license"></i>
                </span>
                <div className="icon-box-content mb-2 mt-2">
                    <h4 className="icon-box-title mb-0 ls-normal" style={{fontSize:"21px"}}>license Update</h4>
                </div>
            </div>
            <h4 className="title title-password ls-25 font-weight-bold">Update Form for {license?.username||"Not Found"}</h4>
            <form className="form account-details-form" action="#" method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Duration in Months</label>
                            <input placeholder={license.duration||"Disabled"} type="number"  onChange={handlechange} name="duration" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">License Status</label>
                            <select defaultValue={license.status||"Not Found"} onChange={handlechange} name="status" className="form-control form-control-md">
                                <option>enabled</option>
                                <option>disabled</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">License Type</label>
                            <select defaultValue={license.type||"Not Found"} onChange={handlechange} name="type" className="form-control form-control-md">
                                <option>silver</option>
                                <option>gold</option>
                                <option>diamond</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstname">Payment Token</label>
                            <input placeholder={license.token||"Not Found"}  onChange={handlechange} type="text" name="token" className="form-control form-control-md" />
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-md-4">
                    <span className="btn btn-dark btn-rounded btn-sm mb-4" style={_.isEmpty(inputs)?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={()=>{postdata(license._id)}}>Save Changes</span>
                </div>    
                </div>
                </form>
                <div>
                <span className="btn btn-dark" onClick={()=>{setdetail(false)}}>Go to List</span>
                </div>
    </div>
    }
    </div>
  )
}

export default BuyLicense