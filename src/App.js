import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

import UserBuilder from './components/UserBuilder'
import RepoMan from './components/RepoMan'

class App extends Component {
  constructor(props){
    super(props)
    this.state= {

    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">okok
          <p>"hi, this is app"</p>
          <Route exact path="/test" component={UserBuilder} />
          <Route exact path ="/test" component={RepoMan} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
