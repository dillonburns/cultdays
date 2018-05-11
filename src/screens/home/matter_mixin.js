import Matter from 'matter-js'

const Mouse = Matter.Mouse
const World = Matter.World
const Bodies = Matter.Bodies
const Engine = Matter.Engine
const Render = Matter.Render
const MouseConstraint = Matter.MouseConstraint
// const Body = Matter.Body
// const Events = Matter.Events
// const Common = Matter.Common
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
      console.log('run scene')

      // create two boxes and a ground
      var boxA = Bodies.rectangle(400, 200, 80, 80)
      var boxB = Bodies.rectangle(450, 50, 80, 80)
      var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

      // add all of the bodies to the world
      World.add(this.engine.world, [boxA, boxB, ground])

      // Mouse Controls
      World.add(this.world, this.mouseConstraint)

      this.render.mouse = this.mouse

      // run the engine
      Engine.run(this.engine)

      // run the renderer
      Render.run(this.render)
    },

    addBounds () {
      var boundWidth = 50
      var boundOffset = boundWidth / 4
      var boundColor = '#ffffff'
      var ground = Bodies.rectangle(this.windowWidth / 2, this.windowHeight + boundOffset + 10, this.windowWidth, boundWidth, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var ceiling = Bodies.rectangle(this.windowWidth / 2, 0 - boundOffset - 10, this.windowWidth, boundWidth, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var lWall = Bodies.rectangle(0 - boundOffset - 10, this.windowHeight / 2, boundWidth, this.windowHeight, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var rWall = Bodies.rectangle(this.windowWidth + boundOffset + 10, this.windowHeight / 2, boundWidth, this.windowHeight, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })

      World.add(this.world, [lWall, rWall, ground, ceiling])
    },

    addSpriteImages () {
      var context = require.context('@/assets/images/splash/', true, /\.(png)$/)
      var imgPaths = {}

      context.keys().forEach((filename, index) => {
        imgPaths[index] = context(filename)
      })
      console.log(imgPaths)
    }
  }
}
