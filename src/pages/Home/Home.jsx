import React,{useEffect,useState} from 'react'
import Banners from './Banners'
import Popullar from './Popullar'
import Slider from './Slider'
import FeaturedInfo from './FeaturedInfo'
import Products from './Products'
import SingleBanner from './SingleBanner'
import Blogs from './Blogs'
import {publicRequest} from '../../RequestMethods'
function Home() {
  const [data,setdata] = useState([]);
  useEffect(()=>{
    const getdata=async()=>{
      const res = await publicRequest.get("/functionality/images");
      setdata(res.data);
    }
    getdata();
  },[])

  return (
    <React.Fragment>
        <Slider images={data?.slice(0,3)}/>
        <FeaturedInfo/>
        <Banners images={data?.slice(3,5)}/>
        <Popullar/>
        <Banners images={data?.slice(5,7)}/>
        <Products images={data?.slice(9,10)}/>
        <SingleBanner images={data?.slice(7,8)}/>
        <Blogs/>
    </React.Fragment>
  )
}

export default Home