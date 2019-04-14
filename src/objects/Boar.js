import { Object3D, GLTFLoader, MeshBasicMaterial, AnimationMixer } from 'three'
import * as THREE from 'three'

import { Sphere, Body } from 'cannon'
global.THREE = THREE
require('three/examples/js/loaders/GLTFLoader')

let mixer

export default class Boar extends Object3D {
  constructor (world) {
    super()

    this.object = null
    this.world = world
    this.loader = new GLTFLoader()
    // this.rotation.set(-Math.PI / 4, -Math.PI / 2, 0)
  }

  load () {
    this.loader.load(
      'Boar.gltf',
      (object) => {
        this.childrenObjects = object.scene.children[0].children[0].children
        mixer = new AnimationMixer(object.scene)
        // mixer.clipAction(object.animations[0]).play()
        this.object = object.scene
        console.log(this.object)
        this.add(this.object)
        this.test()

        var mass = 5; var radius = 1
        var sphereShape = new Sphere(radius)
        this.sphereBody = new Body({ mass: mass, shape: sphereShape })
        this.sphereBody.position.set(0, 0, 0)
        this.world.add(this.sphereBody)
      }
    )
  }

  test () {
    this.childrenObjects.forEach(obj => {
      if (obj.type !== 'SkinnedMesh') return

      obj.material.color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random())
    })
  }

  update (d) {
    if (!this.object) return

    mixer.update(d)

    this.position.set(this.sphereBody.position.x, this.sphereBody.position.y, this.sphereBody.position.z)

    // this.object.position.set(this.sphereBody.position)
    // this.object.position.y += 0.04
    // this.childrenObjects.forEach(obj => {
    //   if (obj.type !== 'SkinnedMesh') return

    //   obj.material.color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random())
    // })
  }
}
