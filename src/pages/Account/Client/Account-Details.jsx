import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import {userRequest} from '../../../RequestMethods'
import {useHistory} from 'react-router-dom'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

import app from "../../../Firebase";

function AccountDetails() {

    const history = useHistory();
    
    const [disabled,setdisabled] = useState(true);
    const [infodata,setinfodata] = useState({});
    const [pass,setpass] = useState({confirm:"abbsbsbbd@14"});
    const {currentUser} = useSelector((state) => state.user);
    
    const handleChangeInfo = (e)=>{
        setinfodata((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
    })
    setdisabled(false);
    }

    const handlechangepass = (e)=>{
        setpass((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
    })
    console.log(infodata);
    }

    const notenabled= {
        cursor: 'not-allowed',
        background: 'grey'
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
                    setinfodata((prev) => {
                        return { ...prev, [e.target.name]: downloadURL }});
                        setdisabled(false);
        });})}catch(err){alert("Upload Failed");}}


    const handleClickInfo = async(e)=>{
        e.preventDefault();
        setdisabled(true);
        try{
            const res = await userRequest.put("/users/"+currentUser._id,infodata);
            setinfodata(res.data);
            alert("Profile has Sucessfully Updated and Login again to see changes");
            history.push("/store/"+currentUser.username);
        }
        catch(err){
            alert("Profile has failed to Update!");
        }
    }

    const handleClickPass = async(e)=>{
        e.preventDefault();
        try{
            const res = await userRequest.put("/users/password/"+currentUser._id,pass);
            setinfodata(res.data);
            alert("Profile has Sucessfully Updated and Next time you should your new password");
            history.push("/store/"+currentUser.username);
        }
        catch(err){
            alert("Profile has failed to Update!");
        }
    }

    
  return (
    <div>
        <div className="icon-box icon-box-side icon-box-light">
            <span className="icon-box-icon icon-account mr-2">
                <i className="w-icon-user"></i>
            </span>
            <div className="icon-box-content mb-2 mt-2">
                <h4 className="icon-box-title mb-0 ls-normal" style={{fontSize:"21px"}}>Account Details</h4>
            </div>
        </div>
        <h4 className="title title-password ls-25 font-weight-bold">Account Informations</h4>
        <form className="form account-details-form" action="#" method="post">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstname">Name (Not-Username)</label>
                        <input type="text" name="name" placeholder={infodata.name||currentUser.name||"Not Found"} className="form-control form-control-md" onChange={handleChangeInfo}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastname">Email</label>
                        <input type="text" name="email" placeholder={infodata.email||currentUser.email||"Not Found"} className="form-control form-control-md" onChange={handleChangeInfo}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstname">Phone</label>
                        <input type="text"  name="phone" placeholder={infodata.phone||currentUser.phone||"Not Found"} className="form-control form-control-md" onChange={handleChangeInfo}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="lastname">Logo</label>
                        <input type="file"  name="logoimage" placeholder="Doe" className="form-control form-control-md" onChange={handleChangeImage}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="lastname">Vendor Banner</label>
                        <input type="file" name="Banimage" placeholder="Doe" className="form-control form-control-md" onChange={handleChangeImage}/>
                    </div>
                </div></div>
            <div className="form-group mb-3">
                <label htmlFor="display-name">Address</label>
                <input type="text" name="address" placeholder={infodata.address||currentUser.address||"Not Found"} className="form-control form-control-md mb-0" onChange={handleChangeInfo}/>
            </div>

            <div className="row form-group mb-3">
                <label htmlFor="display-name">Bank Account Details</label>
                <input type="text" name="ACCtitle" placeholder={infodata.ACCtitle||currentUser.ACCtitle||"Account Title"} className="col-md-3 form-control form-control-md mb-0 mr-2" onChange={handleChangeInfo}/>
                <input type="text" name="IBAN" placeholder={infodata.IBAN||currentUser.IBAN||"IBAN (16 Digit Bank Account Number) "} className="col-md-8 form-control form-control-md mb-0" onChange={handleChangeInfo}/>
            </div>

            <button className="btn btn-dark btn-rounded btn-sm mb-4" onClick={handleClickInfo} style={disabled?notenabled:{color:"white"}}>Save Changes</button>
            

            <h4 className="title title-password ls-25 font-weight-bold">Password change</h4>
            <div className="form-group">
                <label className="text-dark" htmlFor="cur-password">Current Password leave blank to leave unchanged</label>
                <input type="password" className="form-control form-control-md" name="oldpassword" id="cur_password" onChange={handlechangepass}/>
            </div>
            <div className="form-group">
                <label className="text-dark" htmlFor="new-password">New Password leave blank to leave unchanged</label>
                <input type="password" className="form-control form-control-md" name="newpassword" id="new_password" onChange={handlechangepass}/>
            </div>
            <div className="form-group mb-10">
                <label className="text-dark" htmlFor="conf-password">Confirm Password</label>
                <input type="password" className="form-control form-control-md" name="confirm" id="conf_password" onChange={handlechangepass}/>
            </div>
            <button type="submit" style={pass.confirm!==pass.newpassword?notenabled:{color:"white"}} className="btn btn-dark btn-rounded btn-sm mb-4" onClick={handleClickPass}>Save Password</button>
        </form>
    </div>
  )
}

export default AccountDetails