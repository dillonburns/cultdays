<template>
  <div id="matter">
  </div>
</template>

<script>
import MatterMixin from './matter_mixin'

export default {

  mixins: [ MatterMixin ],

  mounted () {
    this.initializeScene()
    this.addBounds()
    this.runScene()
    this.addSpriteImages()
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
  background: rgba(0, 255, 0, 0.1);
  overflow: hidden;
}
</style>
