import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { Route } from 'react-router-dom'

import UserBuilder from './UserBuilder'
import RepoMan from './RepoMan'

class Main extends Component {
  render() {
    return(
      <Row className="Main">
        <UserBuilder />
        <Col s={8} className='Middle'>1</Col>
        <RepoMan />
      </Row>
    )
  }
}

export default Main

// <Route path="/test" component={UserBuilder} />
// <Route path ="/test" component={RepoMan} />
