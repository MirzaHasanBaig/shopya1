import React from 'react'

function Count() {
  return (
    <section className="count-section mb-10 pb-5">
                        <div className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                            'slidesPerView': 1,
                            'breakpoints': {
                                '768': {
                                    'slidesPerView': 2
                                },
                                '992': {
                                    'slidesPerView': 3
                                }
                            }
                        }">
                            <div className="swiper-wrapper " id="swiper-wrapper-17ac64cbb758d86c" aria-live="polite" style={{transitionDuration: "0ms", transform: "translate3d(0px, 0px, 0px)"}}>
                                <div className="swiper-slide counter-wrap swiper-slide-active" role="group" aria-label="1 / 3" style={{width: "362.667px"}}>
                                    <div className="counter text-center" >
                                        <span className="count-to complete" data-to="15" style={{fontSize:"28px",color:"black"}}>15</span>
                                        <span style={{fontSize:"28px",color:"black"}}>M+</span>
                                        <h4 className="title title-center">Products For Sale</h4>
                                        <p>Diam maecenas ultricies mi eget mauris<br/>
                                            Nibh tellus molestie nunc non</p>
                                    </div>
                                </div>
                                <div className="swiper-slide counter-wrap swiper-slide-next" role="group" aria-label="2 / 3" style={{width: "362.667px"}}>
                                    <div className="counter text-center">
                                        <span style={{fontSize:"28px",color:"black"}}>$</span>
                                        <span className="count-to complete" data-to="25" style={{fontSize:"28px",color:"black"}}>25</span>
                                        <span style={{fontSize:"28px",color:"black"}}>B+</span>
                                        <h4 className="title title-center">Community Earnings</h4>
                                        <p>Diam maecenas ultricies mi eget mauris<br/>
                                            Nibh tellus molestie nunc non</p>
                                    </div>
                                </div>
                                <div className="swiper-slide counter-wrap" role="group" aria-label="3 / 3" style={{width: "362.667px"}}>
                                    <div className="counter text-center">
                                        <span className="count-to complete" data-to="100" style={{fontSize:"28px",color:"black"}}>100</span>
                                        <span style={{fontSize:"28px",color:"black"}}>M+</span>
                                        <h4 className="title title-center">Growing Buyers</h4>
                                        <p>Diam maecenas ultricies mi eget mauris<br/>
                                            Nibh tellus molestie nunc non</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" style={{display: "none"}}><span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex="0" role="button" aria-label="Go to slide 1"></span></div>
                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                    </section>
  )
}

export default Count