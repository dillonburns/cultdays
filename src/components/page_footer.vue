<template>
  <footer class="container">
    <div class="columns is-centered is-fluid">
      <navigation
        class="column is-12-tablet is-9-desktop is-8-widescreen"
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
  background: white !important;
  margin-bottom: 20px;

  @include mobile {
    margin-bottom: 60px;
  }
  .columns {
    margin: 0;
  }
  .column {
    padding: 0;
  }
}
</style>
