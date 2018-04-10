import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { Route } from 'react-router-dom'

import UserBuilder from './UserBuilder'
import RepoMan from './RepoMan'
import Test from './Test'

class Main extends Component {
  render() {
    return(
      <Row className="Main">
        <Col s={3} className="lefty">
          <UserBuilder />
        </Col>
        <Col s={6} className="middy">
          <Test width={600} height={400}/>
        </Col>
        <Col s={3} className="righty">
          <RepoMan />
        </Col>
      </Row>
    )
  }
}

export default Main

// <Route path="/test" component={UserBuilder} />
// <Route path ="/test" component={RepoMan} />
//<Col s={8} className='Middle'></Col>
