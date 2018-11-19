import { WebGLRenderer } from 'three'

export default class Renderer extends WebGLRenderer {
  constructor () {
    super({
      antialias: true
    })
    this.setPixelRatio(window.devicePixelRatio)
    this.setClearColor(0x7ec0ee, 1)
    this.shadowMap.enabled = true
    this.shadowMapSoft = true
    this.fitToWIndow()
  }

  fitToWIndow () {
    const { innerHeight, innerWidth } = window
    this.setSize(innerWidth, innerHeight)
  }

  onResize () {
    this.fitToWIndow()
  }
}
