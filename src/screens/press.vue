<template>
  <page-default>
    <div class="columns is-centered is-fluid">
      <div class="press column is-three-quarters is-half-widescreen">
        <a v-for="(article, index) in press"
           :key="index"
           :href="article.url">
          <div class="article">
            {{ article.title }}
            <span class="site">
              - {{ article.site }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'

export default {
  components: {
    PageDefault
  },

  data () {
    return {
      press: [
        {
          title: 'Cult Days Is Having 8 Types Of Fun On Fire Flames Hardbody Karate',
          site: 'The Fader',
          url: 'http://www.thefader.com/2017/07/27/cult-days-is-having-8-types-of-fun-on-ifire-flames-hardbody-karatei'
        },
        {
          title: 'Share A Moment With Cult Days In Intimate "Time Away" Video',
          site: 'The Fader',
          url: 'http://www.thefader.com/2016/01/28/cult-days-time-away-video'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.press {
  margin-top: 50px;
}

.article {
  font-size: 32px;
  line-height: 42px;
  text-align: left;
  position: relative;
  padding: 7.5px 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 25px;
  box-shadow: 5px 5px 0px 0px black;

  .site {
    font-size: 16px;
    line-height: 48px;
    font-style: italic;
  }

  &:hover {
    background: linear-gradient(124deg, #dd00f3, #2b1de8, #1ddde8, #1de840, #e81d1d, #ff2400);
    background-size: 1000% 1000%;
    animation: rainbow 12s ease infinite;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-shadow: 10px 10px 5px 0px black;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
      background-size: 1800% 1800%;
      animation: rainbow 18s ease infinite;
      z-index: -1;
    }
  }
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
