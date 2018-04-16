import React, { Component } from 'react';
import axios from 'axios'
import * as THREE from 'three'
import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader'
import DragControls from 'three-dragcontrols';


class Side extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {


    const { width, height, commits } = this.props

    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xf0f0f0 )
    /* 0x222226 */

    let frustumSize = 1000;
    let radius = 500
    let theta = 0
    let aspect = width / height;
		let	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 )

    let ambientLight = new THREE.AmbientLight( 0xfefefe)
    scene.add(ambientLight)
    let light = new THREE.SpotLight( 0xdadada,1.5)
    light.position.set(0,30,500)
    scene.add(light)



    let rectangles = []
    let geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
      commits.forEach(commitArray => {
        console.log('look here', commitArray);
        for ( let i = 0; i < commitArray.length; i ++ ) {
          let newColor = commitArray[i].watson.tone
          console.log('newcolor', newColor);
          let toneColors = {
            anger: `rgb(206, 10, 62)`,
            fear: `rgb(124, 54, 7)`,
            joy: `rgb(255, 256, 0)`,
            sadness: `rgb(0, 8, 255)`,
            analytical: `rgb(0, 175, 55)`,
            confident: `rgb(123, 0, 175)`,
            tentative: `rgb(0, 255, 216)`
          }

          let object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: new THREE.Color(toneColors.newColor) } ) );
          object.position.x = Math.random() * 800 - 400;
          object.position.y = Math.random() * 800 - 400;
          object.position.z = Math.random() * 800 - 400;
          object.rotation.x = Math.random() * 2 * Math.PI;
          object.rotation.y = Math.random() * 2 * Math.PI;
          object.rotation.z = Math.random() * 2 * Math.PI;
          object.scale.x = Math.random() + 0.5;
          object.scale.y = Math.random() + 0.5;
          object.scale.z = Math.random() + 0.5;
          scene.add( object );
          rectangles.push(object)
        }
      })

    let mouse = new THREE.Vector2(), INTERSECTED;
    console.log(mouse, 'mouse');
    let raycaster = new THREE.Raycaster();

    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.refs.anchor.appendChild(renderer.domElement)

    this.refs.anchor.addEventListener('mousemove', mouseMovement, false )
    // this.refs.anchor.addEventListener('onMouseMove', mouseMovement, false )

    let animate = function () {
			requestAnimationFrame( animate )
      theta += 0.1;
			camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
			camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
			camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
			camera.lookAt( scene.position )
      camera.updateMatrixWorld();

      raycaster.setFromCamera( mouse, camera )
      let intersects = raycaster.intersectObjects( scene.children )

      if ( intersects.length > 0 ) {
					if ( INTERSECTED != intersects[ 0 ].object ) {
						if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						INTERSECTED.material.emissive.setHex( 0xff0000 );
					}
				} else {
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = null;
				}


			renderer.render( scene, camera )
		};

    animate()

    let mouseMovement = (e) => {
      e.preventDefault()
      console.log('weeeee', mouse.x, mouse.y);
      // mouse.x = ( e.clientX / width ) * 2 - 1;
			// mouse.y = - ( e.clientY / height ) * 2 + 1;
      mouse.x = ( e.pageX / width ) * 2 - 1;
			mouse.y = - ( e.pageY / height ) * 2 + 1;
    }

}

  render() {
    const { width, height } = this.props
    return (
      <div ref="anchor" style={{width, height}} />
    )
  }
}

export default Side

//Math.random() * 0xffffff
