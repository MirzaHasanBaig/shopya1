import React,{Suspense,useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import {logOut} from '../../../redux/APICall';
const Orders = React.lazy(() => import('./Orders'));
const AccountDetails = React.lazy(() => import('./Account-Details'));
const AddProducts = React.lazy(() => import('./Add-Product'));
const BuyLiencse = React.lazy(() => import('./Buy-License'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const Products = React.lazy(() => import('./Products'));
const Sells = React.lazy(() => import('./Sells'));
const Message = React.lazy(() => import('./Message'));

function Admin() {
    const {currentUser} = useSelector((state) => state.user);
    let history = useHistory();
    !currentUser&&history.push("/login");
    const dispatch = useDispatch();
    const [tab,settab] = useState("dashboard");
    
const logout = (e) => {
    e.preventDefault();
    dispatch(logOut);
    history.push("/");
}
  return (
    <div className="container">
            <div className="tab tab-vertical row gutter-lg">
                <ul className="nav nav-tabs mb-6" role="tablist">
                    <li className="nav-item">
                        <a href="#account-dashboard" className="nav-link active" onClick={()=>{settab("dashboard")}}>Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a href="#account-orders" className="nav-link" onClick={()=>{settab("orders")}}>Buy Orders</a>
                    </li>
                    <li className="nav-item">
                        <a href="#account-sell" className="nav-link" onClick={()=>{settab("sells")}}>Sell Orders</a>
                    </li>
                    <li className="nav-item">
                        <a href="#account-details" className="nav-link" onClick={()=>{settab("account-details")}}>Account details</a>
                    </li>
                    <li className="nav-item">
                        <a href="#add-product" className="nav-link" onClick={()=>{settab("add-product")}}>Add Product</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="nav-link" onClick={()=>{settab("products")}}>Products</a>
                    </li>
                    <li className="nav-item">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("buy-license")}}>Buy License</a>
                    </li>
                    <li className="nav-item">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("message")}}>Register Complain</a>
                    </li>
                    <li className="nav-item">
                        <a href="login.html" className="nav-link" onClick={logout} >Logout</a>
                    </li>
                </ul>
                <div className="tab-content mb-6">    
                    <Suspense fallback={<div style={{color:"black"}}>Loading</div>}>
                        {
                            tab==="dashboard"?
                            <Dashboard change={settab}/>
                            :tab==="orders"?
                            <Orders/>
                            :tab==="sells"?
                            <Sells/>
                            :tab==="account-details"?
                            <AccountDetails/>
                            :tab==="add-product"?
                            <AddProducts/>
                            :tab==="products"?
                            <Products/>
                            :tab==="message"?
                            <Message/>
                            :<BuyLiencse/>
                        }
                    </Suspense>
                </div>
            </div>
        </div>
  )
}

export default Admin