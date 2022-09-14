import React,{useEffect,useState} from 'react';
import {publicRequest} from './../../RequestMethods'

function MobileWrapper() {
  
  const url = "#";
  const [cat, setcat] = useState([]);
  useEffect(() => {
    const getdata = async()=>{
      const res = await publicRequest.get("/categories");
      setcat(res.data);
    }
    getdata();
  }, []);
  return (
        <div className="mobile-menu-wrapper">
        <div className="mobile-menu-overlay"> </div>
        <div className="mobile-menu-container scrollable"><form className="input-wrapper" action="#" method="get"><input className="form-control" autoComplete="off" name="search" required="" type="text" placeholder="Search" /> <button className="btn btn-search" type="submit"> </button></form>
        <div className="tab">
        <ul className="nav nav-tabs">
        <li className="nav-item"><a className="nav-link active" href="#main-menu">Main Menu</a></li>
        <li className="nav-item"><a className="nav-link" href="#categories">Categories</a></li>
        </ul>
        </div>
        <div className="tab-content">
        <div id="main-menu" className="tab-pane active">
        <ul className="mobile-menu">
        <li><a href='/'>Home</a></li>
        <li><a href="/account">account</a></li>
        <li><a href="/login">login & Register</a></li>
        <li><a href="/products">Searching Prodcut</a></li>
        <li><a href="/cart">cart</a></li>
        <li><a href="/checkout">checkout</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
        </ul>
        </div>
        <div id="categories" className="tab-pane">
        <ul className="mobile-menu">
          {cat?.map((cate,n)=>(
        <li key={n}><a href={"/products/"+(cate.name||"not-found")} >{cate.name||"not-found"}</a>
        <ul>
          {cate.subcategories?.map((scate,i)=>(
            <li key={i}><a href={"/products/"+(scate||"not-found")}>{scate||"not-found"}</a></li>
          ))}
        </ul>
        </li>
          ))}
        </ul>
        </div>
        </div>
        </div>
        </div>
  )
}

export default MobileWrapper