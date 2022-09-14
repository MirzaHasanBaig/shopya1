import React from 'react'

function Intro() {
  return (
        <section className="introduce mb-10 pb-10">
            <h2 className="title title-center" style={{fontSize:"28px"}}>
                We’re Devoted Marketing<br/>Consultants Helping Your Business Grow
            </h2>
            <p className=" mx-auto text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                labore et dolore magna aliqua. Venenatis tellu metus</p>
            <figure className="br-lg">
                <img src="assets/images/pages/about_us/1.jpg" alt="Banner" width="1240" height="540" style={{backgroundColor: "#D0C1AE"}}/>
            </figure>
        </section>
  )
}

export default Intro