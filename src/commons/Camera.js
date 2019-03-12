import { PerspectiveCamera, Euler } from 'three'
import { TweenLite, Circ } from 'gsap'
require('three/examples/js/controls/OrbitControls.js')

export default class Camera extends PerspectiveCamera {
  constructor () {
    super()

    this.controls = new THREE.OrbitControls(this)
    this.setSize()
    this.lookAt(0, 0, 0)
    this.position.set(0, 0, 30)
  }

  setSize () {
    const { innerHeight, innerWidth } = window
    this.aspect = innerWidth / innerHeight
    this.updateProjectionMatrix()
  }

  onResize () {
    this.setSize()
  }

  moveTo (position, { onComplete, onUpdate } = {}) {
    TweenLite.to(this.position, 1.6, Object.assign({}, position, {
      onComplete,
      onUpdate,
      ease: Circ.easeInOut
    }))
  }

  rotationTo (rotation, { onComplete, onUpdate } = {}) {
    TweenLite.to(this.rotation, 1.6, Object.assign({}, rotation, {
      onComplete,
      onUpdate,
      ease: Circ.easeInOut
    }))
  }

  lookAtTo (x, y, z) {
    var startRotation = new Euler().copy(this.rotation)

    this.lookAt(x, y, z)
    var endRotation = new Euler().copy(this.rotation)

    this.rotation.copy(startRotation)

    TweenLite.to(this.rotation, 5, {
      x: endRotation.x,
      y: endRotation.y,
      z: endRotation.z,
      onUpdate: () => {
        this.updateProjectionMatrix()
      },
      onComplete: () => {
        console.log(this)
      }
    })
  }
}
