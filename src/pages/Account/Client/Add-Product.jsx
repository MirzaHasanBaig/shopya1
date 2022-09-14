import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {addProduct} from '../../../redux/APICall'
import _ from 'lodash'
import { useHistory } from 'react-router-dom';
import {userRequest} from '../../../RequestMethods'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

import app from "../../../Firebase";

function AddProduct() {

  const history = useHistory();
  const [cate, setcate] = useState([false]);
    const [product, setproduct] = useState(false);
    const [inputs, setInputs] = useState({category:"clothing"});
    const [file, setFile] = useState(null);
    const [button, setbutton] = useState(true);
    const [color, setcolor] = useState([]);
    const [size, setsize] = useState([]);
    const dispatch = useDispatch();
    
    const {currentUser} = useSelector((state) => state.user)
    const {isFetching,error} = useSelector((state) => state.product)

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
    

      useEffect(()=>{
        const getdata = async()=>{
          const res = await userRequest.get("/categories");
          setcate({data:res.data});
        }
        getdata();
      },[])

      const enabled = {background:"black",cursor:"pointer"}
      const disabled = {background:"grey",cursor:"not-allowed"}

    const handleClick = (e) => {
      e.preventDefault();
      setproduct(true);
      setbutton(false);
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      try{      
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
                    const postdata = async()=>{
                            const product = { ...inputs, image: downloadURL, colors: color,sizes:size };
                            await addProduct(product,dispatch);}
                            history.push(process.env.PUBLIC_URL+"/product/"+currentUser.username+"/"+(_.kebabCase(inputs.title)));
                        postdata();
                    });
                  })
      }catch(err){
          alert("Product Failed");
        }
    }


  return (
      <>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-account mr-2">
                <i className="w-icon-user"></i>
            </span>
            <div className="icon-box-content mb-2 mt-2">
                <h4 className="icon-box-title mb-0 ls-normal" style={{fontSize:"21px"}}>Add New Products</h4>
            </div>
        </div>
        <form className="form account-details-form" action="#" method="post">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstname">Name *</label>
                        <input type="text" id="firstname"name="title" onChange={handleChange}  className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Category *</label>
                        <select  className="form-control form-control-md" name='category' onChange={(e)=>{setInputs((prev)=>{return{...prev,category:e.target.value}})}}>
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
                        <input type="text" id="firstname" name='colors' onChange={handleCol}  placeholder="red,yellow..." className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Sizes*</label>
                        <input type="text" id="lastname" name='sizes'  onChange={handleSiz} placeholder="medium,large..." className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Price *</label>
                        <input type="text" id="lastname" name='lowPrice' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Market Price *</label>
                        <input type="text" id="lastname"  name='prices' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Tag *</label>
                        <input type="text" id="lastname" name='tags' onChange={handleChange} className="form-control form-control-md"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Product Image *</label>
                        <input id="lastname" type='file' name='tags' style={{padding:"5px"}} onChange={(e) => setFile(e.target.files[0])} className="form-control form-control-md"/>
                    </div>
                </div>
              </div>
            <div className="form-group mb-3">
                <label htmlFor="display-name">Product Description *</label>
                <textarea type="text" id="display-name" name="descrip" onChange={handleChange} className="form-control form-control-md mb-0"></textarea>
            </div>

            <button type="submit" className="btn btn-dark btn-rounded btn-sm mb-4" style={!file?disabled:!isFetching?enabled:button?enabled:disabled} onClick={handleClick}>Add Product</button>
            {error&&product&&<div style={{color:"red"}}>Add Product Failed</div>}
            {!error&&isFetching&&product&&<div style={{color:"blue"}}>Please Wait for Image Uploading and Product creation</div>}
    
        </form>
      </>
    
  )
}

export default AddProduct