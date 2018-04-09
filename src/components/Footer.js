import React, { Component } from 'react'
import { Footer } from 'react-materialize'

class FooterBoy extends Component {
  render() {
    return(
      <Footer className='footer calisto'>
        <span>Developed by: <a href={'https://github.com/couryp'}>Patrick Coury</a></span>
      </Footer>
    )
  }
}

export default FooterBoy
