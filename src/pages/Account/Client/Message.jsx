import React,{useState} from 'react'
import {userRequest} from '../../../RequestMethods'

function Message() {
  const [inputs,setinputs] = useState({});
  
const postdata = async()=>{
  try{
  await userRequest.post("/functionality/contact",inputs)
    alert("Successfully Send");
}catch{
  alert("Failed to Send");
  }
}
  
  return (
    <div>
      <form className="form account-details-form" action="#" method="post">
              <div className="row">
                  <div className='col-sm-12'>
                          <div className="form-group mb-3">
                              <label htmlFor="firstname">Your Name *</label>
                              <input name="name" onChange={(e)=>{setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})}} placeholder={"Hassan"} type="text" className="form-control form-control-md" />
                          </div>
                          <div className="form-group mb-3">
                              <label htmlFor="firstname">Your Email *</label>
                              <input name="email" onChange={(e)=>{setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})}} placeholder={"Hassan@gmail.com"} type="text" className="form-control form-control-md" />
                          </div>
                          <div className="form-group mb-3">
                              <label htmlFor="firstname">Compliant Description *</label>
                              <input name="description" onChange={(e)=>{setinputs((prev)=>{return{...prev,[e.target.name]:e.target.value}})}} placeholder={"Product Error"} type="text" className="form-control form-control-md" />
                          </div>
                          <span className='btn btn-dark' onClick={postdata}>Send Message</span>
                  </div>
              </div>
      </form>    
    </div>
  )
}

export default Message