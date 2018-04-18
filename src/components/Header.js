import React, { Component } from 'react'
// import { Navbar, NavItem } from 'react-materialize'

import GitGalaxyImage from '../assets/gitgalaxy.png'

class HeaderThing extends Component {
  render() {
    return(
      <div className="HeaderTest">
        <div className="HeaderWrap">
          <div className="HeaderStyle">
            <img src={GitGalaxyImage} />
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderThing


// <NavItem onClick={() => console.log('test click')}>Getting Schwifty</NavItem>
// <NavItem href='components.html'>Components</NavItem>
