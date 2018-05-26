<template>
  <div class="page">
    <page-header class="header container">
      <slot name="header-slot"></slot>
    </page-header>
    <section class="content container">
      <slot/>
    </section>
    <page-footer class="footer" />
  </div>
</template>

<script>
import PageHeader from '@/components/page_header'
import PageFooter from '@/components/page_footer'

export default {
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
}

.header {
  flex: 0 0 auto;
}

.content {
  flex: 1 1 auto;
  margin: auto;
  z-index: 10;
  font-size: 16px;
  line-height: 24px;
  transition: all 550ms;
}

.footer {
  flex: 0 0 auto;
  padding: 10px 20px;
}

/deep/ > .content a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid black;

  &:hover {
    border-bottom: 5px solid black;
  }
}
</style>
