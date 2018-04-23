import React, { Component } from 'react';
import axios from 'axios'
import * as THREE from 'three'
import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader'
import DragControls from 'three-dragcontrols';


let mouse;

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      commitMsg: "",
      toneName: '',
      toneScore: 0
    }
  }

  componentDidMount() {
    // console.log('props', this.props);

    const { width, height, commits } = this.props

    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x222226 )
    /* 0x222226 f0f0f0 404040 */

    let frustumSize = 1000;
    let radius = 500
    let theta = 0
    let aspect = width / height;
		let	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 )

    let ambientLight = new THREE.AmbientLight( 0xfefefe )
    scene.add(ambientLight)
    let light = new THREE.SpotLight( 0xdadada,1.5 )
    light.position.set(0,30,500)
    scene.add(light)

    let toneColors = {
      anger: `rgb(206, 10, 62)`,
      fear: `rgb(177, 8, 224)`,
      joy: `rgb(255, 256, 0)`,
      sadness: `rgb(0, 8, 255)`,
      disgust: `rgb(8, 224, 52)`
    }

    let rectangles = []
    let geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
      commits.forEach(commitArray => {
        // console.log('commitarray', commitArray)
        //commitArray.length
        // for ( let i = 0; i < 20; i ++ ) {
        //   console.log('look here', commitArray[i]);
        //   let newColor = commitArray[i].emotion_name
          let newColor = commitArray.emotion_name
          // console.log('newcolor', newColor);

          let object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: new THREE.Color(toneColors[newColor]) } ) );
          object.commitname = commitArray.message
          object.tonename = commitArray.emotion_name
          object.tonescore = commitArray.emotion_score
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
        // }
      })

    mouse = new THREE.Vector2();
    var INTERSECTED;

    // console.log('document window', window.document, document);
    let raycaster = new THREE.Raycaster();

    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.refs.anchor.appendChild(renderer.domElement)


    // document.addEventListener('mousemove', mouseMovement, false )
    // this.refs.anchor.addEventListener('onMouseMove', mouseMovement, false )

    let animate = () => {
			requestAnimationFrame( animate )
      theta += 0.1
			camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) )
			camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) )
			camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) )
			camera.lookAt( scene.position )
      camera.updateMatrixWorld()

      raycaster.setFromCamera( mouse, camera )
      let intersects = raycaster.intersectObjects( scene.children )

      if ( intersects.length > 0 ) {
        // console.log('intersect', intersects);
					if ( INTERSECTED != intersects[ 0 ].object ) {
						INTERSECTED = intersects[ 0 ].object;
						// console.log('INTERSECTED', INTERSECTED);
            // console.log(this.state.commitMsg);
            this.setState({
              commitMsg: INTERSECTED.commitname,
              toneName: INTERSECTED.tonename,
              toneScore: INTERSECTED.tonescore
            })
					}
				} else {
					// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = null;
				}


			renderer.render( scene, camera )
		};

    animate()

    // let mouseMovement = (e) => {
    //   e.preventDefault()
    //   console.log('weeeee', mouse.x, mouse.y);
    //   // mouse.x = ( e.clientX / width ) * 2 - 1;
		// 	// mouse.y = - ( e.clientY / height ) * 2 + 1;
    //   mouse.x = ( e.pageX / width ) * 2 - 1;
		// 	mouse.y = - ( e.pageY / height ) * 2 + 1
    // }


}

  onMouseMove = (e) => {

  mouse.x = ( e.screenX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( e.screenY / window.innerHeight ) * 2 + 1
  // mouse.x = (e.screenX / this.props.width) * 2 - 1
  // mouse.y = - ( e.screenY / this.props.height ) * 2 + 1
  // mouse.x = e.screenX - this.refs.anchor.offsetLeft
  // mouse.y = e.screenY - this.refs.anchor.offsetTop
  // console.log('mouse', mouse.x, mouse.y)
  // this.setState({ x: e.screenX, y: e.screenY });
  }

  render() {

    const { width, height, commits } = this.props
    return (
      <div className="centerPanel">
        <div className="commitThree">{this.state.commitMsg.slice(0,40)} / {this.state.toneName} / {this.state.toneScore}</div>
        <span/>
        <div ref="anchor" style={{width, height}} onMouseMove={this.onMouseMove} />
      </div>
    )
  }
}

export default Canvas

//Math.random() * 0xffffff
//const { x, y } = this.state
