import React, { Component } from 'react'
import { Footer } from 'react-materialize'

class FooterThing extends Component {
  render() {
    return(
      <Footer className='footer calisto'>
        <div>Developed by: <a href={'https://github.com/couryp'}>Patrick Coury</a></div>
      </Footer>
    )
  }
}

export default FooterThing
