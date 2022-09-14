import React,{useState,useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {userRequest} from './../../../RequestMethods'
import _ from 'lodash';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

  import app from "../../../Firebase";

function AllOrders() {
    const location = useLocation();
    const [cate, setcate] = useState([]);
    const [page, setpage] = useState([location.pathname.split("/")[0],"account","1"]);
    const [inputs, setInputs] = useState({});
    const [color, setcolor] = useState(inputs?.colors);
    const [size, setsize] = useState(inputs?.sizes);
    const [product, setproduct] = useState({});
    const [PL, setPL] = useState(0);
    const [detail,setdetail] = useState(false);
    const [data, sedata] = useState([]);

    useEffect(()=>{
        if(location.pathname.split("/")[2]){
        setpage(location.pathname.split("/"));}
        else{setpage([location.pathname.split("/")[0],"account","1"])};
    },[location.pathname])

    const PostPL = async()=>{
        try{
        await userRequest.put(`/product/update/`+product._id,{PL:PL});
        alert("Successfully Update");}catch{
        alert("Failed to Update")
        }
    } 

        const handleChangeImage = (e) => {
            e.preventDefault();
            const fileName = new Date().getTime() + e.target.files[0]?.name;
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
                          setInputs((prev)=>{return{...prev,image: downloadURL}})
                          });
                        })
            }catch(err){
                alert("Product Failed");
              }
          }

    const deleteproduct = async(id)=>{
        try{
        var ans = window.confirm("Deleting Product of id "+id);
        if(ans){
        await userRequest.delete(("/product/"+id));
        alert("The Product has been Successfully deleted");
        window.location.reload(false);}
        else{alert("The Product has failed to delete");}
    }catch(err){
        alert("The Product has failed to delete");
        }
    }

    const updateproduct = async(id)=>{
        try{
        await userRequest.patch(("/product/"+id),{...inputs,...color,...size,});
        alert("The Product has been Successfully Updated");
    }catch(err){
        alert("The Product has failed to Update");
        }
    }

    const handleChange = (e)=>{
        setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      })}
    
      const handleCol = (e) => {
        setcolor(e.target.value.split(","));
      };
    
      const handleSiz = (e) => {
        setsize(e.target.value.split(","));
      };


    useEffect(()=>{
        const getdata = async()=>{
            const res = await userRequest.get(`/product/${page[2]}`);
          const resa = await userRequest.get("/categories");
          setcate(resa.data);
        sedata(res.data);
        }
        getdata();
    },[page])


    const handleClick = async(i)=>{
        const myproduct = await userRequest.get("/product/getbyid/"+i);
        setproduct(myproduct.data);
    }

    const dateFormat = (date)=>{
        const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        const month = date.getMonth();
        const day = date.getDate();
        const dayString = day >= 10 ? day : `0${day}`;
        return `${dayString}-${months[month]}-${date.getFullYear()}`;
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
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>All Products</h4>
            </div>
        </div>

        <table className="shop-table account-orders-table mb-6">
            <thead>
                <tr>
                    <th className="order-id">Product Name</th>
                    <th className="order-date">Date</th>
                    <th className="order-status">Category</th>
                    <th className="order-total">Total</th>
                    <th className="order-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.reverse()?.map((product,i)=>(        
                <tr key={i} style={(i%2===0)?{background:"#eee"}:{background:"#fff"}}>
                    <td className="order-id" style={{textAlign:"center"}}>{product.title||"Not Found"}</td>
                    <td className="order-date" style={{textAlign:"center"}}>{dateFormat(new Date(product.createdAt))||"Not Found"}</td>
                    <td className="order-status" style={{textAlign:"center"}}>{product.category||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                        <span className="order-price" style={{textAlign:"center"}}>{"PKR "+(product.lowPrice||"Not Found")}</span> for 1 Item
                    </td>
                    <td className="order-action" style={{display:"flex"}}>
                        <Link to={"/product/"+product.creatorid+"/"+_.kebabCase(product.title)} style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded"><img src="/assets/images/eye-svgrepo-com.svg" alt="view" style={{width:"20px"}}/></Link>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setdetail(true);handleClick(product._id);}}><img src="/assets/images/pencil-svgrepo-com.svg" alt="update" style={{width:"20px"}}/></span>
                        <span style={{width:"max-content",padding:"5px",marginLeft:"2px"}} className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{deleteproduct(product?._id)}}><img src="/assets/images/trash-svgrepo-com.svg" alt="delete" style={{width:"20px"}}/></span>
                        </td>
                </tr>
                    ))}
            </tbody>
        </table>

        <Link to="/" className="btn btn-dark btn-rounded btn-icon-right">Go
            Home<i className="w-icon-long-arrow-right"></i></Link></>
    ):(<div>
        <div>
            <form className="form account-details-form" action="#" method="post">
                <h3>Update Product</h3>
                <p>Leave Blank to Not Update Feild....</p>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="firstname">Name *</label>
                    <input placeholder={product?.title} type="text" id="firstname" name="title" onChange={handleChange}  className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Category *</label>
                    <select  className="form-control form-control-md" name='category' onChange={(e)=>{setInputs({category:e.target.value})}}>
                      {cate?.slice(0,10).map((scate,n)=>(
                        <option value={scate.name} key={n}>{scate.name}</option>
                      ))}
                    </select>
                    </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="firstname">Colors*</label>
                    <input placeholder={product?.colors||"red,yellow,blue..."}  type="text" id="firstname" name='colors' onChange={handleCol} className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Sizes*</label>
                    <input placeholder={product?.sizes||"large,medium,small..."}  type="text" id="lastname" name='sizes'  onChange={handleSiz} className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Product Price *</label>
                    <input placeholder={product?.lowPrice||"NotFound"}  type="text" id="lastname" name='lowPrice' onChange={handleChange} className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Product Market Price *</label>
                    <input placeholder={product?.prices||"NotFound"} type="text" id="lastname"  name='prices' onChange={handleChange} className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Product Tag *</label>
                    <input placeholder={product?.tags||"NotFound"} type="text" id="lastname" name='tags' onChange={handleChange} className="form-control form-control-md"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Product Image *</label>
                    <input id="lastname" type=
                    'file' name='tags' style={{padding:"5px"}} onChange={handleChangeImage} className="form-control form-control-md"/>
                </div>
                <div className='form-group'>
                    <label>Priority Level </label>
                    <input type="number" className='mb-3' placeholder={product?.PL} onChange={(e)=>{setPL(e.target.value)}}/>
                    <span className='btn btn-dark' onClick={PostPL}>Update PL</span>
                </div>
            </div>
          </div>
        <div className="form-group mb-3">
            <label htmlFor="display-name">Product Description *</label>
            <textarea placeholder={product?.descrip||"NotFound"} type="text" id="display-name" name="descrip" onChange={handleChange} className="form-control form-control-md mb-0"></textarea>
        </div>
        <span onClick={()=>{updateproduct(product?._id)}} className="btn btn-dark btn-rounded btn-sm mb-4" style={inputs==={}?{cursor:"not-allowed"}:{cursor:"pointer"}}>Update Product</span>
    </form>
        </div>
        <span className='btn' onClick={()=>{setdetail(false)}}>Return</span>
        </div>)}
    </div>
    </React.Fragment>
  )
}

export default AllOrders