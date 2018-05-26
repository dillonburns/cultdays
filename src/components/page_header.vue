<template>
  <header>
    <logo />
  </header>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
header {
  margin: 30px auto 20px;
  text-align: center;
}

.header {
  background: white;
}
</style>
