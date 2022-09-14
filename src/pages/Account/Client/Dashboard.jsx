import React from 'react'
import _ from 'lodash'
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import {logOut} from '../../../redux/APICall';

function Dashboard(props) {
    const {change} = props;
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let history = useHistory();
    
const logout = async(e) => {
    e.preventDefault();
    dispatch(logOut);
    history.push("/");
}
  return (
    <div>
        <h3 className="greeting">
            Hello!&nbsp;
            <span className="text-dark font-weight-bold">{_.upperCase(currentUser.username)}</span>
        </h3>

        <p className="mb-4">
            From your account dashboard you can view your <a href="#account-orders" className="text-primary link-to-tab">recent orders</a>,
            manage your shipping
                and billing
                addresses, and
            <a href="#account-details" className="text-primary link-to-tab">edit your password and
                account details.</a>
        </p>

        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <a href="#account-orders" className="link-to-tab">
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-orders">
                            <i className="w-icon-orders"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={()=>{change("orders")}}>Orders</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <a href="#account-sell" className="link-to-tab">
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-download">
                            <i className="w-icon-download"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={()=>{props.change("sells")}}>Sells</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <a href="#products" className="link-to-tab">
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-address">
                            <i className="w-icon-map-marker"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={()=>{change("products")}}>Products</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <a href="#account-details" className="link-to-tab">
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-account">
                            <i className="w-icon-user"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={()=>{change("account-details")}}>Account Details</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <a href="#withdraw" className="link-to-tab">
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-wishlist">
                            <i className="w-icon-heart"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={()=>{props.change("add-product")}}>Add Product</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                <span style={{cursor:"pointer"}}>
                    <div className="icon-box text-center">
                        <span className="icon-box-icon icon-logout">
                            <i className="w-icon-logout"></i>
                        </span>
                        <div className="icon-box-content">
                            <p className="text-uppercase mb-0" onClick={logout} >Logout</p>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Dashboard