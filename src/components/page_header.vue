<template>
  <header :class="{ 'sticky': fixedHeader}">
    <logo />
    <slot />
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

  &.sticky {
    position: fixed;
    background: linear-gradient(to bottom, white 90%, transparent);
    width: 100vw;
    height: auto;
    display: block;
    z-index: 100;
    margin: 0;
    padding: 10px;
    max-width: unset;

    /deep/ .logo {
      height: 50px;
      transition: 150ms all;
    }
  }
}

.header {
  background: white;
}
</style>
