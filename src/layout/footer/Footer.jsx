import React from 'react'
import FooterContainer from './FooterContainer'
import FooterNewsletter from './FooterNewsletter'

function Footer() {
  return (
    <footer className="footer">
        <FooterNewsletter/>
        <FooterContainer/>
    </footer>
  )
}

export default Footer