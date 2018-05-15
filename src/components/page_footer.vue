<template>
  <footer class="columns is-centered is-mobile is-fluid">
    <navigation
      class="column is-four-fifths"
      horizontal/>
  </footer>
</template>

<script>
import Navigation from '@/components/navigation'
export default {

  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
footer {
  margin-bottom: 20px;
}
</style>
