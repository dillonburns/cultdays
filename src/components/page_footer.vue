<template>
  <footer class="container">
    <div class="columns is-centered is-mobile is-fluid">
      <navigation
        class="column is-four-fifths"
        horizontal/>
    </div>
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
@import '~bulma/sass/utilities/_all.sass';
footer {
  @include mobile {
    margin-bottom: 60px;
  }
}
</style>
