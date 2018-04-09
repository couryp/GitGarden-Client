import React, { Component } from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return(
      <div className="Splash">
        <Link to="/home"><Button floating large className='black test' waves='purple' icon='local_florist' /></Link>
      </div>
    )
  }
}

export default Login
