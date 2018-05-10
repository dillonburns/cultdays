import Matter from 'matter-js'

export default {
  data () {
    return {
      Engine: Matter.Engine,
      Render: Matter.Render,
      World: Matter.World,
      MouseConstraint: Matter.MouseConstraint,
      Mouse: Matter.Mouse,
      Events: Matter.Events,
      Composite: Matter.Composite,
      Composites: Matter.Composites,
      Common: Matter.Common,
      Bodies: Matter.Bodies,
      Body: Matter.Body,
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
      this.engine = this.Engine.create({
        enableSleeping: true,
        positionIterations: 1,
        velocityIterations: 1,
        constraintIterations: 1
      })
      this.world = this.engine.world

      // create a renderer
      this.render = this.Render.create({
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

      this.mouse = this.Mouse.create(this.render.canvas)
      this.mouseConstraint = this.MouseConstraint.create(this.engine, {
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
      var boxA = this.Bodies.rectangle(400, 200, 80, 80)
      var boxB = this.Bodies.rectangle(450, 50, 80, 80)
      var ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

      // add all of the bodies to the world
      this.World.add(this.engine.world, [boxA, boxB, ground])

      // Mouse Controls
      this.World.add(this.world, this.mouseConstraint)

      this.render.mouse = this.mouse

      // run the engine
      this.Engine.run(this.engine)

      // run the renderer
      this.Render.run(this.render)
    },

    addBounds () {
      var boundWidth = 50
      var boundOffset = boundWidth / 4
      var boundColor = '#ffffff'
      var ground = this.Bodies.rectangle(this.windowWidth / 2, this.windowHeight + boundOffset + 10, this.windowWidth, boundWidth, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var ceiling = this.Bodies.rectangle(this.windowWidth / 2, 0 - boundOffset - 10, this.windowWidth, boundWidth, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var lWall = this.Bodies.rectangle(0 - boundOffset - 10, this.windowHeight / 2, boundWidth, this.windowHeight, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })
      var rWall = this.Bodies.rectangle(this.windowWidth + boundOffset + 10, this.windowHeight / 2, boundWidth, this.windowHeight, {
        isStatic: true,
        render: {
          strokeStyle: boundColor,
          fillStyle: boundColor
        }
      })

      this.World.add(this.world, [lWall, rWall, ground, ceiling])
    }
  }
}
