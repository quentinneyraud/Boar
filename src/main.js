import { Scene } from 'three'
import Lights from './objects/Lights'
import Camera from './commons/Camera'
import Renderer from './commons/Renderer'

class Main {
  constructor () {
    this.camera = new Camera()
    this.scene = new Scene()
    this.renderer = new Renderer()

    document.body.style.margin = 0
    document.body.style.overflow = 'hidden'
    document.body.appendChild(this.renderer.domElement)

    this.createLights()

    this.bindMethods()
    this.addEvents()
    this.render()
  }

  createLights () {
    this.lights = new Lights()
    this.scene.add(this.lights)
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
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

/* eslint-disable no-new */
new Main()
