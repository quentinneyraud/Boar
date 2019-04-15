import { Scene, Clock } from 'three'
import Camera from './commons/Camera'
import Renderer from './commons/Renderer'
import { World, NaiveBroadphase } from 'cannon'

// objects
import Lights from './objects/Lights'
import Boar from './objects/Boar'
import Planet from './objects/Planet'

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
    // this.createBoar()
    this.createPlanet()

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

  createPlanet () {
    this.planet = new Planet(this.world)
    console.log(this.planet)
    this.scene.add(this.planet)
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
    let e = clock.getElapsedTime()
    this.world.step(d, e)
    // if (this.boar.sphereBody) console.log(this.boar.sphereBody.position)
    if (this.boar) this.boar.update(d, e)
    this.planet.update(d, e)
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

/* eslint-disable no-new */
new Main()
