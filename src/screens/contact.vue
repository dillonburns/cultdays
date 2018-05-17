<template>
  <page-default>
    <div class="contact columns is-centered is-fluid">
      <div class="column is-5 is-8-mobile" v-html="text" />
    </div>
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'

const sabaEmail = 'cultdays@gmail.com'
const twitter = 'https://twitter.com/cultdays'
const instagram = 'https://www.instagram.com/cultdays/'

export default {
  components: {
    PageDefault
  },

  metaInfo: {
    title: 'Contact'
  },

  data () {
    return {
      text: `To book me for a musical performance email <a target="_blank" href="mailto:${sabaEmail}">${sabaEmail}</a><br><br><br>
              To book me for a reading or meditation email me at <a target="_blank" href="mailto:${sabaEmail}">${sabaEmail}</a><br><br><br>
              My twitter is <a target="_blank" href="${twitter}">@cultdays</a><br><br><br>
              My instagram is <a target="_blank" href="${instagram}">@cultdays</a>`
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  padding: 50px 0;
  color: black;
  font-weight: bold;
  background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 600% 600%;
  animation: rainbow 18s ease infinite;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.column {
  padding: 50px 0;
}

@keyframes rainbow {
    0%,
    100% {
      background-position:0% 82%;
    }
    50% {
      background-position:100% 19%;
    }
    100% {
      background-position:0% 82%;
    }
}
</style>
