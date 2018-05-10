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

      // create a renderer
      this.render = this.Render.create({
        element: document.getElementById('matter'),
        engine: this.engine
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

      // run the engine
      this.Engine.run(this.engine)

      // run the renderer
      this.Render.run(this.render)
    }
  }
}
