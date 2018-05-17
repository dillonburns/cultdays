import Matter from 'matter-js'

const Mouse = Matter.Mouse
const World = Matter.World
const Bodies = Matter.Bodies
const Engine = Matter.Engine
const Render = Matter.Render
const MouseConstraint = Matter.MouseConstraint

// const Body = Matter.Body
// const Events = Matter.Events
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
      mousePosition: null,
      mouseConstraint: null
    }
  },

  methods: {
    initializeScene () {
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
      this.world.gravity.y = 0.75

      // run the engine
      Engine.run(this.engine)

      // run the renderer
      Render.run(this.render)
    },

    addScreenBounds () {
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

    addDomMatter (objs) {
      try {
        for (let el in objs) {
          let obj = objs[el]

          let width = obj.clientWidth
          let height = obj.clientHeight

          let posX = obj.getBoundingClientRect().left + width / 2
          let posY = obj.getBoundingClientRect().top + height / 2

          var domBody = Bodies.rectangle(posX, posY, width * 2, height * 1.25, {
            isStatic: true,
            render: {
              strokeStyle: 'transparent',
              fillStyle: 'transparent'
            }
          })

          World.add(this.world, domBody)
        }
      } catch (e) {
        // the above returns an HTMLCollection with contains a 'length'
        //   element which cannot be acted on by `this.addDomMatter` so
        //   i catch the error and do nothing with it :(
      }
    }
  }
}
