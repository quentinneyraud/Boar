import { Group, AmbientLight } from 'three'

export default class Lights extends Group {
  constructor (...args) {
    super(...args)

    const ambientLight = new AmbientLight(0xEEEEEE, 1)

    this.add(ambientLight)
  }
}
