import { Scene, Clock } from 'three'
import Camera from './commons/Camera'
import Renderer from './commons/Renderer'
import { World, NaiveBroadphase } from 'cannon'

// objects
import Lights from './objects/Lights'
import Boar from './objects/Boar'
import Plane from './objects/Plane'

let clock = new Clock()

class Main {
  constructor () {
    this.camera = new Camera()
    this.scene = new Scene()
    this.renderer = new Renderer()

    document.body.style.margin = 0
    document.body.style.overflow = 'hidden'
    document.body.appendChild(this.renderer.domElement)

    this.createWorld()
    this.createLights()
    this.createBoar()
    this.createPlane()

    this.bindMethods()
    this.addEvents()
    this.render()
  }

  createWorld () {
    this.world = new World()
    this.world.gravity.set(0, 0, -9.82)
    this.world.broadphase = new NaiveBroadphase()
  }

  createLights () {
    this.lights = new Lights()
    this.scene.add(this.lights)
  }

  createBoar () {
    this.boar = new Boar(this.world)
    this.boar.load()
    this.scene.add(this.boar)
  }

  createPlane () {
    this.plane = new Plane(this.world)
    this.scene.add(this.plane)
  }

  bindMethods () {
    this.onResize = this.onResize.bind(this)
  }

  addEvents () {
    window.addEventListener('resize', this.onResize, false)
  }

  onResize () {
    this.renderer.onResize()
    this.camera.onResize()
  }

  render () {
    let d = clock.getDelta()
    this.world.step(d)
    // if (this.boar.sphereBody) console.log(this.boar.sphereBody.position)
    this.boar.update(d)
    this.plane.update(d)
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

/* eslint-disable no-new */
new Main()
