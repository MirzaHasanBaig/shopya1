import React,{useEffect,useState} from 'react'
import {publicRequest} from './../../RequestMethods'
import {useLocation,Link,useHistory} from 'react-router-dom'
import _ from 'lodash'
function Blog() {
    const history = useHistory();
    const url = "";
    const location = useLocation();
    const [blogs,setblogs] = useState([]);
    const [blog,setblog] = useState({});
    useEffect(()=>{
        const getdata = async()=>{
            const Kname = location.pathname.split("/")[2];
            const name = _.lowerCase(Kname);
            const Sblogs = await publicRequest.get(`/functionality/blogs`);
            setblogs(Sblogs.data);
            const Sblog = await publicRequest.get(`/functionality/blog/${name}`);
            !Sblog.data&&history.push("/not-found");
            setblog(Sblog.data);
        } 
        getdata();
    })
  return (
    <div className="page-content mt-8 mb-8">
                <div className="container">
                    <div className="row gutter-lg">
                        <div className="main-content post-single-content">
                            <div className="post post-grid post-single">
                                <figure className="post-media br-sm">
                                    <img src={blog.image||"/assets/images/blog/single/1.jpg"} alt="Blog" width="930" height="500"/>
                                </figure>
                                <div className="post-details">
                                    <div className="post-meta">
                                        by <Link to={"/store/"+blog.creatorId?.toString()} className="post-author">{blog.creatorId||"User Not Found"}</Link>
                                        - <a href={url} className="post-date">{blog.Date||"Date Not Found"}</a>
                                    </div>
                                    <div>
                                    {blog.description?.map((spara,n)=>
                                        <p key={n}>{spara}</p>
                                    )||"Not Found"}
                                    </div>
                                </div>
                            </div>
                            <div className="tags">
                                <label className="text-dark mr-2">Tags:</label>
                                {
                                    blog.tag?.map((tag,n)=>(<Link key={n} to={"/products/"+tag} className="tag">{tag}</Link>))||
                                    <>
                                    <Link to={"/products/fashion"} className="tag">Fashion</Link>
                                    <Link to={"/products/Style"} className="tag">Style</Link>
                                    <Link to={"/products/Travel"} className="tag">Travel</Link>
                                    <Link to={"/products/Women"} className="tag">Women</Link></>
                                }
                            </div>
                            <h4 className="title title-lg font-weight-bold mt-10 pt-1 mb-5">Related Posts</h4>
                            <div className="swiper">
                                <div className="post-slider swiper-container swiper-theme nav-top pb-2 swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                                    'spaceBetween': 20,
                                    'slidesPerView': 1,
                                    'breakpoints': {
                                        '576': {
                                            'slidesPerView': 2
                                        },
                                        '768': {
                                            'slidesPerView': 3
                                        },
                                        '992': {
                                            'slidesPerView': 2
                                        },
                                        '1200': {
                                            'slidesPerView': 3
                                        }
                                    }
                                }">
                                    <div className="swiper-wrapper " id="swiper-wrapper-b9e2348a7c94299e" aria-live="polite" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                                        {blogs?.slice(0,4).map((Sblogs,n)=>(
                                        <div key={n} className="swiper-slide post post-grid swiper-slide-active" role="group" aria-label={(n+1)+" / 4"} style={{width: "296.667px", marginRight: "20px"}}>
                                            <figure className="post-media br-sm">
                                                <Link to={"/blog/"+_.kebabCase(Sblogs.title)}>
                                                    <img src={Sblogs.image||"/assets/images/blog/single/2.jpg"} alt="Post" width="296" height="190" style={{backgroundColor: "#bcbcb4"}}/>
                                                </Link>
                                            </figure>
                                            <div className="post-details text-center">
                                                <div className="post-meta">
                                                    by <Link to={"/blog/"+_.kebabCase(Sblogs.title)} className="post-author">{Sblogs.creatorId||"title"}</Link>
                                                    - <Link to={"/blog/"+_.kebabCase(Sblogs.title)} className="post-date">{Sblogs.Date||"Date"}</Link>
                                                </div>
                                                <h4 className="post-title mb-3"><Link to={"/blog/"+_.kebabCase(Sblogs.title)}>{(Sblogs.description[0]?.slice(0,30)||"Fashion tell about who you are from")+"..."}</Link></h4>
                                                <Link to={"/blog/"+_.kebabCase(Sblogs.title)} className="btn btn-link btn-dark btn-underline font-weight-normal">Read More<i className="w-icon-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    <button className="swiper-button-next" tabIndex="0" aria-label="Next slide" aria-controls="swiper-wrapper-b9e2348a7c94299e" aria-disabled="false"></button>
                                    <button className="swiper-button-prev swiper-button-disabled" disabled="" tabIndex="-1" aria-label="Previous slide" aria-controls="swiper-wrapper-b9e2348a7c94299e" aria-disabled="true"></button>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                            </div>
                        </div>
                        <aside className="sidebar right-sidebar blog-sidebar sidebar-fixed sticky-sidebar-wrapper">
                            <div className="sidebar-overlay">
                                <a href="!#" className="sidebar-close">
                                    <i className="close-icon"></i>
                                </a>
                            </div>
                            <a href="!#" className="sidebar-toggle">
                                <i className="fas fa-chevron-left"></i>
                            </a>
                            <div className="sidebar-content">
                                <div className="pin-wrapper" style={{height: "1507.68px"}}><div className="sticky-sidebar sticky-sidebar-fixed" style={{borderBottom: "0px none rgb(102, 102, 102)", width: "280px"}}>
                                    <div className="widget widget-search-form">
                                    </div>
                                    <div className="widget widget-categories">
                                        <h3 className="widget-title bb-no mb-0">Categories</h3>
                                        <ul className="widget-body filter-items search-ul">
                                            <li><Link to={"/products/Clothes"}>Clothes</Link></li>
                                            <li><Link to={"/products/Entertainment"}>Entertainment</Link></li>
                                            <li><Link to={"/products/Fashion"}>Fashion</Link></li>
                                            <li><Link to={"/products/Lifestyle"}>Lifestyle</Link></li>
                                            <li><Link to={"/products/"}>Others</Link></li>
                                            <li><Link to={"/products/Shoes"}>Shoes</Link></li>
                                            <li><Link to={"/products/Technology"}>Technology</Link></li>
                                        </ul>
                                    </div>
                                    <div className="widget widget-posts">
                                        <h3 className="widget-title bb-no">Popular Posts</h3>
                                        <div className="widget-body">
                                            <div className="swiper">
                                                <div className="swiper-container swiper-theme nav-top swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                                                    'spaceBetween': 20,
                                                    'slidesPerView': 1
                                                }">
                                                    <div className="swiper-wrapper " id="swiper-wrapper-a33e84f95c864368" aria-live="polite" style={{transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms"}}>
                                                        <div className="swiper-slide widget-col swiper-slide-active" role="group" aria-label="1 / 2" style={{width: "280px", marginRight: "20px"}}>
                                                        {blogs?.slice(0,2).map((sblogs,n)=>(
                                                            <div className="post-widget mb-4" key={n}>
                                                                <figure className="post-media br-sm">
                                                                    <img src={sblogs.image||"/assets/images/blog/sidebar/1.jpg"} alt="150" height="150"/>
                                                                </figure>
                                                                <div className="post-details">
                                                                    <div className="post-meta">
                                                                        <Link to={"/blog/"+_.kebabCase(sblogs.title)||"Not FOund"} className="post-date">{sblogs.Date||"Not FOund"}</Link>
                                                                    </div>
                                                                    <h4 className="post-title">
                                                                        <Link to={"/blog/"+_.kebabCase(sblogs.title)||"Not FOund"}>{sblogs.description[0]?.slice(0,30)||"Not FOund"}</Link>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        </div>
                                                        <div className="swiper-slide widget-col swiper-slide-active" role="group" aria-label="1 / 2" style={{width: "280px", marginRight: "20px"}}>
                                                        {blogs?.slice(0,2).map((sblogs,n)=>(
                                                            <div className="post-widget mb-4" key={n}>
                                                                <figure className="post-media br-sm">
                                                                    <img src={sblogs.image||"/assets/images/blog/sidebar/1.jpg"} alt="150" height="150"/>
                                                                </figure>
                                                                <div className="post-details">
                                                                    <div className="post-meta">
                                                                        <Link to={"/blog/"+_.kebabCase(sblogs.title)||"Not FOund"} className="post-date">{sblogs.Date||"Not FOund"}</Link>
                                                                    </div>
                                                                    <h4 className="post-title">
                                                                        <Link to={"/blog/"+_.kebabCase(sblogs.title)||"Not FOund"}>{sblogs.description[0]?.slice(0,30)||"Not FOund"}</Link>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                    <button className="swiper-button-next" tabIndex="0" aria-label="Next slide" aria-controls="swiper-wrapper-a33e84f95c864368" aria-disabled="false"></button>
                                                    <button className="swiper-button-prev swiper-button-disabled" disabled="" tabIndex="-1" aria-label="Previous slide" aria-controls="swiper-wrapper-a33e84f95c864368" aria-disabled="true"></button>
                                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget-tags">
                                        <h3 className="widget-title bb-no">Browse Tags</h3>
                                        <div className="widget-body tags">
                                            <Link to={"/products/Fashion"} className="tag">Fashion</Link>
                                            <Link to={"/products/Style"} className="tag">Style</Link>
                                            <Link to={"/products/Travel"} className="tag">Travel</Link>
                                            <Link to={"/products/Women"} className="tag">Women</Link>
                                            <Link to={"/products/Men"} className="tag">Men</Link>
                                            <Link to={"/products/Hobbies"} className="tag">Hobbies</Link>
                                            <Link to={"/products/Shopping"} className="tag">Shopping</Link>
                                            <Link to={"/products/Photography"} className="tag">Photography</Link>
                                        </div>
                                    </div>
                                    
                                </div></div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
  )
}

export default Blog