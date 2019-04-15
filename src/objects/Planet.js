import { Object3D, Mesh, ShaderMaterial, SphereGeometry } from 'three'
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
  }

  createGeometry () {
    this.geometry = new SphereGeometry(10, 100, 100)
  }

  createMaterial () {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0.0
      }
    }
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      // transparent: true,
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
