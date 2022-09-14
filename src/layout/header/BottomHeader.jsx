import React  from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector} from "react-redux";
import {publicRequest} from './../../RequestMethods'

function Bottomheader() {
  const {currentUser} = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);
  const [cate, setcate] = useState([]);



  useEffect(() => {
    const getdata = async()=>{
      const res = await publicRequest.get("/categories");
      setcate(res.data);
    }
    getdata();
  }, []);
  return (
    <div className="sticky-content-wrapper">
<div className="header-bottom sticky-content fix-top sticky-header">
<div className="container">
<div className="inner-wrap">
<div className="header-left">
<div className="dropdown category-dropdown has-border" data-visible="true" onMouseOver={()=>{setDrop(true)}} onMouseLeave={()=>{setDrop(false)}}>
<a href="!#" className="category-toggle" title="Browse Categories hov-col-black" style={{cursor:"pointer"}} data-toggle="dropdown" data-display="static"> Browse Categories </a>
{drop&&
<div className="dropdown-box">
<ul className="menu vertical-menu category-menu">
  {cate?.map((scate,n)=>(
<li className="has-submenu" key={n}><Link to={"/products/"+(scate.name||"Not Found")}> {scate.name||"Not Found"} </Link>
<ul className="megamenu">
<li>
<h4 className="menu-title">{scate.name||"Not Found"}</h4>
<hr className="divider" />
<ul>
{scate.subcategories?.map((sscate,n)=>
<li key={n}><Link to={"/products/"+(sscate||"NF")}>{sscate}</Link></li>
  )}
</ul>
</li>
<li>
<div className="menu-banner banner-fixed menu-banner3">
<figure style={{display:"block"}}>
  <Link to={"/products/"+(scate.name||"Not Found")}>
  <img src={scate.image||"/assets/images/menu/banner-3.jpg"} alt={scate.name||"Not Found"} style={{height:"550px",width:"auto"}} />
  </Link>
</figure>
<div className="banner-content">
</div>
</div>
</li>
</ul>
</li>
  ))}
<li><a href="!#" className="font-weight-bold text-primary text-uppercase ls-25" onClick={()=>{setDrop(false)}} style={{cursor:"pointer"}}> Close Me </a></li>
</ul>
</div>
}
</div>
<nav className="main-nav">
<ul className="menu active-underline">
<li><Link to="/">Home</Link></li>
{cate?.slice(0,5).map((scate,n)=>(
<li key={n}><Link to={"/products/"+scate.name?.toString()}>{scate.name||"Not Found"}</Link></li>
))}
{currentUser&&<li><Link to={"/store/"+currentUser.username}>Store</Link></li>}
</ul>
</nav></div>
<div className="header-right">
  {currentUser?<Link to="/account">My Account</Link>:<Link to="/login">Login</Link>}
 </div>
</div>
</div>
</div>
</div>
  )
}

export default Bottomheader