import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {useSelector,useDispatch} from 'react-redux';
import {removeProduct} from '../../redux/CartRedux'

function StickyFooter() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user)
  const {products,total} = useSelector((state)=>state.cart)

  const hanlderemove = async(e)=>{
    const number = e.currentTarget.dataset.number;
    dispatch(removeProduct({number}));
}

  return (
    <div className="sticky-footer sticky-content fix-bottom" style={{padding:"10px 0x"}}>
<p style={{display:"inline-flex",justifyContent:"center"}}><Link to="/">Home</Link></p>
{currentUser&&<>
<p style={{display:"inline-flex",justifyContent:"center"}}><Link to={"/store/"+currentUser._id?.toString()}>Vendor</Link></p>
<p style={{display:"inline-flex",justifyContent:"center"}}><Link to="/account">Account</Link></p>
</>
}
<div className="cart-dropdown dir-up">
<p style={{display:"inline-flex",justifyContent:"flex-end"}}>Cart</p>
<div className="dropdown-box">
<div className="products">
  {products?.map((product,n)=>(
<div className="product product-cart" key={n}>
<div className="product-detail">
<h3 className="product-name"><Link to={process.env.PUBLIC_URL+"/"+product.creatorid?.toString()+"/</td>"+_.kebabCase(product.title?.toString())}>{}</Link></h3>
<div className="price-box"><span className="product-quantity">{product.quantity?.toString()}</span> <span className="product-price">{product.lowPrice?.toString()}</span></div>
</div>
<figure className="product-media"><Link to={process.env.PUBLIC_URL+"/"+product.creatorid?.toString()+"/</td>"+_.kebabCase(product.title?.toString())}>
   <img src={product.image?.toString()} alt="product" width="94" height="84" /> </Link></figure>
<button className="btn btn-link btn-close" data-number={n} onClick={hanlderemove} > </button></div>
))}
</div>
<div className="cart-total"><label>Subtotal:</label> <span className="price">{"RS "+total?.toString()}</span></div>
<div className="cart-action"><Link className="btn btn-dark btn-outline btn-rounded" to="/cart">View Cart</Link> <Link className="btn btn-primary btn-rounded" to="/checkout">Checkout</Link></div>
</div>
</div>
</div>
  )
}

export default StickyFooter