import React,{useState} from 'react'
import {publicRequest} from './../../RequestMethods'
function FooterNewsletter() {
  const [email,setemail] = useState("");
  const [status,setstatus] = useState("neutral");
  const post = async(e)=>{
    e.preventDefault();
    try{
      const res = await publicRequest.post("/functionality/email",{email});
      setstatus("pass")
    }
    catch(err){
      setstatus("fail")
    }
  }
  return (
        <div className="footer-newsletter bg-primary">
        <div className="container">
        <div className="row justify-content-center align-items-center">
        <div className="col-xl-5 col-lg-6">
        <div className="icon-box icon-box-side text-white">
        <div className="icon-box-icon d-inline-flex"> </div>
        <div className="icon-box-content">
        <h4 className="icon-box-title text-white text-uppercase font-weight-bold">Subscribe To Our Newsletter</h4>
        <p className="text-white">Get all the latest information on Events, Sales and Offers.</p>
        </div>
        </div>
        </div>
        <div className="col-xl-7 col-lg-6 col-md-9 mt-4 mt-lg-0 "><form className="input-wrapper input-wrapper-inline input-wrapper-rounded" action="#" method="get">
          <input onChange={(e)=>{setemail(e.target.value)}} id="email" className="form-control mr-2 bg-white" name="email" type="email" placeholder="Your E-mail Address" /> 
          <button className="btn btn-dark btn-rounded" onClick={post}>Subscribe</button>
          {status==="neutral"?null:status==="pass"?alert("You have sucessfully signup for newsletters"):alert("You are failed to signup for newsletters")}
        </form>
        </div>
        </div>
        </div>
        </div>
  )
}

export default FooterNewsletter