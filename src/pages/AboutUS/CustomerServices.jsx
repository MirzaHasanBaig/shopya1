import React from 'react';

function CustomerServices() {
  return (
        <section className="customer-service mb-7">
            <div className="row align-items-center">
                <div className="col-md-6 pr-lg-8 mb-8">
                    <h2 className="title text-left">We Provide Continuous &amp; Kind Service for Customers</h2>
                    <div className="accordion accordion-simple accordion-plus">
                        <div className="card border-no" style={{margin:"10px 0px"}}>
                            <div className="card-header">
                                <a href="#collapse3-1" className="expand" style={{fontSize:"16px",color:"black"}}>Customer Service <i className="fa fa-caret-down" aria-hidden="true"></i></a>
                            </div>
                            <div className="card-body collapsed" id="collapse3-1" style={{display: "none"}}>
                                <p className="mb-0">
                                    Lorem ipsum dolor sit eiusamet, consectetur adipiscing elit,
                                    sed do eius mod tempor incididunt ut labore
                                    et dolore magna aliqua. Venenatis tell
                                    us in metus vulputate eu scelerisque felis. Vel pretium vulp.
                                </p>
                            </div>
                        </div>
                        <div className="card" style={{margin:"10px 0px"}}>
                            <div className="card-header">
                                <a href="#collapse3-2" className="expand" style={{fontSize:"16px",color:"black"}}>Online Consultation <i className="fa fa-caret-down" aria-hidden="true"></i></a>
                            </div>
                            <div className="card-body collapsed" id="collapse3-2" style={{display: "none"}}>
                                <p className="mb-0">
                                    Lorem ipsum dolor sit eiusamet, consectetur adipiscing elit,
                                    sed do eius mod tempor incididunt ut labore
                                    et dolore magna aliqua. Venenatis tell
                                    us in metus vulputate eu scelerisque felis. Vel pretium vulp.
                                </p>
                            </div>
                        </div>
                        <div className="card" style={{margin:"10px 0px"}}>
                            <div className="card-header">
                                <a href="#collapse3-3" className="expand" style={{fontSize:"16px",color:"black"}}>Sales Management <i className="fa fa-caret-down" aria-hidden="true"></i></a>
                            </div>
                            <div className="card-body collapsed" id="collapse3-3" style={{display: "none"}}>
                                <p className="mb-0">
                                    Lorem ipsum dolor sit eiusamet, consectetur adipiscing elit,
                                    sed do eius mod tempor incididunt ut labore
                                    et dolore magna aliqua. Venenatis tell
                                    us in metus vulputate eu scelerisque felis. Vel pretium vulp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-8">
                    <figure className="br-lg">
                        <img src="assets/images/pages/about_us/2.jpg" alt="Banner" width="610" height="500" style={{backgroundColor: "#CECECC"}}/>
                    </figure>
                </div>
            </div>
        </section>
  )
}

export default CustomerServices