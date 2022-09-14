import React from 'react'
import Topheader from './TopHeader'
import Bottomheader from './BottomHeader'

function header() {
  return (
    <header className="header">
        <Topheader/>
        <Bottomheader/>
    </header>
  )
}

export default header