import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

import UserBuilder from './components/UserBuilder'
import RepoMan from './components/RepoMan'
import FooterBoy from './components/Footer'
import HeaderBoy from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Test from './components/Test'


class App extends Component {
  constructor(props){
    super(props)
    this.state= {

    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/test" width={800} height={600} component={Test} />
          <Route path='/home' render={() => (
            <div className="App">
              <HeaderBoy />
              <Main />
              <FooterBoy />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
