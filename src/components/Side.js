import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'

class Side extends Component {
  render() {
    return(
      <Row>
        <Col s={1} className='grid-example'>1</Col>
        <Col s={1} className='grid-example'>2</Col>
        <Col s={1} className='grid-example'>3</Col>
        <Col s={1} className='grid-example'>4</Col>
        <Col s={1} className='grid-example'>5</Col>
        <Col s={1} className='grid-example'>6</Col>
        <Col s={1} className='grid-example'>7</Col>
        <Col s={1} className='grid-example'>8</Col>
        <Col s={1} className='grid-example'>9</Col>
        <Col s={1} className='grid-example'>10</Col>
        <Col s={1} className='grid-example'>11</Col>
        <Col s={1} className='grid-example'>12</Col>
      </Row>
    )
  }
}

export default Side
