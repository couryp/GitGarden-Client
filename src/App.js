import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

import UserBuilder from './components/UserBuilder'
import RepoMan from './components/RepoMan'
import FooterThing from './components/Footer'
import HeaderThing from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Test from './components/Test'

const baseURL = 'http://localhost:3000'


class App extends Component {
  constructor(props){
    super(props)
    this.state= {

    }
  }

  componentDidMount() {
    console.log('window',window.location.search);
  }

  auth = (e) => {
    e.preventDefault()
    let nonce = this.createNonce()
    localStorage.setItem('state', nonce)
    console.log('dude', process.env.REACT_APP_CLIENTID)
    let reqParams = `client_id=${process.env.REACT_APP_CLIENTID}&scope=user%20public_repo&state=${nonce}&allow_signup=true`

    window.location.replace(`https://github.com/login/oauth/authorize?${reqParams}`)
  }

  createNonce = () => {
    let nonceString = ""
    let nonceLimit = 13
    let worldOfPossibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i = 0; i < nonceLimit; i++) {
      nonceString += worldOfPossibilities.charAt(Math.floor(Math.random() * worldOfPossibilities.length))
    }
    return nonceString
  }





  render() {

    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={(props) => {
            return <Login auth={this.auth} {...props} />
          }} />

          <Route exact path="/test" render={(props) => {
            return <Test width={600} height={400} {...props} />
          }} />

          <Route path='/home' render={() => (
            <div className="App">
              <HeaderThing />
              <Main />
              <FooterThing />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <Route exact path="/test" width={800} height={600} component={Test} />
