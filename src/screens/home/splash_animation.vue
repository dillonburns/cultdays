<template>
  <div>
    <div id="matter">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MatterMixin from './matter_mixin'

export default {

  mixins: [ MatterMixin ],

  mounted () {
    this.initializeScene()
    this.addBounds()
    this.runScene()
    this.addSpriteImages()
    Vue.nextTick().then(() => {
      this.addDomMatter(document.getElementsByClassName('domMatter'))
    })
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
