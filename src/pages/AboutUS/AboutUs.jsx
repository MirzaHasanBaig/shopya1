import React from 'react'
import Intro from './Intro'
import Count from './Count'
import CustomerService from './CustomerServices'

function AboutUs() {
  return (
    <div className="page-content" style={{marginTop: "100px"}}>
        <div className="container">
            <Intro/>
            <CustomerService/>
            <Count/>
        </div>
    </div>
  )
}

export default AboutUs