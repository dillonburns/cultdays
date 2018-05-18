<template>
  <page-default>
    <div class="about-me columns is-centered is-fluid">
      <div class="column is-5 is-8-mobile">
          <div class="about" v-html="text" />
      </div>
    </div>
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'

const oobLink = 'http://outof.business/'

export default {
  components: {
    PageDefault
  },

  metaInfo: {
    title: 'About'
  },

  data () {
    return {
      text: `I'm Cult Days. I'm a musician, fashion and graphic designer from El Cerrito, CA but originally from Iran and Turkey.<br><br>

        My goal is to build an "e-nation" of like-minded people. I wanna see world peace I don't think we are so far off. I'm a vegan, I meditate, do yoga, I like to party and get to know people. I love to collab and make friends. I want to gig everyday. Hit me up with your ideas or whatever.<br><br>

        site by <a target="_blank" href='${oobLink}'>outof.business</a>`
    }
  }
}
</script>

<style lang="scss" scoped>
.about-me {
  height: 100%;
  display: flex;
  align-items: center;
}

.about {
  padding: 50px 0;
  color: black;
  font-weight: bold;
  text-align: right;
  background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 600% 600%;
  animation: rainbow 18s ease infinite;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
