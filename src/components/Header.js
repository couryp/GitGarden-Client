import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'

class HeaderBoy extends Component {
  render() {
    return(
      <Navbar brand='Git Garden' right>
        <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
      </Navbar>
    )
  }
}

export default HeaderBoy
