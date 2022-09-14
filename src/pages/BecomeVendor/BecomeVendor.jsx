import React from 'react'

function BecomeVendor() {
  return (
    <div className="page-content become-a-vendor">
        <div className="how-trade ">
            <div className="container mt-2 mt-lg-10 mb-0 mb-lg-10">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <figure className="br-sm">
                            <img src="assets/images/pages/become/2.jpg" alt="Banner" width="610" height="520" style={{backgroundColor: "#C9C8CD"}}/>
                        </figure>
                    </div>
                    <div className="col-lg-6 pl-lg-8">
                        <h2 className="text-primary font-weight-bold ls-25">How to Trade</h2>
                        <h2 className="title text-left">Easy 4 steps to manage your products selling</h2>
                        <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod metus vul
                            tempor incididunt ut labore et dolore magna aliqua. Venen ate.</p>
                        <div className="row cols-sm-2 mb-1">
                            <div className="stage-item mb-6 stage-register d-flex align-items-center">
                                <i className="fa fa-user" aria-hidden="true" style={{fontSize:"28px",margin:"0px 10px"}}></i>
                                <p className="mb-0 font-weight-bold">Register and List Your Products</p>
                            </div>
                            <div className="stage-item mb-6 stage-selling d-flex align-items-center">
                                <i className="fa fa-tasks" aria-hidden="true" style={{fontSize:"28px",margin:"0px 10px"}}></i>
                                <p className="mb-0 font-weight-bold">Start Selling Your Products</p>
                            </div>
                            <div className="stage-item mb-5 stage-deliver d-flex align-items-center">
                                <i className="fa fa-truck" aria-hidden="true" style={{fontSize:"28px",margin:"0px 10px"}}></i>
                                <p className="mb-0 font-weight-bold">Deliver your Products Everywhere</p>
                            </div>
                            <div className="stage-item mb-5 stage-get d-flex align-items-center">
                                <i className="fa fa-university" aria-hidden="true" style={{fontSize:"28px",margin:"0px 10px"}}></i>
                                <p className="mb-0 font-weight-bold">Get Payments and Increase your Income</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-grey container few-fees mt-10 mb-2 mb-lg-10 pt-2 pt-lg-9">
            <h2 className="text-center text-primary text-capitalize font-weight-bold ls-25">Only Few Fees</h2>
            <h2 className="title title-center mb-3">All is secured and Transparent</h2>
            <p className="text-center mb-2">Nunc id cursus metus aliquam. Libero id faucibus nisl tincidunt eget.</p>
            <div className="row">
                <div className="col-sm-6 listing-fee">
                    <div className="counter text-center">
                        <span style={{fontSize:"28px"}}>$</span>
                        <span className="count-to complete" data-to="0" style={{fontSize:"28px"}}>0</span>
                        <h4>Listing Fee</h4>
                        <p>Diam maecenas ultricies mi eget mauris
                            Nibh tellus molestie nunc non</p>
                    </div>
                </div>
                <div className="col-sm-6 final-fee">
                    <div className="counter text-center">
                        <span className="count-to complete" data-to="5" style={{fontSize:"28px"}}>5</span>
                        <span style={{fontSize:"28px"}}>%</span>
                        <h4>Final Value Fee</h4>
                        <p>Diam maecenas ultricies mi eget mauris
                            Nibh tellus molestie nunc non</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container questions mt-2 mt-lg-10 mb-5 mb-lg-9">
            <h2 className="text-center text-primary font-weight-bold text-capitalize ls-25">Frequently Asked Questions</h2>
            <h2 className="title title-center">Find an answer to your Question</h2>
            <div className="row">
                <div className="col-md-6">
                    <h4 className="font-weight-bold ls-25">How can I add new products?</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu
                        scelerisquefelis. Vel pretium lectus quam id leo in vitae turpis massa. </p>
                    <h4 className="font-weight-bold ls-25">How can I know stock?</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Venenatis tellus.</p>
                </div>
                <div className="col-md-6">
                    <h4 className="font-weight-bold ls-25">How do I get paid?</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu
                        scelerisquefelis. </p>
                    <h4 className="font-weight-bold ls-25">Do I need a credit or debit card to create a shop?</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. </p>
                </div>
            </div>
        </div>

        <div className="banner parallax" data-parallax-options="{'speed': 10, 'parallaxHeight': '200%', 'offset': -99}" data-image-src="assets/images/pages/become/3.jpg" style={{backgroundColor: "rgb(146, 146, 148)", position: "relative", overflow: "hidden"}}><div className="parallax-background" style={{backgroundImage: "url(&quot;assets/images/pages/become/3.jpg&quot;)", backgroundSize: "cover", position: "absolute", top: "0px", left: "0px", width: "100%", height: "200%", transform: "translate3d(0px, -295.383px, 0px)", backgroundPositionX: "50%"}}></div>
            <div className="container" style={{padding:"50px"}}>
                <div className="banner-content text-center">
                    <h2 className="title title-center text-white font-weight-bold">Let’s talk about how we can make
                            brands work for you</h2>
                    <a href="!#" className="btn btn-white btn-outline btn-rounded ls-25">Register Now</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BecomeVendor