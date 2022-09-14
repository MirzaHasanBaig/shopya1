import React,{Suspense} from 'react'
import {Switch, Route } from 'react-router-dom';
const Login = React.lazy(() => import('../../pages/Login/Login'));
const OrderRedirect = React.lazy(() => import('../../pages/AboutUS/OrderRedirect/OrderRedirect'));
const Home = React.lazy(() => import('../../pages/Home/Home'));
const Error = React.lazy(() => import( '../../pages/Error/Error'));
const AboutUs = React.lazy(() => import( '../../pages/AboutUS/AboutUs'));
const Contact = React.lazy(() => import( '../../pages/Contact/Contact'));
const BecomeVendor = React.lazy(() => import( '../../pages/BecomeVendor/BecomeVendor'));
const Cart = React.lazy(() => import( '../../pages/Cart/Cart'));
const Checkout = React.lazy(() => import( '../../pages/CheckOut/Checkout'));
const Account = React.lazy(() => import( '../../pages/Account/Account'));
const Store = React.lazy(() => import( '../../pages/Store/Store'));
const Product = React.lazy(() => import( '../../pages/Product/Product'));
const Products = React.lazy(() => import( '../../pages/Products/Products'));
const Blog = React.lazy(() => import( '../../pages/Blog/Blog'));

function Body() {

  return (
    <main className="main">
      <Suspense fallback={<div style={{color:"black"}}>Loading</div>}>
        <Switch>
          <Route path={"/"} exact><Home/></Route>
          <Route path={"/about-us"} exact><AboutUs/></Route>
          <Route path={"/contact-us"} exact><Contact/></Route>
          <Route path={"/become-vendor"} exact><BecomeVendor/></Route>
          <Route path={"/cart"} exact><Cart/></Route>
          <Route path={"/checkout"} exact><Checkout/></Route>
          <Route path={"/account"}><Account/></Route>
          <Route path={"/store/:id"} exact><Store/></Route>
          <Route path={"/product/:id/:name"} exact><Product/></Route>
          <Route path={"/products"}><Products/></Route>
          <Route path={"/blog/:id"} exact><Blog/></Route>
          <Route path={"/login"} exact><Login/></Route>
          <Route path={"/orderinfo"} exact><OrderRedirect/></Route>
          <Route path="*" exact><Error/></Route>
        </Switch>
      </Suspense>
    </main>
  )
}

export default Body