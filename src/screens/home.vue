<template>
  <div class="home">
    <img src="@/assets/images/logo.png"
         class="logo domMatter">
    <navigation
      class="domMatter" />
    <splash-animation />
  </div>
</template>

<script>
import Navigation from '@/components/navigation'
import SplashAnimation from '@/screens/home/splash_animation'

export default {
  name: 'Home',

  components: {
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

  .logo {
    height: 100px;
    width: auto;
    padding-bottom: 40px;
  }
</style>
