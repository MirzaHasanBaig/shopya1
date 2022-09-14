import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {userRequest} from '../../../RequestMethods'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

import app from "../../../Firebase";

function AllUser() {
    const [users, setusers] = useState([]);
    const [user, setuser] = useState({});
    const [detail,setdetail] = useState(false);
    const [inputs, setinputs] = useState({});
    const [disabled, setdisabled] = useState({});

    const postdata=async(id)=>{
        try{await userRequest.put(("/users/"+id),inputs);
        alert("Update Successful");}
        catch{alert("Update Failed");}
    }

    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
    }  
    useEffect(()=>{
        const getdata =async()=>{
            const res = await userRequest.get("/users");
            setusers(res.data);
        }
        getdata();
    },[])

    const handlechangeImage = (e)=>{
        setdisabled(true);
        e.preventDefault();
      const fileName = new Date().getTime() + e.target.files[0].name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      try{      
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
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
                    setinputs((prev) => {
                        return { ...prev, [e.target.name]: downloadURL }});
                        setdisabled(false);
        });})}catch(err){alert("Upload Failed");}}

    const handleClick = (id)=>{
        setuser(users[id]);
    }
    const deleteproduct = async(id,en)=>{
        try{
        var ans = window.confirm((en?"Disabling User of id ":"Enabling User of id ")+id);
        if(ans){await userRequest.delete("/users/"+id);
        alert(en?"Sucessful to Disable User":"Sucessful to Enable User");
        window.location.reload(false);
    }else{
            alert(en?"Failed to Disable User":"Failed to Enable User")
        }
    }catch(err){
            alert(en?"Failed to Disable User":"Failed to Enable User")
        }
    }
    const handlechange = (e)=>{setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})}
    return (
        
        <React.Fragment>
            {!detail?
        <div>
            <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>All Users</h4>
            </div>
            </div>
            <table className="shop-table account-orders-table mb-6">
                <thead>
                    <tr>
                        <th className="order-total">User Name</th>
                        <th className="order-date">Registration Date</th>
                        <th className="order-status">Phone</th>
                        <th className="order-total">Email</th>
                        <th className="order-status" style={{padding:"0px 1.5vw"}}>Status</th>
                        <th className="order-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.reverse()?.map((product,i)=>(        
                    <tr key={i} style={(i%2===0)?{background:"#eee"}:{background:"#fff"}}>
                        <td className="order-total" style={{textAlign:"center"}}>{product.username||"Not Found"}</td>
                        <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(product.createdAt))||"Not Found"}</td>
                        <td className="order-status" style={{textAlign:"center"}}>{product.phone||"Not Found"}</td>
                        <td className="order-total" style={{textAlign:"center"}}>
                            <span className="order-price" style={{textAlign:"center"}}>{(product.email||"Not Found")}</span>
                        </td>
                        <td className="order-status" style={{textAlign:"center",padding:"0px 1.5vw"}}>{product.isadmin?"Admin":"Client"}</td>
                        <td className="order-action" style={{display:"flex",alignContent:"center"}}>
                            <Link to={"/store/"+product.username} style={{width:"max-content",padding:"5px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded"><img src="/assets/images/eye-svgrepo-com.svg" alt="view" style={{width:"20px"}}/></Link>
                            <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{handleClick(i);setdetail(true);}}><img src="/assets/images/pencil-svgrepo-com.svg" alt="update" style={{width:"20px"}}/></span>
                            <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{deleteproduct(product?._id,product.enabled)}}>
                                {product.enabled?<img src="/assets/images/trash-svgrepo-com.svg" alt="delete" style={{width:"20px"}}/>:<img src="https://img.icons8.com/ios/50/000000/delete-trash.png" alt="remove delete" style={{width:"20px"}}/> }
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
                    <i className="w-icon-user"></i>
                </span>
                <div className="icon-box-content mb-2 mt-2">
                    <h4 className="icon-box-title mb-0 ls-normal" style={{fontSize:"21px"}}>User Update</h4>
                </div>
            </div>
            <h4 className="title title-password ls-25 font-weight-bold">Update Form</h4>
            <form className="form account-details-form" action="#" method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Name </label>
                            <input placeholder={user.name||"Not Found"} onChange={handlechange} type="text" name="name" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="lastname">Email</label>
                            <input placeholder={user.email||"Not Found"} onChange={handlechange} type="text" name="email" className="form-control form-control-md"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="lastname">Phone</label>
                            <input placeholder={user.phone||"Not Found"} onChange={handlechange} type="text" name="phone" className="form-control form-control-md"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">User Type</label>
                            <input placeholder={user.usertype||"Not Found"} onChange={handlechange}  type="text"   name="usertype" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Status</label>
                            <input placeholder={user.enabled?"enabled":"Disabled"} type="text"  name="enabled" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Admin</label>
                            <input placeholder={user.isadmin?"admin":"client"}  type="text" name="isadmin" className="form-control form-control-md" />
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Account Title</label>
                            <input placeholder={user.ACCtitle||"Not Found"} type="text" name="ACCtitle" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="firstname">International Bank Account Number</label>
                            <input placeholder={user.IBAN||"Not Found"} type="text" name="IBAN" className="form-control form-control-md" />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="display-name">User Shipping Address</label>
                    <input  placeholder={user.address||"Not Found"} onChange={handlechange} type="text" name="address" className="form-control form-control-md mb-0"/>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="firstname">Logo Image</label>
                            <input onChange={handlechangeImage} type="file" name="logoimage" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="firstname">Vendor Page Image</label>
                            <input onChange={handlechangeImage} type="file" name="Banimage" className="form-control form-control-md" />
                        </div>
                    </div>
                </div>
                <span className="btn btn-dark btn-rounded btn-sm mb-4" style={_.isEmpty(inputs)&&disabled?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={()=>{postdata(user._id)}}>Save Changes</span>
                </form>
        </div>
        }
        </React.Fragment>
    )
}

export default AllUser