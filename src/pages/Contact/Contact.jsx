import React,{useState} from 'react'
import {publicRequest} from './../../RequestMethods'
function Contact() {
    const [data,setdata] = useState({});
    const post = async(e)=>{
        e.preventDefault();
        const res = await publicRequest.post("/functionality/contact",{...data});
        res.data?alert("Succesful Message"):alert("Message Failed");
    }
    const handlechange = (e)=>{
        e.preventDefault();
        setdata((prev) => {
            return { ...prev, [e.target.name]: e.target.value }});
        console.log(data);
    }
  return (
    <div className="page-content contact-us">
        <div className="container" style={{marginTop: "50px"}}>
            <section className="content-title-section mb-10">
                <h3 className="title title-center mb-3">Contact
                    Information
                </h3>
                <p className="text-center">Lorem ipsum dolor sit amet,
                    consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut</p>
            </section>
            <section className="contact-information-section mb-10">
                <div className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                    'spaceBetween': 20,
                    'slidesPerView': 1,
                    'breakpoints': {
                        '480': {
                            'slidesPerView': 2
                        },
                        '768': {
                            'slidesPerView': 3
                        },
                        '992': {
                            'slidesPerView': 4
                        }
                    }
                }">
                    <div className="swiper-wrapper " id="swiper-wrapper-aa2fe99193e8864a" aria-live="polite">
                        <div className="swiper-slide icon-box text-center icon-box-primary swiper-slide-active" role="group" aria-label="1 / 4" style={{width: "295px", marginRight: "20px"}}>
                            <span className="icon-box-icon icon-email">
                                <i className="w-icon-envelop-closed"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title">E-mail Address</h4>
                                <p>mail@example.com</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box text-center icon-box-primary swiper-slide-next" role="group" aria-label="2 / 4" style={{width: "295px", marginRight: "20px"}}>
                            <span className="icon-box-icon icon-headphone">
                                <i className="w-icon-headphone"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title">Phone Number</h4>
                                <p>(123) 456-7890 / (123) 456-9870</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box text-center icon-box-primary" role="group" aria-label="3 / 4" style={{width: "295px", marginRight: "20px"}}>
                            <span className="icon-box-icon icon-map-marker">
                                <i className="w-icon-map-marker"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title">Address</h4>
                                <p>Lawrence, NY 11345, USA</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box text-center icon-box-primary" role="group" aria-label="4 / 4" style={{width: "295px", marginRight: "20px"}}>
                            <span className="icon-box-icon icon-fax">
                                <i className="w-icon-fax"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title">Fax</h4>
                                <p>1-800-570-7777</p>
                            </div>
                        </div>
                    </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
            </section>

            <hr className="divider mb-10 pb-1"/>

            <section className="contact-section">
                <div className="row gutter-lg pb-3">
                    <div className="col-lg-6 mb-8">
                        <h4 className="title mb-3">People usually ask these</h4>
                        <div className="accordion accordion-bg accordion-gutter-md accordion-border">
                            <div className="card">
                                <div className="card-header" style={{marginBottom:"5px",padding:"10px",backgroundColor:"#eee"}}>
                                    <a href="#collapse1" className="expand">How can I cancel my order?</a>
                                </div>
                                <div id="collapse1" className="card-body collapsed" style={{display: "none"}}>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid 
                                        idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler 
                                        isque felis. Vel pretium.
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{marginBottom:"5px",padding:"10px",backgroundColor:"#eee"}}>
                                    <a href="#collapse2" className="expand">Why is my registration delayed?</a>
                                </div>
                                <div id="collapse2" className="card-body collapsed" style={{display: "none"}}>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid 
                                        idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler 
                                        isque felis. Vel pretium.
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{marginBottom:"5px",padding:"10px",backgroundColor:"#eee"}}>
                                    <a href="#collapse3" className="expand">What do I need to buy products?</a>
                                </div>
                                <div id="collapse3" className="card-body collapsed" style={{display: "none"}}>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid 
                                        idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler 
                                        isque felis. Vel pretium.
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{marginBottom:"5px",padding:"10px",backgroundColor:"#eee"}}>
                                    <a href="#collapse4" className="expand">How can I track an order?</a>
                                </div>
                                <div id="collapse4" className="card-body collapsed" style={{display: "none"}}>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid 
                                        idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler 
                                        isque felis. Vel pretium.
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{marginBottom:"5px",padding:"10px",backgroundColor:"#eee"}}>
                                    <a href="#collapse5" className="expand">How can I get money back?</a>
                                </div>
                                <div id="collapse5" className="card-body collapsed" style={{display: "none"}}>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        temp orincid idunt ut labore et dolore magna aliqua. Venenatis tellus in
                                        metus vulp utate eu sceler isque felis. Vel pretium.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-8">
                        <h4 className="title mb-3">Send Us a Message</h4>
                        <form className="form contact-us-form" action="#" method="post">
                            <div className="form-group">
                                <label htmlFor="username">Your Name</label>
                                <input type="text" id="username" name="name" className="form-control" onChange={handlechange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_1">Your Email</label>
                                <input type="email" id="email_1" name="email" className="form-control"  onChange={handlechange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea id="message" cols="30" rows="5" className="form-control" name="description" onChange={handlechange}></textarea>
                            </div>
                            <span className="btn btn-dark btn-rounded" onClick={post}>Send Now</span>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Contact