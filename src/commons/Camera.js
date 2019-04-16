import { PerspectiveCamera } from 'three'
// require('three/examples/js/controls/OrbitControls.js')

export default class Camera extends PerspectiveCamera {
  constructor () {
    super()

    // this.controls = new THREE.OrbitControls(this)
    this.setSize()
    this.position.set(0, 3, 7)
    this.lookAt(0, 0, 0)
  }

  setSize () {
    const { innerHeight, innerWidth } = window
    this.aspect = innerWidth / innerHeight
    this.updateProjectionMatrix()
  }

  onResize () {
    this.setSize()
  }
}
