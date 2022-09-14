import React,{useState,useEffect} from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {publicRequest} from "./../../RequestMethods"

function Blogs() {
    const [Blog, setBlogs] = useState();
    useEffect(()=>{
        const getdata = async()=>{
            const res = await publicRequest.get("/functionality/blogs");
            setBlogs(res.data);
            console.log(res);
        }
        getdata();
    },[])
  return (
    <div className='container'>
        <div className="post-wrapper appear-animate mb-4 fadeIn appear-animation-visible" style={{animationDuration: "1.2s"}}>
        <div className="title-link-wrapper pb-1 mb-4">
        <h2 className="title ls-normal mb-0">From Our Blog</h2>
        <a className="font-weight-bold font-size-normal" href="blog-listing.html">View All Articles</a></div>
        <div className="swiper">
        <div className="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                            'slidesPerView': 1,
                            'spaceBetween': 20,
                            'breakpoints': {
                                '576': {
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
        <div id="swiper-wrapper-cc8100c96f4575175" className="swiper-wrapper " style={{transform: "translate3d(37.6231px, 0px, 0px)", transitionDuration: "0ms"}}>
            {Blog?.slice(0,4).map(item=>(
            <div key={item._id?.toString()} className="swiper-slide post text-center overlay-zoom swiper-slide-active" style={{width: "295px", marginRight: "20px"}}>
            <figure className="post-media br-sm">
                <Link to={process.env.PUBLIC_URL+"/blog/"+_.kebabCase(item.title?.toString())}>
                    <img style={{backgroundColor: "#4b6e91"}} src={process.env.PUBLIC_URL+item.image?.toString()} alt="Post" width="280" height="180" /> 
                </Link>
            </figure>
            <div className="post-details">
            <h4 className="post-title"><Link to={process.env.PUBLIC_URL+"/blog/"+_.kebabCase(item.title?.toString())}>{item.title?.toString()}</Link></h4>
            <Link className="btn btn-link btn-dark btn-underline" to={process.env.PUBLIC_URL+"/blog/"+_.kebabCase(item.title?.toString())}>{"Read More"}</Link></div>
            </div>
            ))}
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Blogs