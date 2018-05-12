<template>
  <div id="matter">
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
      try {
        this.addDomMatter(document.getElementsByClassName('dom-matter'))
      } catch (e) {
        // the above returns an HTMLCollection with contains a 'length' element which cannot be acted on by `this.addDomMatter`
      }
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
