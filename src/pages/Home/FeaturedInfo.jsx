import React from 'react'

function FeaturedInfo() {
  return (
<div className='container'>
<div className="swiper-container appear-animate icon-box-wrapper br-sm mt-6 mb-6 swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}} data-swiper-options="{
                    'slidesPerView': 1,
                    'loop': false,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 2
                        },
                        '768': {
                            'slidesPerView': 3
                        },
                        '1200': {
                            'slidesPerView': 4
                        }
                    }
                }">
<div id="swiper-wrapper-aa362da641d1036410" className="swiper-wrapper " style={{transitionDuration: "0ms", transform: "translate3d(0px, 0px, 0px)"}}>
<div className="swiper-slide icon-box icon-box-side icon-box-primary swiper-slide-active" style={{width: "309.5px"}}>
<div className="icon-box-content">
<h4 className="icon-box-title font-weight-bold mb-1">Free Shipping &amp; Returns</h4>
<p className="text-default">For all orders over 50000PKR/=</p>
</div>
</div>
<div className="swiper-slide icon-box icon-box-side icon-box-primary swiper-slide-next" style={{width: "309.5px"}}>
<div className="icon-box-content">
<h4 className="icon-box-title font-weight-bold mb-1">Secure Payment</h4>
<p className="text-default">We ensure secure payment</p>
</div>
</div>
<div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-money" style={{width: "309.5px"}}>
<div className="icon-box-content">
<h4 className="icon-box-title font-weight-bold mb-1">Money Back Guarantee</h4>
<p className="text-default">Any back within 10 days</p>
</div>
</div>
<div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-chat" style={{width: "309.5px"}}>
<div className="icon-box-content">
<h4 className="icon-box-title font-weight-bold mb-1">Customer Support</h4>
<p className="text-default">Call or email us 24/7</p>
</div>
</div>
</div>
</div>
    </div>
  )
}

export default FeaturedInfo