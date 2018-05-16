<template>
  <div class="page">
    <page-header />
    <div class="content container">
      <slot/>
    </div>
    <page-footer />
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
  flex-direction: column;
}
.content {
  flex: 1;
  margin: auto;
  z-index: 10;
  font-size: 16px;
  line-height: 24px;
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
