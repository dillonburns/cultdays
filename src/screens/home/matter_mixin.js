import Matter from 'matter-js'

const Mouse = Matter.Mouse
const World = Matter.World
const Bodies = Matter.Bodies
const Engine = Matter.Engine
const Render = Matter.Render
const MouseConstraint = Matter.MouseConstraint
// const Body = Matter.Body
// const Events = Matter.Events
const Common = Matter.Common
// const Composite = Matter.Composite
// const Composites = Matter.Composites

export default {
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      engine: null,
      world: null,
      canvas: null,
      render: null,
      mouse: null,
      mouseConstraint: null,
      particles: []
    }
  },

  methods: {
    initializeScene () {
      console.log('inited scene')

      // create an engine
      this.engine = Engine.create({
        enableSleeping: true,
        positionIterations: 1,
        velocityIterations: 1,
        constraintIterations: 1
      })
      this.world = this.engine.world

      // create a renderer
      this.render = Render.create({
        element: document.getElementById('matter'),
        engine: this.engine,
        options: {
          width: this.windowWidth,
          height: this.windowHeight,
          background: 'transparent',
          wireframes: false,
          showSleeping: false
        }
      })

      this.mouse = Mouse.create(this.render.canvas)
      this.mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: this.mouse,
        constraint: {
          stiffness: 0.8,
          render: {
            visible: false
          }
        }
      })
    },

    runScene () {
      // Mouse Controls
      World.add(this.world, this.mouseConstraint)

      this.render.mouse = this.mouse

      this.world.gravity.x = 0
      this.world.gravity.y = 0.5

      // run the engine
      Engine.run(this.engine)

      // run the renderer
      Render.run(this.render)
    },

    addBounds () {
      let boundWidth = 50
      let boundOffset = boundWidth / 4
      let boundColor = '#ffffff'
      let opts = {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      }
      let ground = Bodies.rectangle(this.windowWidth / 2, this.windowHeight + boundOffset + 10, this.windowWidth, boundWidth, opts)
      let ceiling = Bodies.rectangle(this.windowWidth / 2, 0 - boundOffset - 10, this.windowWidth, boundWidth, opts)
      let lWall = Bodies.rectangle(0 - boundOffset - 10, this.windowHeight / 2, boundWidth, this.windowHeight, opts)
      let rWall = Bodies.rectangle(this.windowWidth + boundOffset + 10, this.windowHeight / 2, boundWidth, this.windowHeight, opts)

      World.add(this.world, [lWall, rWall, ground, ceiling])
    },

    addSpriteImages () {
      let spriteContext = require.context('@/assets/images/splash/', true, /\.(png)$/)

      spriteContext.keys().forEach((filename, index) => {
        let img = new Image()
        let url = spriteContext(filename)

        img.onload = () => {
          let scale = 0.6
          let randX = Common.random(this.windowWidth / 8, this.windowWidth - (this.windowWidth / 8))
          let randY = Common.random(this.windowHeight / 8, this.windowHeight - (this.windowHeight / 8))
          let tempIcon = Bodies.rectangle(randX, randY, img.width * scale, img.height * scale, {
            restitution: 0.05,
            render: {
              strokeStyle: '#f00',
              fillStyle: '#f00',
              sprite: {
                texture: url,
                xScale: scale,
                yScale: scale
              }
            }
          })
          World.add(this.world, tempIcon)
        }
        img.src = url
      })
    },

    addDomMatter (objs) {
      for (let el in objs) {
        let obj = objs[el]

        let width = obj.clientWidth
        let height = obj.clientHeight

        let posX = obj.getBoundingClientRect().left + width / 2
        let posY = obj.getBoundingClientRect().top + height / 2

        var domBody = Bodies.rectangle(posX, posY, width * 1, height * 1, {
          isStatic: true,
          render: {
            strokeStyle: 'transparent',
            fillStyle: 'transparent'
          }
        })

        World.add(this.world, domBody)
      }
    }
  }
}
