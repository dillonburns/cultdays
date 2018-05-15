<template>
  <page-default>
    <div class="contact column is-three-quarters" v-html="text" />
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'

const bookingEmail = 'greg@datatouring.com'
const sabaEmail = 'cultdays@gmail.com'
const twitter = 'https://twitter.com/cultdays'
const instagram = 'https://www.instagram.com/cultdays/'

export default {
  components: {
    PageDefault
  },

  data () {
    return {
      text: `To book me for a musical performance, email <a target="_blank" href="mailto:${bookingEmail}">${bookingEmail}</a>
              and CC <a target="_blank" href="mailto:${sabaEmail}">${sabaEmail}</a>.<br><br><br>
              To book me for a reading or meditation email me at <a target="_blank" href="mailto:${sabaEmail}">${sabaEmail}</a>.<br><br><br>
              My twitter is <a target="_blank" href="${twitter}">@cultdays</a><br><br><br>
              My instagram is <a target="_blank" href="${instagram}">@cultdays</a><br><br><br>`
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  color: black;
  margin-top: 100px;
}
</style>
