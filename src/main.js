import { Scene, Clock } from 'three'
import Camera from './commons/Camera'
import Renderer from './commons/Renderer'
import * as THREE from 'three'

// objects
import Lights from './objects/Lights'
import Boar from './objects/Boar'
import Planet from './objects/Planet'
import { TweenMax } from 'gsap'
global.THREE = THREE
require('three/examples/js/loaders/GLTFLoader')

let clock = new Clock()

class Main {
  constructor () {
    this.camera = new Camera()
    this.scene = new Scene()
    this.renderer = new Renderer()
    this.objects = []

    document.body.style.margin = 0
    document.body.style.overflow = 'hidden'
    document.body.appendChild(this.renderer.domElement)

    this.createLights()
    this.createBoar()
    this.createPlanet()

    this.bindMethods()
    this.addEvents()
    this.render()
  }

  load () {
    let promises = this.objects.map(o => o.load && o.load())
    return Promise.all(promises)
      .then(() => {
        this.objects.forEach(o => this.scene.add(o))
      })
  }

  start () {
    this.objects.forEach(o => o.start && o.start())
  }

  createLights () {
    this.lights = new Lights()
    this.objects.push(this.lights)
  }

  createBoar () {
    let boar = new Boar(-4, -4)
    this.objects.push(boar)
    boar = new Boar(-3, -3)
    this.objects.push(boar)
    boar = new Boar(-2, -2)
    this.objects.push(boar)
    boar = new Boar(-1, -1)
    this.objects.push(boar)
    boar = new Boar(0, 0)
    this.objects.push(boar)
    boar = new Boar(3, -3)
    this.objects.push(boar)
    boar = new Boar(2, -2)
    this.objects.push(boar)
    boar = new Boar(1, -1)
    this.objects.push(boar)
    boar = new Boar(4, -4)
    this.objects.push(boar)
  }

  createPlanet () {
    this.planet = new Planet()
    this.objects.push(this.planet)
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

    this.camera.position.x = Math.sin(e * 0.2) * 10
    this.camera.position.z = Math.cos(e * 0.5) * 10
    this.camera.lookAt(0, 0, 0)

    this.objects.forEach(o => o.update(d, e))

    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

/* eslint-disable no-new */
let main = new Main()
main.load()
  .then(() => {
    TweenMax.staggerTo('.color', 0.5, {
      yPercent: -100,
      delay: 2
    }, 0.05, () => {
      main.start()
    })
  })
