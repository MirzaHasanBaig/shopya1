import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {userRequest} from '../../../RequestMethods'
import {useHistory} from 'react-router-dom'

function BuyLicense() {
    const [amount, setamount] = useState();
    const [duration,setduration] = useState(1);
    const history = useHistory();
    const key="pk_test_51LSPYLCuxJcgXEvZ99DfZP9CGUQME6kltGaWMpbHskBiQSuwVbzBdPbKLLe2BhxW6rESs0WXqacb7INol3QjRUcA00vUyiihQh";
    const onToken = async(token) => {
        try{
            console.log(amount.amount);
        const myamount = amount.amount;
        const mytype = myamount===3000?"silver":myamount===6000?"gold":"diamond";
        const resp = await userRequest.post("/stripe/payment",{tokenId: token.id,amount:myamount})
        const Stoken = resp.data;
        const res = await userRequest.post("/functionality/license",{token:Stoken.id?.toString(),amount:myamount,duration,type:mytype});
        history.push(`/orderinfo?id=${res._id}&status=success`);

    }catch(err){
            alert("Order has failed to placed!");
        }
}

  return (
    <div>
        <h3 className="mt-2 mb-2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Buy Lisence</h3>
        <h3 className="mt-2 mb-2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{duration} Months</h3>
        <input type="range" min="1" max="12" onInput={(e)=>{setduration(e.target.value)}} defaultValue="1" class="slider" id="myRange"></input>
        <div className='row'>
                <div class="card col-sm-12 col-md-4" style={{padding:"10px"}} onClick={()=>{setamount({amount:3000})}}>
                    <div style={{border:"1px solid #eee"}}>
                        <img class="card-img-top" src="/assets/images/Silver.png" alt="silver package"/>
                        <div class="card-body" style={{padding:"10px"}}>
                        <h3 class="card-title">Silver Package</h3>
                        <p class="card-text">
                            <ul>
                                <li>SEO in Search Page</li>
                                <li>3% Finalized Fees</li>
                                <li>Products limit increased upto 8 Products</li>
                                <li>48 Hour Completed Orders Payment</li>
                                <li>Only in 3,000PKR/= Monthly</li>
                            </ul>
                        </p>
                        
                        <div style={{display:"flex",justifyContent:"space-between"}} >
                        <StripeCheckout stripeKey={key} token={onToken} amount={3000*duration} currency="USD" locale='auto' >
                            <span className="btn btn-dark btn-block btn-rounded" style={duration===0?{cursor:"not-allowed"}:{cursor:"pointer"}}> Order</span>
                        </StripeCheckout>
                        </div>
                    </div>
                </div>
                </div>
                <div class="card col-sm-12 col-md-4" style={{padding:"10px"}} onClick={()=>{setamount({amount:6000})}}>
                    <div style={{border:"1px solid #eee"}}>
                        <img class="card-img-top" src="/assets/images/Golden.png" alt="silver package"/>
                        <div class="card-body" style={{padding:"10px"}}>
                        <h3 class="card-title">Golden Package</h3>
                        <p class="card-text">
                            <ul>
                                <li>SEO in Search Page</li>
                                <li>No Finalized Fees</li>
                                <li>Product Show on Home Page </li>
                                <li>Recommended Products in Newsletters</li>
                                <li>Products limit increased upto 15 Products</li>
                                <li>48 Hour Completed Orders Payment</li>
                                <li>Only in 6,000PKR/= Monthly</li>
                            </ul>
                        </p>
                         
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <StripeCheckout stripeKey={key} token={onToken} amount={6000*duration} currency="USD" locale='auto'>
                            <span className="btn btn-dark btn-block btn-rounded" style={duration===0?{cursor:"not-allowed"}:{cursor:"pointer"}}> Order</span>
                        </StripeCheckout></div>
                    </div>
                </div>
                </div>
                <div class="card col-sm-12 col-md-4" style={{padding:"10px"}} onClick={()=>{setamount({amount:10000})}}>
                    <div style={{border:"1px solid #eee"}}>
                        <img class="card-img-top" src="/assets/images/Diamond.png" alt="silver package"/>
                        <div class="card-body" style={{padding:"10px"}}>
                        <h3 class="card-title">Diamond Package</h3>
                        <p class="card-text">
                            <ul>
                                <li>SEO in Search Page</li>
                                <li>No Finalized Fees</li>
                                <li>Product Show on Home Page </li>
                                <li>Product will show on banners and adversitement</li>
                                <li>Recommended Products in Newsletters</li>
                                <li>Products limit increased upto 30 Products</li>
                                <li>48 Hour Completed Orders Payment</li>
                                <li>Only in 10,000PKR/= Monthly</li>
                            </ul>
                        </p>
                        
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <StripeCheckout stripeKey={key} token={onToken} amount={10000*duration} currency="USD" locale='auto'>
                            <span className="btn btn-dark btn-block btn-rounded" style={duration===0?{cursor:"not-allowed"}:{cursor:"pointer"}}> Order</span>
                        </StripeCheckout>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
  )
}

export default BuyLicense