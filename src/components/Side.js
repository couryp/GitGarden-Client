import React, { Component } from 'react';
import axios from 'axios'
import * as THREE from 'three'
import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader'
import DragControls from 'three-dragcontrols';


class Test extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {

    const { width, height } = this.props


    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x000000 )

    let camera = new THREE.PerspectiveCamera( 75, width /  height, 0.1, 1000 )
    camera.position.set(0,30,100)

    let ambientLight = new THREE.AmbientLight( 0xfefefe)
    scene.add(ambientLight)
    let light = new THREE.SpotLight( 0xdadada,1.5)
    light.position.set(0,30,100)
    scene.add(light)

    // let mtlLoader = new MTLLoader();
    // console.log('here');
    //    mtlLoader.load('../assets/lowpolytree.mtl', function (materials) {
    //      console.log('materials',materials);
    //      materials.preload();
    //
    //      let objLoader = new OBJLoader();
    //      objLoader.setMaterials(materials);
    //
    //      objLoader.load('../assets/lowpolytree.obj', function (object) {
    //        object.position.y = 20;
    //        console.log('this', object)
    //        scene.add(object);
    //      });
    //
    //    });


    let spheres = []
    let sphereGeometry = new THREE.SphereGeometry(3,3,3)
    for(let i = 0; i < 50; i++) {
      let sphereMaker = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial( {
        color: Math.random() * 0xffffff
      })
    )

      sphereMaker.position.x = Math.random()* 100-50
      sphereMaker.position.y = Math.random() * 20 + 1
      sphereMaker.position.z = Math.random()* 100-50

      sphereMaker.castShadow = true
      sphereMaker.receiveShadow = true

      scene.add(sphereMaker)
      spheres.push(sphereMaker)

    }



    let geometry = new THREE.PlaneBufferGeometry(100, 100)
    let texture = new THREE.CanvasTexture( this.generateTexture() )

    for (let i = 0; i < 15; i++) {
      let material = new THREE.MeshBasicMaterial( {
        color: new THREE.Color( 0x37EE3D),
        map: texture,
        depthTest: false,
        depthWrite: false,
        transparent: true
       });

       let mesh = new THREE.Mesh(geometry,material)
       mesh.position.y = i * 0.25
       mesh.rotation.x =  -Math.PI / 2

       scene.add(mesh)
    }

    scene.children.reverse()

    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.refs.anchor.appendChild(renderer.domElement)

console.log('scene',scene.children);

    let animate = function () {
			requestAnimationFrame( animate )


			renderer.render(scene, camera)
		};

    animate()

  }

  generateTexture = () => {
      let canvas = document.createElement( 'canvas' )
      canvas.width = 512;
      canvas.height = 512;

      let context = canvas.getContext( '2d' )

      for ( let i = 0; i < 20000; i ++ ) {

          context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)'
          context.beginPath()
          context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true )
          context.fill()

      }

      context.globalAlpha = 0.075
      context.globalCompositeOperation = 'lighter'

      return canvas

  }





  render() {
    const { width, height } = this.props
    return (
      <div ref="anchor" style={{width, height}} />
    )
  }
}

export default Test





import React, { Component } from 'react'
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



// var camera, scene, renderer;
//
// init();
// animate();
//
// function init() {
//
//   camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
//   camera.position.set( 0, 75, 100 );
//
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color( 0x003300 );
//
//   var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
//
//   var texture = new THREE.CanvasTexture( generateTexture() );
//
//   for ( var i = 0; i < 15; i ++ ) {
//
//       var material = new THREE.MeshBasicMaterial( {
//           color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
//           map: texture,
//           depthTest: false,
//           depthWrite: false,
//           transparent: true
//       } );
//
//       var mesh = new THREE.Mesh( geometry, material );
//
//       mesh.position.y = i * 0.25;
//       mesh.rotation.x = - Math.PI / 2;
//
//       scene.add( mesh );
//
//   }
//
//   scene.children.reverse();
//
//   renderer = new THREE.WebGLRenderer();
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );
//
//   //
//
//   window.addEventListener( 'resize', onWindowResize, false );
//
// }
//
// function onWindowResize() {
//
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//
//   renderer.setSize( window.innerWidth, window.innerHeight );
//
// }
//
// function generateTexture() {
//
//   var canvas = document.createElement( 'canvas' );
//   canvas.width = 512;
//   canvas.height = 512;
//
//   var context = canvas.getContext( '2d' );
//
//   for ( var i = 0; i < 20000; i ++ ) {
//
//       context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
//       context.beginPath();
//       context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
//       context.fill();
//
//   }
//
//   context.globalAlpha = 0.075;
//   context.globalCompositeOperation = 'lighter';
//
//   return canvas;
//
// }
//
// //
//
// function animate() {
//
//   requestAnimationFrame( animate );
//
//   render();
//
// }
//
// function render() {
//
//   var time = Date.now() / 6000;
//
//   camera.position.x = 80 * Math.cos( time );
//   camera.position.z = 80 * Math.sin( time );
//
//   camera.lookAt( scene.position );
//
//   for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
//
//       var mesh = scene.children[ i ];
//       mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
//       mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;
//
//   }
//
//   renderer.render( scene, camera );
//
// }
