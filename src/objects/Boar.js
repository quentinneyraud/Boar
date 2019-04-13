import { Object3D, GLTFLoader, MeshBasicMaterial, AnimationMixer, Clock } from 'three'
import * as THREE from 'three'
global.THREE = THREE
require('three/examples/js/loaders/GLTFLoader')

let mixer
let clock = new Clock()

export default class Boar extends Object3D {
  constructor () {
    super()
    this.loader = new GLTFLoader()
  }

  load () {
    this.loader.load(
      'Boar.gltf',
      (object) => {
        this.childrenObjects = object.scene.children[0].children[0].children
        mixer = new AnimationMixer(object.scene)
        mixer.clipAction(object.animations[0]).play()
        this.add(object.scene)
        this.test()
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      }
    )
  }

  test () {
    this.childrenObjects.forEach(obj => {
      if (obj.type !== 'SkinnedMesh') return

      console.log(obj.material)
      obj.material.color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random())
    })
  }

  update () {
    if (mixer != null) {
      mixer.update(clock.getDelta())
    }

    if (!this.childrenObjects) return
    this.childrenObjects.forEach(obj => {
      if (obj.type !== 'SkinnedMesh') return

      obj.material.color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random())
    })
  }
}
