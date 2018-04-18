import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'

import UserBuilder from './components/UserBuilder'
import Key from './components/Key'
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
      username: null,
      id: null,
      avatar : null,
      location : null,
    }
  }

  componentDidMount() {
    let userCache = JSON.parse(localStorage.getItem('user'))
    if (userCache) {
      // this.processCommits(userCache.username)
      this.setState({
        username: userCache.username
      })
    } else if (window.location.search) {
      const code = window.location.search.slice(6, -20)
      this.getUserData(code)
    }
  }

  getUserData = (code) => {
    let access_token
    const {REACT_APP_CLIENTID, REACT_APP_CLIENTSECRET} = process.env
    axios.post(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${REACT_APP_CLIENTID}&client_secret=${REACT_APP_CLIENTSECRET}&code=${code}`)
      .then(res => {
        access_token = res.data.slice(13, -43)
        return axios.get(`https://api.github.com/user?access_token=${access_token}`)
      })
      .then(user => {
        this.setState({
          username : user.data.login,
          id : user.data.id,
          avatar : user.data.avatar_url,
          location : user.data.location
        })
        this.processCommits(user.data.login)
        const userCache = {username : user.data.login, token : access_token}
        localStorage.setItem('user', JSON.stringify(userCache))
        console.log('user data login',user.data);
      })
      .catch(console.error)
  }

  processCommits = (username) => {
    axios.post('http://localhost:8080/watson/analyzeTone', {username})
      .then(res => {
        console.log('Watoson done:', res.data);
        // this.getCommits()
        // this.setState({
        //   commitArray: res.data
        // })
      })
      .catch(err => {
        console.log(err)
      })
  }

  auth = (e) => {
    e.preventDefault()
    let nonce = this.createNonce()
    localStorage.setItem('state', nonce)
    console.log('env id', process.env.REACT_APP_CLIENTID)
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
              <Main username={this.state.username} id={this.state.id} avatar={this.state.avatar} location={this.state.location}/>
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
