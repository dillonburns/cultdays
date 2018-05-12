<template>
  <div class="home">
    <div class="home-content dom-matter">
      <logo />
      <navigation />
    </div>
    <splash-animation />
  </div>
</template>

<script>
import Logo from '@/components/logo'
import Navigation from '@/components/navigation'
import SplashAnimation from '@/screens/home/splash_animation'

export default {
  name: 'Home',

  components: {
    Logo,
    Navigation,
    SplashAnimation
  },

  data () {
    return {
      msg: 'It\'s Cult Days bitch'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.home-content {
  z-index: 10;
}

/deep/ > .logo {
  margin-bottom: 40px;
}
</style>
