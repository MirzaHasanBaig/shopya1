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
const AllOrders = React.lazy(() => import('./All-Orders'));
const AllProducts = React.lazy(() => import('./All-Products'));
const AllUsers = React.lazy(() => import('./All-Users'));
const AllBlogs = React.lazy(()=>import('./All-Blogs'));
const Setup = React.lazy(()=>import('./Setup'));
const Messgaes = React.lazy(()=>import('./Messages'));

function Admin() {

    const [tab,settab] = useState("dashboard");
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let history = useHistory();
    !currentUser&&history.push("/login");
    
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
                        <a href="#account-orders" className="nav-link" onClick={()=>{settab("allorders")}}>All Orders</a>
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
                        <a href="#products" className="nav-link" onClick={()=>{settab("allproducts")}}>All Products</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="nav-link" onClick={()=>{settab("products")}}>My Products</a>
                    </li>
                    <li className="nav-item">
                        <a href="#products" className="nav-link" onClick={()=>{settab("allusers")}}>All Users</a>
                    </li>
                    <li className="nav-item">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("all-blogs")}}>All Blogs</a>
                    </li>
                    <li className="nav-item">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("buy-license")}}>Verify License</a>
                    </li>
                    <li className="nav-item">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("setup")}}>Setup</a>
                    </li>
                    <li className="messages">
                        <a href="#buy-license" className="nav-link" onClick={()=>{settab("messages")}}>Messgaes</a>
                    </li>
                    <li className="nav-item">
                        <a href="login.html" className="nav-link" onClick={logout} >Logout</a>
                    </li>
                </ul>
                <div className="tab-content mb-6">    
                    <Suspense fallback={<div style={{color:"black"}}>Loading</div>}>
                        {
                            tab==="all-blogs"?
                            <AllBlogs/>:
                            tab==="allusers"?
                            <AllUsers/>:
                            tab==="dashboard"?
                            <Dashboard/>:
                            tab==="allproducts"?
                            <AllProducts/>
                            :tab==="allorders"?
                            <AllOrders/>:tab==="orders"?
                            <Orders/>
                            :tab==="sells"?
                            <Sells/>
                            :tab==="account-details"?
                            <AccountDetails/>
                            :tab==="add-product"?
                            <AddProducts/>
                            :tab==="products"?
                            <Products/>
                            :tab==="setup"?
                            <Setup/>
                            :tab==="messages"?
                            <Messgaes/>
                            :<BuyLiencse/>
                        }
                    </Suspense>
                </div>
            </div>
        </div>
  )
}

export default Admin