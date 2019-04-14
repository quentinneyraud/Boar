import { Object3D, PlaneGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Plane as CPlane, Body } from 'cannon'

export default class Plane extends Object3D {
  constructor (world) {
    super()

    this.world = world
    this.object = null
    this.createGeometry()
    this.createMaterial()
    this.createObject()
    this.rotation.set(-Math.PI / 2, 0, 0)
  }

  createGeometry () {
    this.geometry = new PlaneGeometry(20, 20)
  }

  createMaterial () {
    this.material = new MeshBasicMaterial({
      color: 0xFF0000
    })
  }

  createObject () {
    this.object = new Mesh(this.geometry, this.material)

    var groundShape = new CPlane()
    this.groundBody = new Body({ mass: 0, shape: groundShape })
    this.world.add(this.groundBody)

    this.add(this.object)
  }

  update () {
    this.position.set(this.groundBody.position.x, this.groundBody.position.y, this.groundBody.position.z)
    // this.position.set(this.groundBody.position)
  }
}
