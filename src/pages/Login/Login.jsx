import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login,logoutTimer } from "../../redux/APICall";
import {useHistory} from 'react-router-dom';
import { publicRequest } from '../../RequestMethods';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "./../../Firebase";

function Login() {
    
const dispatch = useDispatch();
const history = useHistory();

const [data, setdata] = useState({});
const [Rusername, setRusername] = useState(false);
const {isFetching,error,currentUser } = useSelector((state) => state.user);
const [username, setusername] = useState("");
const [password, setpassword] = useState("");
const [file, setfile] = useState(null);
const [click, setclick] = useState(false);

currentUser && history.push("/");

const handleRegister = (e)=>{
    setdata((prev)=>{
        return {...prev,[e.target.name]:e.target.value}
    })
    console.log(data);
}

const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    logoutTimer(dispatch,86400000);
    currentUser && history.push("/");
};

const disabled = {
    cursor:"not-allowed",
    background: "grey"
}

const checkuser= async()=>{
    if(data.username!==undefined){
        const res = await publicRequest.get("/users/check/"+data.username);
        res.data.availability?setRusername(true):setRusername(false);
    }  
}

const Register = async()=>{
    setclick(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
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
                const getdata = async()=>{
                    const res = await publicRequest.post("/auth/register",{...data,logoimage:downloadURL});
                    res.data.username?alert("Registration Sucessful"):alert("Registration Failed");
                }
                getdata();
            });
          }
        )
}
  return (
    <div className="page-content mt-10 mb-10">
                <div className="container">
                    <div className="login-popup mr-auto ml-auto">
                        <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                            <ul className="nav nav-tabs text-uppercase" role="tablist">
                                <li className="nav-item">
                                    <a href="#sign-in" className="nav-link active">Sign In</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#sign-up" className="nav-link">Sign Up</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="sign-in">
                                    <div className="form-group">
                                        <label>Username or email address *</label>
                                        <input onChange={(e)=>{setusername(e.target.value)}} type="text" className="form-control" name="username" id="username" required=""/>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label>Password *</label>
                                        <input onChange={(e)=>{setpassword(e.target.value)}} type="password" className="form-control" name="password" id="password" required=""/>
                                    </div>
                                    <div className="form-checkbox d-flex align-items-center justify-content-between">
                                        <a href="!#">Lost your password?</a>
                                    </div>
                                    <button onClick={handleClick} style={isFetching?disabled:{}} className="btn btn-primary">Sign In</button>
                                    {error ? <span className='mt-5'>Check Your Username and Password then try again...</span>:<></>}
                                </div>
                                <div className="tab-pane" id="sign-up">
                                    <div className="form-group">
                                        <label>Your email address *</label>
                                        <input onChange={handleRegister} type="text" className="form-control" name="email" id="email_1" required=""/>
                                    </div>
                                    <div className="form-group mb-5">
                                        <label>Password *</label>
                                        <input onChange={handleRegister} type="password" className="form-control" name="password" id="password_1" required=""/>
                                    </div>
                                    <div className="checkbox-content login-vendor">
                                        <div className="form-group mb-5">
                                            <label>First Name *</label>
                                            <input onChange={handleRegister} type="text" className="form-control" name="name" id="first-name" required=""/>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Last Name *</label>
                                            <input onChange={handleRegister} type="text" className="form-control" name="lastname" id="last-name" required=""/>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>User Name *</label>
                                            <input onChange={handleRegister} type="text" className="form-control" name="username" id="shopname" required=""/>
                                            <button className="btn btn-primary bg-black mb-2 mt-2"onClick={checkuser}>Check Avialability</button>
                                            {!Rusername?<div style={{color:"red"}}>Username is not Avaiable</div>:<div style={{color:"green"}}>Username is Avaiable</div>}
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Phone Number *</label>
                                            <input onChange={handleRegister} type="text" className="form-control" name="phone" id="phone-number" required=""/>
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Image *</label>
                                            <input type="file" className="form-control" name="logoimage" id="phone-number" required="" onChange={(e) => setfile(e.target.files[0])}/>
                                        </div>
                                    </div>
                                    <p>Your personal data will be used to support your experience 
                                        throughout this website, to manage access to your account, 
                                        and for other purposes described in our privacy policy.</p>
                                    <div className="form-checkbox d-flex align-items-center justify-content-between mb-5">
                                        <input type="checkbox" className="custom-checkbox" id="remember" name="remember" required=""/>
                                        <label htmlFor="remember" className="font-size-md">I agree to the <a href="!#" className="text-primary font-size-md">privacy policy</a></label>
                                    </div>
                                    <button style={!file&&!Rusername&&click?disabled:{background:"black"}} onClick={Register} className="btn btn-primary">Sign Up</button>
                                    {click&&<div style={{color:"green"}}>Please Wait for upload image and data</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Login