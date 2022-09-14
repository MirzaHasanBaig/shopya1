import React,{useState,useEffect} from 'react'
import {userRequest} from '../../../RequestMethods'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

  import app from "../../../Firebase";

function Setup() {
    const [detail,setdetail] = useState("main");
    const [set,setset] = useState([]);
    const [input,setinput] = useState([]);
    const [scate,setscate] = useState([]);
    const [upcate,setupcate] =  useState({});

    useEffect(()=>{
        const run = async()=>{
            const res = await userRequest.get("/functionality/images");
            setset(res.data);
            const res2 = await userRequest.get(`categories`);
            setscate(res2.data);
        }
        run();
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
                      setinput((prev)=>{return{...prev,image: downloadURL}})
                      });
                    })
        }catch(err){
            alert("Product Failed");
          }
      }
      const updateCate = ()=>{}
    const postdata = async(id)=>{
        try{
            var ans  = window.confirm(`Update Banner of Id ${id}`);
            if(ans){
                await userRequest.put(`/functionality/images/${id}`,input);
                alert("Successful to Update")
            }else{alert("Failed to Update")}
        }catch{
            alert("Failed to Update");
        }
    }

  const handleChange = (e)=>{setinput((prev)=>{return{...prev,[e.target.name]:e.target.value}})}

  const handleClick = async(id)=>{
    try{
      var ans  = window.confirm(`Update Banner of Id ${id}`);
      if(ans){
          await userRequest.patch(`/categories/${id}`,input);
          alert("Successful to Update")
      }else{alert("Failed to Update")}
  }catch{
      alert("Failed to Update");
  }
  }

  const arr = ["Slider 1","Slider 2","Slider 3","Slider 4","Slider 5","Slider 6","Slider 7","Slider 8","Slider 9","Slider 10"]
  
  return (
    <div>
      {detail==="main"?
      <>
      <div>
        <h3>Welcome To Setup</h3>
        <span className='btn btn-dark mr-2' onClick={()=>{setdetail("categories")}}>Categories</span>
        <span className='btn btn-dark' onClick={()=>{setdetail("banners")}}>Banners</span>
      </div>
      </>:detail==="banners"?
    <div>
      <h3>Setup Banners</h3>
      <form className="form account-details-form" action="#" method="post">
              <div className="row">
                  {set?.map((sset,i)=>(
                  <div className='col-sm-11 col-md-5 ml-2 mr-2 mt-2 mb-2' key={i}>
                      <h4>{arr[i]}</h4>
                          <div className="form-group">
                              <label htmlFor="firstname">Title *</label>
                              <input onChange={handleChange} placeholder={sset.name||"Not Found"} type="text" name="title" className="form-control form-control-md" />
                              <label htmlFor="firstname">Description *</label>
                              <input onChange={handleChange} placeholder={sset.desc||"Not Found"} type="text" name="desc" className="form-control form-control-md" />
                          </div>
                          <div className="form-group">
                              <label htmlFor="firstname">Tag *</label>
                              <input onChange={handleChange} placeholder={sset.tag||"Not Found"} type="text" name="tag" className="form-control form-control-md" />
                              <label htmlFor="firstname">Images *</label>
                              <input onChange={handleChangeImage} type="file" name="image" className="form-control form-control-md" />
                          </div>
                              <label htmlFor="firstname">Link *</label>
                              <input onChange={handleChange} placeholder={sset.link||"Not Found"} type="text" name="link" className="form-control form-control-md" />
                          <span className='btn btn-dark' onClick={()=>{postdata(sset._id)}}>Update</span>
                  </div>
                  ))}
                  </div>
      </form><span className='btn btn-dark' onClick={()=>{setdetail("main")}}>Go Setup</span>
    </div>:detail==="categories"?<><table className="shop-table account-orders-table mb-6">
            <thead>
                <tr>
                    <th className="order-status">Category Nbr</th>
                    <th className="order-id">Categories Name</th>
                    <th className="order-total">Sub Categories</th>
                    <th className="order-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {scate?.map((datum,n)=>(       
                <tr key={datum._id}>
                    <td className="order-id" style={{textAlign:"center"}}>{"#"+(n+1)||"Not Found"}</td>
                    <td className="order-status" style={{textAlign:"center"}}>{datum.name||"Not Found"}</td>
                    <td className="order-total" style={{textAlign:"center"}}>
                      {datum.subcategories?.map((data,a)=>(<span key={a}>{`${data},`}</span>))}
                    </td>
                    <td className="order-action" onClick={updateCate}>
                        <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setupcate(datum);setdetail("scate")}}>View</span>
                    </td>
                </tr>
                    ))}
            </tbody>
        </table><span className='btn btn-dark' onClick={()=>{setdetail("main")}}>Go Setup</span></>:
                <><div className='col-sm-12'>
                <h4>{`Updating form of Category ${upcate.name}`}</h4>
                    <div className="form-group">
                        <label htmlFor="firstname">Title *</label>
                        <input onChange={handleChange} placeholder={upcate.name||"Not Found"} type="text" name="name" className="form-control form-control-md mb-2" />
                        <label htmlFor="firstname">Image *</label>
                        <input onChange={handleChangeImage} type="file" name="image" className="form-control form-control-md mb-2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Subcategories *</label>
                        <textarea onChange={(e)=>{setinput((prev)=>{return{...prev,subcategories:e.target.value.split(",")}})}} placeholder={(upcate.subcategories)||"Not Found"} type="text" name="tag" className="form-control form-control-md mb-5" ></textarea>
                      </div>
                    <span className='btn btn-dark' onClick={()=>{handleClick(upcate._id)}}>Update</span>
            </div></>
    }
    </div>
  )
}

export default Setup