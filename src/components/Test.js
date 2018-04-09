import React, { Component } from 'react';
import axios from 'axios'
import * as three from 'three'


class Test extends Component {
  constructor() {
    super()
    this.state = {

    }
  }


  componentDidMount() {
    const { width, height } = this.props


    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth /  window.innerHeight, 0.1, 1000 )
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize( width, height )

    this.refs.appendChild(renderer.domElement)

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

camera.position.z = 5;

  }


  render() {
    const { width, height } = this.props
    return (
      <div ref="Test" className="Test" style={{width, height}} />
    )
  }
}

export default Test;
