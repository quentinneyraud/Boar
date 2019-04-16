import { Object3D, AnimationMixer, Color, GLTFLoader } from 'three'
require('three/examples/js/utils/SkeletonUtils')

export default class Boar extends Object3D {
  constructor (world, x = 0, z = 0) {
    super()

    this.model = null
    this.object = null
    this.mixer = null
    this.world = world
    this.position.set(x, 0, z)
    this.rotation.set(Math.PI / 2, Math.PI / 2, 0)
  }

  load () {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        'Boar.gltf',
        (object) => {
          this.setModel(object)
          resolve()
        }
      )
    })
  }

  setModel (model) {
    this.model = model
    this.object = THREE.SkeletonUtils.clone(this.model.scene)
    this.childrenObjects = this.object.children[0].children[0].children
    this.mixer = new AnimationMixer(this.object)
    this.mixer.clipAction(this.model.animations[16])
      .startAt(Math.random() * 2)
      .play()

    this.add(this.object)
    this.addRandomColor()
  }

  addRandomColor () {
    this.childrenObjects.forEach(obj => {
      if (obj.type !== 'SkinnedMesh') return

      obj.material.color = new Color().setHSL(Math.random(), Math.random(), Math.random())
    })
  }

  update (d, e) {
    if (!this.object) return
    this.mixer.update(d)
  }
}
