import React,{useState,useEffect} from 'react';
import _ from 'lodash'
import { useLocation} from "react-router-dom";
import { publicRequest } from '../../RequestMethods';
import {Link} from 'react-router-dom'

function Products() {
    const [num, setnum] = useState(1);
    const [url, seturl] = useState([]);
    const [products, setproducts] = useState([]);
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    useEffect(()=>{
        const getdata = async()=>{
            if(!cat){
                const data = await publicRequest.get("/product/"+num);
                setproducts(data.data);
            }else{
                const data = await publicRequest.get("/product/search/"+_.lowerCase(cat)+"/"+num);
                setproducts(data.data);
            }
        }
        getdata();
    },[cat,num])
    
    useEffect(()=>{
        if(location.pathname.split("/")[3]){
        setnum(location.pathname.split("/")[3])}
        else{setnum(1)};
        seturl(location.pathname.split("/"));
    },[location.pathname])
  return (
    <div className="page-content mt-10 mb-10">
        <div className="container-fluid">
            <div className="shop-content">
                <div className="main-content container">
                    <div className="sticky-content-wrapper" style={{height: "58px"}}>
                        <h3>{products[0]?`Showing Result for ${cat||"All"}`:"Nothing Found"}</h3>
                        {!products[0]&&<Link to="/" className='btn btn-dark'>Go Home</Link>}
                    </div>
                    <div className="product-wrapper row cols-xl-2 cols-sm-1 cols-xs-2 cols-1">
                        {products?.map((product,n)=>(
                        <div key={n} className="product product-list hover-shadow">
                            <figure className="product-media">
                                <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())}>
                                    <img src={product.image?.toString()} alt="Product" width="330" height="338"/>
                                </Link>
                                <div className="product-action-vertical">
                                    <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())} className="btn-product-icon btn-quickview w-icon-search" title="Quick View"></Link>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="product-cat">
                                    <Link to={process.env.PUBLIC_URL+"/products/"+_.kebabCase(product.cat?.toString())}>{product.cat}</Link>
                                </div>
                                <h4 className="product-name">
                                    <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())}>{product.title?.toString()}</Link>
                                </h4>
                                <div className="product-price">{"RS "+product.lowPrice?.toString()}</div>
                                <div className="product-desc">
                                    {product.descrip?.slice(0,100)+"…"}
                                </div>
                                <div className="product-action">
                                    <Link to={"/product/"+product.creatorid?.toString()+"/"+_.kebabCase(product.title?.toString())} className="btn-product btn-cart" title="Add to Cart"><i className="w-icon-cart"></i>Select Options</Link>
                                    </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="toolbox toolbox-pagination justify-content-between mt-10" style={{display:"block"}}>
                        <p className="showing-info mb-2 mb-sm-0"  style={{display:"inline-flex"}}>
                            Showing<span>&nbsp;10&nbsp;</span>Products
                        </p>
                        <ul className="pagination"  style={{display:"inline-flex",float:"right"}}>
                            <li className="page-item active">
                                <Link className="page-link" to={`${url[0]}/${url[1]}/${url[2]}/1`}>1</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={`${url[0]}/${url[1]}/${url[2]}/2`}>2</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={`${url[0]}/${url[1]}/${url[2]}/3`}>3</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={`${url[0]}/${url[1]}/${url[2]}/4`}>4</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to={`${url[0]}/${url[1]}/${url[2]}/5`}>5</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products