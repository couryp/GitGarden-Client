import React, { Component } from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'

import LoginImage from '../assets/logingithub.png'
import GitGardenImage from '../assets/gitgarden.png'
import OctocatImage from '../assets/Octocat2.png'

class Login extends Component {
  constructor(props) {
    super(props)

  }

  render() {
      console.log('here',this.props);
    return(
      <div className="Splash">
        <div className="SplashBody">
          <img src={GitGardenImage} />
          <img src={LoginImage} className="LoginStyle" />
          <img src={OctocatImage} onClick={(e) => this.props.auth(e)} className="OctocatSplash" />
        </div>
      </div>
    )
  }
}

export default Login

// <Link to="/home"><img src={OctocatImage} className="OctocatSplash" /></Link>
