<template>
  <page-default>
    <div class="columns is-centered is-mobile is-fluid">
      <div class="press column is-10-mobile is-9-tablet is-9-desktop is-8-widescreen">
        <a v-for="(article, index) in press"
           target="_blank"
           :key="index"
           :href="article.url">
          <div class="article">
            <span class="site">{{ article.site }}: </span> <span class="article-title">{{ article.title }}</span>
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

  metaInfo: {
    title: 'Press'
  },

  data () {
    return {
      press: [
        {
          title: 'Saba Moeel of Cult Days can’t be boxed in',
          site: 'The Fader',
          url: 'http://www.thefader.com/2018/06/04/cult-days-saba-mooel-interview'
        },
        {
          title: 'Cult Days Is Having 8 Types Of Fun On Fire Flames Hardbody Karate',
          site: 'The Fader',
          url: 'http://www.thefader.com/2017/07/27/cult-days-is-having-8-types-of-fun-on-ifire-flames-hardbody-karatei'
        },
        {
          title: 'Share A Moment With Cult Days In Intimate "Time Away" Video',
          site: 'The Fader',
          url: 'http://www.thefader.com/2016/01/28/cult-days-time-away-video'
        },
        {
          title: 'CULT DAYS AKA SABA MOEEL IN NYT ARTICLE FOR HER MERCH SITE',
          site: 'New York Times',
          url: 'https://www.nytimes.com/2018/04/17/style/micromerch-niche-fandom.html'
        },
        {
          title: 'INTERVIEW WITH CULT DAYS',
          site: 'Abou Naddara',
          url: 'http://abounaddara.net/interview/cult_days/'
        },
        {
          title: 'CONSEQUENCE OF SOUND REPORT WITH CULT DAYS',
          site: 'Consequence of Sound',
          url: 'https://consequenceofsound.net/2018/02/zomby-busdriver-and-kool-a-d-accused-of-sexual-assault-report/'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all.sass';

.press {
  margin: 50px 0;
}

@mixin animatedText () {
  background-size: 1000% 1000%;
  animation: rainbow 10s ease infinite;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.article {
  color: black;
  font-size: 32px;
  line-height: 42px;
  text-align: left;
  font-weight: bold;
  position: relative;
  padding: 7.5px 15px;
  margin-bottom: 50px;
  transition: 100ms all;
  box-shadow: 5px 5px 0px 0px black;

  @include mobile {
    padding: 5px;
    font-size: 28px;

    .site {
      font-size: 32px;
    }
  }

  .site {
    font-style: italic;
  }

  .article-title {
    color: black;
    text-transform: uppercase;
  }

  &:hover {
    background: linear-gradient(124deg, #dd00f3, #2b1de8, #1ddde8, #1de840, #e81d1d, #ff2400);
    @include animatedText;
    box-shadow: 10px 10px 5px 0px black;

    .site {
      background: linear-gradient(124deg, #1de840, #e81d1d, #1ddde8, #ff2400, #dd00f3, #2b1de8);
      @include animatedText;
    }

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
