import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userRequest} from '../../../RequestMethods'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

  import app from "../../../Firebase";


function Products() {    

    
    const [cate, setcate] = useState([false]);
    const [inputs, setInputs] = useState({});
    const [color, setcolor] = useState(inputs?.colors);
    const [size, setsize] = useState(inputs?.sizes);
    const {currentUser} = useSelector((state) => state.user);
    const [product, setproduct] = useState(0);
    const [products, setproducts] = useState([]);
    const [isupdate, setupdate] = useState(false);

    useEffect(()=>{
        const getdata = async()=>{
            const res = await userRequest.get("/product/user/"+currentUser.username);
            setproducts(res.data);
          const resa = await userRequest.get("/categories");
          setcate({data:resa.data});
        }
        getdata();
    },[])


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


      const postdata = async(id)=>{try{
        const product = { ...inputs,  colors: color,sizes:size };
        await userRequest.patch(("/product/"+id),product);
        alert("Update has successfuly take place!");
      }catch(err){
          alert("Failed to Update!");
        }}

    const deleteproduct = async(id)=>{
        try{
        await userRequest.delete(("/product/"+id));
        alert("The Order has been Successfully deleted");
    }catch(err){
        alert("The Order has failed to deleted");
        }
    }

    const handleChange = (e)=>{
        setInputs((prev) => {
        return { ...prev,...cate, [e.target.name]: e.target.value };
      })}
    
      const handleCol = (e) => {
        setcolor(e.target.value.split(","));
      };
    
      const handleSiz = (e) => {
        setsize(e.target.value.split(","));
      };


  return (
    <div className="mb-4">{
        !isupdate?<>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-orders">
                <i className="w-icon-orders"></i>
            </span>
            <div className="icon-box-content mt-2 mb-2">
                <h4 className="icon-box-title text-capitalize ls-normal mb-0" style={{fontSize:"21px"}}>Products</h4>
            </div>
        </div>

        <div className="shop-table account-orders-table mb-6">
            <div className='row'>
                {products.reverse()?.map((product,n)=>(
                <div class="card col-sm-12 col-md-4 col-lg-3" style={{padding:"10px"}}>
                    <div style={{border:"1px solid #eee"}}>
                        <img class="card-img-top" src={product.image||"Not Found"} alt={product.title||"Not Found"}  style={{width:"100%"}}/>
                        <div class="card-body" style={{padding:"10px"}}>
                        <h5 class="card-title">{product.title||"Not Found"}</h5>
                        <p class="card-text">{"Colors = "+(product.colors||"Not Found")}<br/>{"Sizes = "+(product.sizes||"Not Found")}<br/>{"Price = "+product.lowPrice||"Not Found"}</p>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span className="btn" style={{padding:"10px"}} onClick={()=>{setupdate(true);setproduct(n)}}>Update</span>
                        <span className="btn" style={{padding:"10px"}} onClick={()=>{deleteproduct(product._id)}}>Delete</span>
                        </div>
                    </div>
                </div>
                </div>
                ))}
            </div>
        </div>

        <Link href="/" className="btn btn-dark btn-rounded btn-icon-right">Go Home<i className="w-icon-long-arrow-right"></i></Link>
        </>:<div>
            <div>
                <form className="form account-details-form" action="#" method="post">
                    <h3>Update Product</h3>
                    <p>Leave Blank to Not Update Feild....</p>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstname">Name *</label>
                        <input placeholder={products[product]?.title} type="text" id="firstname" name="title" onChange={handleChange}  className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Category *</label>
                        <select  className="form-control form-control-md" name='category' onChange={(e)=>{setInputs({category:e.target.value})}}>
                          {cate.data?.slice(0,10).map((scate,n)=>(
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
                        <input placeholder={products[product]?.colors||"red,yellow,blue..."}  type="text" id="firstname" name='colors' onChange={handleCol} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Sizes*</label>
                        <input placeholder={products[product]?.sizes||"large,medium,small..."}  type="text" id="lastname" name='sizes'  onChange={handleSiz} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Price *</label>
                        <input placeholder={products[product]?.lowPrice||"NotFound"}  type="text" id="lastname" name='lowPrice' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Market Price *</label>
                        <input placeholder={products[product]?.prices||"NotFound"} type="text" id="lastname"  name='prices' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Tag *</label>
                        <input placeholder={products[product]?.tags||"NotFound"} type="text" id="lastname" name='tags' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Image *</label>
                        <input placeholder={products[product]?.image||"NotFound"} id="lastname" type='file' name='tags' style={{padding:"5px"}} onChange={handleChangeImage} className="form-control form-control-md"/>
                    </div>
                </div>
              </div>
            <div className="form-group mb-3">
                <label htmlFor="display-name">Product Description *</label>
                <textarea placeholder={products[product]?.descrip||"NotFound"} type="text" id="display-name" name="descrip" onChange={handleChange} className="form-control form-control-md mb-0"></textarea>
            </div>
            <span type="submit" className="btn btn-dark btn-rounded btn-sm mb-4" style={inputs==={}?{cursor:"not-allowed"}:{cursor:"pointer"}}onClick={()=>{postdata(products[product]?._id)}}>Update Product</span>
        </form>
            </div>
            <span className='btn' onClick={()=>{setupdate(false)}}>Return</span>
            </div>}
    </div>
  )
}

export default Products