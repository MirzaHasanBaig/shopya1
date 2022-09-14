import React from 'react';
import {useLocation} from "react-router-dom";
import {Link} from 'react-router-dom'

function OrderRedirect(props) {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const status = new URLSearchParams(search).get('status');
  return (
    <div className='conatiner' style={{textAlign:"center"}}>
        <div className='mt-10 mb-10'>
          {status==="success"&&id?
         <>
         <h1>Order has Successfully Placed!</h1>
         <p>{"Your Order id is "+id}</p>
         <p>We will Contact you soon after payment confirmation</p>
         <Link to="/account" className="btn btn-primary">Visit Account</Link>
         </>:
         <>
         <h1>Order has failed because something wrong! </h1>
         <p>{"Your Order id is Not Found"}</p>
         <p>If you think it is a server error please contact us!</p>
         <Link to="/"  className="btn btn-primary">Visit Account</Link>
         </>
        }
        </div>
    </div>
  )
}

export default OrderRedirect