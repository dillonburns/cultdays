<template>
  <div id="matter">
  </div>
</template>

<script>
import Matter from 'matter-js'
import MatterMixin from './matter_mixin'

const World = Matter.World
const Events = Matter.Events
const Common = Matter.Common
const Bodies = Matter.Bodies
const Composite = Matter.Composite

const spriteScale = 0.5

export default {

  mixins: [ MatterMixin ],

  data () {
    return {
      splashComposite: Composite.create({
        label: 'splash',
        id: Common.nextId
      }),
      spriteData: []
    }
  },

  mounted () {
    // Setup Scene
    this.initializeScene()
    this.addScreenBounds()
    this.addDomMatter(document.getElementsByClassName('dom-matter'))

    // Run
    this.runScene()
    this.addSpriteImages()

    // Setup Events
    Events.on(this.mouseConstraint, 'mousedown', (event) => {
      this.mousePosition = event.mouse.position
      this.addAnotherImage(2)
    })
  },

  methods: {
    addSpriteImages () {
      let spriteContext = require.context('@/assets/images/splash/', true, /\.(png)$/)

      spriteContext.keys().forEach((filename, index) => {
        let img = new Image()
        let url = spriteContext(filename)

        img.onload = () => {
          let randX = Common.random(this.windowWidth / 8, this.windowWidth - (this.windowWidth / 8))
          let randY = Common.random(this.windowHeight / 8, this.windowHeight - (this.windowHeight / 8))
          let tempIcon = Bodies.rectangle(randX, randY, img.width * spriteScale, img.height * spriteScale, {
            id: Common.nextId(),
            restitution: 0.05,
            render: {
              strokeStyle: '#f00',
              fillStyle: '#f00',
              sprite: {
                texture: url,
                xScale: spriteScale,
                yScale: spriteScale
              }
            }
          })

          this.spriteData.push({
            url: url,
            width: img.width,
            height: img.height
          })

          // Composite.add(this.splashComposite, tempIcon)
          World.addBody(this.world, tempIcon)
        }
        img.src = url
      })
    },

    addAnotherImage (num) {
      for (var x = 0; x < num; x++) {
        let i = Math.floor(Math.random() * this.spriteData.length)
        let newSpriteData = this.spriteData[i]
        let newIcon = Bodies.rectangle(this.mousePosition.x, this.mousePosition.y, newSpriteData.width * spriteScale, newSpriteData.height * spriteScale, {
          id: Common.nextId(),
          restitution: 0.05,
          render: {
            strokeStyle: '#f00',
            fillStyle: '#f00',
            sprite: {
              texture: newSpriteData.url,
              xScale: spriteScale,
              yScale: spriteScale
            }
          }
        })
        // Composite.add(this.splashComposite, newIcon)
        World.addBody(this.world, newIcon)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#matter {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
