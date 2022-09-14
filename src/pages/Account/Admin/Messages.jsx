import React,{useState,useEffect} from 'react'
import {userRequest} from '../../../RequestMethods'

function Message() {
  const [detail, setdetail] = useState(false);
  const [message, setmessage] = useState([]);
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    const run = async()=>{
      const res = await userRequest.get(`/functionality/contact`);
      setmessages(res.data);
    }
    run();
  }, [])

  const dateFormat = (date)=>{
    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    const month = date.getMonth();
    const day = date.getDate();
    const dayString = day >= 10 ? day : `0${day}`;
    return `${dayString}-${months[month]}-${date.getFullYear()}`;
}

  
  return (
    <div>
      {!detail?
      <>
      <h3 style={{align:"center"}}>Messages</h3>
      <table className="shop-table account-orders-table mb-6">
        <thead>
            <tr>
                <th className="order-status">Messenger Name</th>
                <th className="order-id">Messenger Name</th>
                <th className="order-total">Date</th>
                <th className="order-total">Details</th>
                <th className="order-actions">Actions</th>
            </tr>
        </thead>
        <tbody>
            {messages.reverse()?.map((datum,n)=>(       
            <tr key={datum._id}>
                <td className="order-id" style={{textAlign:"center"}}>{(datum.name)||"Not Found"}</td>
                <td className="order-status" style={{textAlign:"center"}}>{datum.email||"Not Found"}</td>
                <td className="order-status" style={{textAlign:"center"}}>{dateFormat(new Date(datum.createdAt))||"Not Found"}</td>
                <td className="order-total" style={{textAlign:"center"}}>
                  <span>{datum.description.slice(0,30)+"...."}</span>
                </td>
                <td className="order-action">
                    <span className="btn btn-outline btn-default btn-block btn-sm btn-rounded" onClick={()=>{setmessage(datum);setdetail(true)}}>View</span>
                </td>
            </tr>
                ))}
        </tbody>
      </table></>:
      <div>
        <div className='mt-5 mb-5'>
          <div style={{fontSize:"16px",fontWeight:"700"}}>
            Messenger Name
          </div>
          <div>
            {message.name}
          </div>
        </div>
        <div className='mt-5 mb-5'>
          <div style={{fontSize:"16px",fontWeight:"700"}}>
            Messenger Email
          </div>
          <div>
            {message.email}
          </div>
        </div>
        <div className='mt-5 mb-5'>
          <div style={{fontSize:"16px",fontWeight:"700"}}>
            Messenger Description
          </div>
          <div>
            {message.description}
          </div>
        </div>
        <span className='btn btn-dark' onClick={()=>{setdetail(false)}}>Go Back</span>
      </div>
    }
</div>
  )
}

export default Message