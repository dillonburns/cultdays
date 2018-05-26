<template>
  <div id="app">
    <music-bar />
    <router-view/>
  </div>
</template>

<script>
import MusicBar from '@/components/music_bar'

export default {
  name: 'App',

  components: {
    MusicBar
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
