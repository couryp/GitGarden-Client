import React, { Component } from 'react';
import axios from 'axios'
import * as THREE from 'three'

import OBJLoader from "three-react-obj-loader"
import MTLLoader from 'three-react-mtl-loader'
import DragControls from 'three-dragcontrols'

import myTree from '../assets/lowpolytree.obj'
import myTreeMTL from '../assets/lowpolytree.mtl'


var OrbitControls = require('three-orbit-controls')(THREE)


class Test extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {

    const { width, height } = this.props


    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x003300 )
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    let camera = new THREE.PerspectiveCamera( 75, width /  height, 0.1, 1000 )
    camera.position.set(0,30,100)

    // let ambientLight = new THREE.AmbientLight( 0x0f0f0f)
    // scene.add(ambientLight)
    let light = new THREE.SpotLight( 0xffffff, 1.5)
    light.position.set(0,50,200)
    scene.add(light)

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    let geometry = new THREE.PlaneBufferGeometry(100, 100,30)
    let texture = new THREE.CanvasTexture( this.generateTexture() )

    for (let i = 0; i < 20; i++) {
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


    let trees = []
    let mtlLoader = new MTLLoader();
    console.log('here');
       mtlLoader.load(myTreeMTL, function (materials) {
         console.log('materials',materials);
         materials.preload();

         let objLoader = new OBJLoader();
         objLoader.setMaterials(materials);

         objLoader.load(myTree, function (object) {
           object.position.set(0,10,10)
           console.log('this', object)
           object.scale.set(10,10,10)



           scene.add(object);
           trees.push(object)

         });

       });

       console.log('trees', trees);

    let spheres = []
    let sphereGeometry = new THREE.SphereGeometry(10,10,10)
    for(let i = 0; i < 50; i++) {
      let sphereMaker = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial( {
        color: Math.random() * 0xffffff
      })
    )

      sphereMaker.position.x = Math.random() * 100 - 50
      sphereMaker.position.y = Math.random() * 60 - 10
      sphereMaker.position.z = Math.random() * 80 - 40

      sphereMaker.castShadow = true
      sphereMaker.receiveShadow = true
      sphereMaker.scale.set(.3,.3,.3)
      scene.add(sphereMaker)
      spheres.push(sphereMaker)

    }

    // let controls = new OrbitControls(camera)




    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.refs.anchor.appendChild(renderer.domElement)


    const dragControls = new DragControls(spheres, camera, renderer.domElement)
    const dragControlsTree = new DragControls(trees, camera, renderer.domElement)



    console.log('scene',scene.children);

    let animate = function () {
			requestAnimationFrame( animate )
      // var time = Date.now() / 6000;
      // camera.position.x = 80 * Math.cos( time );
      // camera.position.z = 80 * Math.sin( time );
      // camera.lookAt( scene.position );
      // controls.update()
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

// let time = Date.now() / 12000
//
//
// for ( let i = 0, l = scene.children.length; i < l; i ++ ) {
//
//     let mesh = scene.children[ i ]
//     mesh.position.x = Math.sin( time * 4 ) * i * i * 0.001;
//     mesh.position.z = Math.cos( time * 6 ) * i * i * 0.001;
//
// }

// let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0)
// keyLight.position.set(-100, 0, 100)
//
// let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75)
// fillLight.position.set(100, 0, 100)
//
// let backLight = new THREE.DirectionalLight(0xffffff, 1.0)
// backLight.position.set(100, 0, -100).normalize()
//
// scene.add(keyLight)
// scene.add(fillLight)
// scene.add(backLight)

// color: new THREE.Color().setHSL(0.3,0,75, (i / 15) * 0.5 + 0.1),

// let animate = function () {
//   requestAnimationFrame( animate );
//
//   cube.rotation.x += 0.02;
//   cube.rotation.y += 0.02;
//
//   renderer.render(scene, camera);
// };
//
// animate();


// let geometry2 = new THREE.BoxGeometry(1,3,1)
// let material2 = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
// let cube2 = new THREE.Mesh( geometry2, material2 );
// cube2.position.x = 1
// scene.add( cube2 )
//
// let geometry3 = new THREE.BoxGeometry(1,1,1)
// let material3 = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
// let cube3 = new THREE.Mesh( geometry3, material3 );
// cube3.position.x = 2
// scene.add( cube3 )
//
// let geometry4 = new THREE.BoxGeometry(1,3,1)
// let material4 = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
// let cube4 = new THREE.Mesh( geometry4, material4 );
// cube4.position.x = -1
// scene.add( cube4 )
//
// let geometry5 = new THREE.BoxGeometry(1,1,1)
// let material5 = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
// let cube5 = new THREE.Mesh( geometry5, material5 );
// cube5.position.x = -2
// scene.add( cube5 )
