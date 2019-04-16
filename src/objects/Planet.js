import { Object3D, Mesh, ShaderMaterial, PlaneGeometry, DoubleSide } from 'three'
// import { Plane as CPlane, Body } from 'cannon'
import glslify from 'glslify'
import vertexShader from '../shaders/planet.vert'
import fragmentShader from '../shaders/planet.frag'

export default class Planet extends Object3D {
  constructor (world) {
    super()

    this.world = world
    this.object = null
    this.createGeometry()
    this.createMaterial()
    this.createObject()

    this.rotation.set(-Math.PI / 2, 0, 0)
    this.position.set(0, 0, 0)
  }

  createGeometry () {
    this.geometry = new PlaneGeometry(100, 100, 200, 200)
  }

  createMaterial () {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0.0
      },
      point: {
        type: 'vec2',
        value: {
          x: 0.5,
          y: 0.55
        }
      }
    }
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      side: DoubleSide,
      transparent: true,
      vertexShader: glslify(vertexShader),
      fragmentShader: glslify(fragmentShader)
    })
  }

  createObject () {
    this.object = new Mesh(this.geometry, this.material)

    // var groundShape = new CPlane()
    // this.groundBody = new Body({ mass: 0, shape: groundShape })
    // this.world.add(this.groundBody)

    this.add(this.object)
  }

  update (_, e) {
    this.material.uniforms['time'].value = e
    // this.position.set(this.groundBody.position.x, this.groundBody.position.y, this.groundBody.position.z)
    // this.position.set(this.groundBody.position)
  }
}
