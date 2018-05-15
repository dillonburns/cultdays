<template>
  <page-default>
    <div class="about column is-three-quarters" v-html="text" />
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'

const oobLink = 'http://outof.business/'

export default {
  components: {
    PageDefault
  },

  data () {
    return {
      text: `I'm 33, my shirt says Cult Days with a number 7 on it. I'm at a campsite on the moon. I've been camping here since high school, maybe even before that. I come up here sometimes to start a pink fire and be alone. I don't come up here specifically to get away from people, its just that there is no one else up here yet.<br><br>

        The background sounds are a crying baby downstairs and sirens. I hear sirens a lot recently, it seems they aren't going away or getting farther away. I'll be totally free of this on the moon.<br><br>

        I'm on the moon and I have a white tent, a pink fire, a white jumper with white chiffon tails, cozy wide white boots, and I'm fit and happy with my appearance. This is what we pictured, a voice tells me. Who are you? I ask. Who do you love? The voice answers back. Glitter lava oozes down a ginormous volcano made of fluffy chocolate cake.<br><br>

        I have to remember to tell Blue to move. Move Blue, and Blue sparkles and crackles and is fixed again. Blue is a hologram. I have two of them. Blue and Baby Blue. They are my companions and little teachers.<br><br>

        There is no way to tell you how I feel, I can only speak in visual snippets and you'll have to use your imagination. Always keep your imagination going and don't let the grey and ecru walls get you down. I'm a firm believer in taking a risk with color, and keeping jars of glitter visible. Build me an altar, and show me a picture of it. Email it to me...I can post it.<br><br>

        Flowers, candles, statues, wishes, toys, glitter, fruit, you name it.<br><br>

        site by <a target="_blank" href='${oobLink}'>outof.business</a>`
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  margin-top: 10px;
  color: black;
  text-align: left;
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
