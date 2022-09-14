import React,{useEffect,useState} from 'react'
import {userRequest} from '../../../RequestMethods'
import {Link,useHistory} from 'react-router-dom'
import _ from 'lodash'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

import app from "../../../Firebase";

function AllUser() {
    const history = useHistory();
    const [inputs, setinputs] = useState([]);
    const [blog, setblog] = useState({});
    const [blogs, setblogs] = useState([]);
    const [detail,setdetail] = useState("false");
    const [disabled,setdisabled] = useState(true);
    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
    }  
    useEffect(()=>{
        const getdata =async()=>{
            const res = await userRequest.get("/functionality/blogs");
            setblogs(res.data);
        }
        getdata();
    },[])
    const handlechange = (e)=>{
        setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})
        console.log(inputs);
    }

    const handleChangeImage = (e)=>{
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
                        return { ...prev, image: downloadURL }});
                        setdisabled(false);
        });})}catch(err){alert("Upload Failed");}}

    const handleClick = async(id)=>{
        setinputs({});
        setblog(blogs[id])
    }
    const updatedata = async()=>{
        try{
        await userRequest.put("/functionality/blog/"+blog._id,inputs);
    alert("Successfully Created!");
    history.push(`/blog/${_.kebabCase(inputs.title)}`)}catch{
        alert("Failed to Create!");
        }
    }
    const postdata = async()=>{
        try{
        await userRequest.post("/functionality/blog",inputs);
    alert("Successfully Created!");
    history.push(`/blog/${_.kebabCase(inputs.title)}`)}catch{
        alert("Failed to Create!");
        }
    }
    const deleteproduct = async(id,title)=>{
        try{
        var ans = window.confirm(("Deleting Blog of title ")+title);
        if(ans){await userRequest.delete("/functionality/blogs/"+id);
        alert("Sucessful to Delete Blog");
        window.location.reload(false);
    }else{
            alert("Failed to Delete Blog");
        }
    }catch(err){
        alert("Failed to Delete Blog");
        }
    }

    return (
        
        <React.Fragment>
            {detail==="false"?
        <div>
            <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>All Blogs</h4>
            </div>
            </div>
            <div>
            <span className='btn btn-dark' style={{float:"right"}} onClick={()=>{setdetail("new");setinputs({});}}>Add New</span>
            </div>
            <table className="shop-table account-orders-table mb-6">
                <thead>
                    <tr>
                        <th className="order-total">Blog Name</th>
                        <th className="order-date">Date</th>
                        <th className="order-status">Tags</th>
                        <th className="order-total">Description</th>
                        <th className="order-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.reverse()?.map((product,i)=>(        
                    <tr key={i} style={(i%2===0)?{background:"#eee"}:{background:"#fff"}}>
                        <td className="order-total" style={{textAlign:"center"}}>{product.title||"Not Found"}</td>
                        <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(product.createdAt))||"Not Found"}</td>
                        <td className="order-status" style={{textAlign:"center"}}>{product.tag.map((tag)=>(<>{tag+" "}</>))||"Not Found"}</td>
                        <td className="order-total" style={{textAlign:"center"}}>
                            <span className="order-price" style={{textAlign:"center"}}>{((product.description[0]?.slice(0,30))+"..."||"Not Found")}</span>
                        </td>
                        <td className="order-action" style={{display:"flex",alignContent:"center"}}>
                            <Link to={"/blog/"+_.kebabCase(product.title)} style={{width:"max-content",padding:"5px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded"><img src="/assets/images/eye-svgrepo-com.svg" alt="view" style={{width:"20px"}}/></Link>
                            <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail(true);handleClick(i);}}><img src="/assets/images/pencil-svgrepo-com.svg" alt="update" style={{width:"20px"}}/></span>
                            <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{deleteproduct(product?._id,product.title)}}>
                                <img src="/assets/images/trash-svgrepo-com.svg" alt="delete" style={{width:"20px"}}/>
                            </span>
                        </td>
                    </tr>
                        ))}
                </tbody>
            </table>
            <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go Home<i className="w-icon-long-arrow-right"></i></Link>
        </div>:detail==="new"?
            <div><h4 className="title title-password ls-25 font-weight-bold">New Blog</h4>
            <form className="form account-details-form" action="#" method="post">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstname">Title *</label>
                            <input  onChange={handlechange} type="text" name="title" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname">Tags (joker,queen,king...)</label>
                            <input  onChange={(e)=>{setinputs((prev)=>{return{...prev,tag:e.target.value.split(",")}})}} type="text" name="email" className="form-control form-control-md"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname">Date (14-May-2020)</label>
                            <input  onChange={handlechange} type="text" name="Date" className="form-control form-control-md"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label >Image</label>
                            <input  onChange={handleChangeImage} type="file" name="image" className="form-control form-control-md"/>
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="display-name">Description * </label>
                    <textarea onChange={(e)=>{setinputs((prev)=>{return{...prev,description:e.target.value.split("\n")}})}} type="text" name="address" className="form-control form-control-md mb-0"></textarea>
                </div>
                <span className="btn btn-dark btn-rounded btn-sm mb-4" style={_.isEmpty(inputs)&&disabled?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={postdata}>Save Changes</span>
                </form>
            </div>:
            <div><h4 className="title title-password ls-25 font-weight-bold">Update Blog</h4>
            <form className="form account-details-form" action="#" method="post">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstname">Title *</label>
                            <input placeholder={blog.title}  onChange={handlechange} type="text" name="title" className="form-control form-control-md" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname">Tags (joker,queen,king...)</label>
                            <input placeholder={blog.tag[0]+"...."}  onChange={(e)=>{setinputs((prev)=>{return{...prev,tag:e.target.value.split(",")}})}} type="text" name="email" className="form-control form-control-md"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="lastname">Date (14-May-2020)</label>
                            <input placeholder={blog.Date}  onChange={handlechange} type="text" name="Date" className="form-control form-control-md"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label >Image</label>
                            <input  onChange={handleChangeImage} type="file" name="image" className="form-control form-control-md"/>
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="display-name">Description * </label>
                    <textarea placeholder={blog.description[0]+"...."} onChange={(e)=>{setinputs((prev)=>{return{...prev,description:e.target.value.split("\n")}})}} type="text" name="address" className="form-control form-control-md mb-0"></textarea>
                </div>
                <span className="btn btn-dark btn-rounded btn-sm mb-4" style={_.isEmpty(inputs)&&disabled?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={updatedata}>Save Changes</span>
                </form>
            </div>
        }
        </React.Fragment>
    )
}

// title: { type: String, required: 
//     creatorId: { type: String
//     description: { type: Array
//     tag: { type: Array
//     Date: { type: String
//     image

export default AllUser