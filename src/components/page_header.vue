<template>
  <header :class="{ 'hidden' : trackPlaying}">
    <logo />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/logo'

export default {

  components: {
    Logo
  },

  props: {
    fixedHeader: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    ...mapGetters({
      trackPlaying: 'isTrackPlaying'
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  margin: 30px auto 20px;
  text-align: center;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.header {
  background: white;
}
</style>
