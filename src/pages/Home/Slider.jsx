import React from 'react'
import { Link } from 'react-router-dom';

function Slider(props) {
  return (
    <section className="intro-section">
<div className="swiper-container swiper-theme nav-inner pg-inner swiper-nav-lg animation-slider pg-xxl-hide nav-xxl-show nav-hide swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
 'slidesPerView': 1,
 'autoplay': {
 'delay': 8000,
 'disableOnInteraction': false
 }
 }">
<div id="swiper-wrapper-957510e187da29587" className="swiper-wrapper" style={{transform: "translate3d(-3196px, 0px, 0px)", transitionDuration: "0ms"}}>
  {props.images?.map((img,n)=>(
<div key={n} className="swiper-slide banner banner-fixed intro-slide intro-slide1" style={{backgroundImage: "url('assets/images/demos/demo1/sliders/slide-1.jpg')", backgroundColor: "#ebeef2", width: "1598px"}}>
<div className="container">
<figure className="slide-image skrollable slide-animate"><img className="skrollable skrollable-between" style={{transform: "translateY(-2.92213vh)"}} src={img.image||"Not found"} alt="Banner" width="474" height="397" data-bottom-top="transform: translateY(10vh);" data-top-bottom="transform: translateY(-10vh);" /></figure>
<div className="banner-content y-50 text-right">
<h5 className="banner-subtitle font-weight-normal text-default ls-50 lh-1 mb-2 slide-animate" data-animation-options="{
 'name': 'fadeInRightShorter',
 'duration': '1s',
 'delay': '.2s'
 }"><span className="p-relative d-inline-block">{img.title||"Not found"}</span></h5>
<h3 className="banner-title font-weight-bolder ls-25 lh-1 slide-animate" data-animation-options="{
 'name': 'fadeInRightShorter',
 'duration': '1s',
 'delay': '.4s'
 }">{img.desc||"Not found"}</h3>
<p className="font-weight-normal text-default slide-animate" data-animation-options="{
 'name': 'fadeInRightShorter',
 'duration': '1s',
 'delay': '.6s'
 }"><span className="font-weight-bolder text-secondary">{img.tag||"Not found"}</span></p>
<Link className="btn btn-dark btn-outline btn-rounded btn-icon-right slide-animate" to={img.link||"/not-found"} data-animation-options="{
 'name': 'fadeInRightShorter',
 'duration': '1s',
 'delay': '.8s'
 }">SHOP NOW</Link></div>
</div>
</div>
  ))}
</div>
<div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"> </div>
<button className="swiper-button-next swiper-button-disabled" tabIndex="-1" disabled="disabled">next</button> <button className="swiper-button-prev" tabIndex="0">prev</button></div>
</section>
  )
}

export default Slider