<template>
  <page-default>
    <div class="press columns is-mobile is-centered is-fluid">
      <div class="column is-8-tablet is-6-desktop">
        <div class="columns is-multiline">
          <div v-for="(link, index) in links"
               :key="index"
               class="art column is-half">
            <a :href="link.link">
              <img :src="link.image"
                   class="link-image" />
            </a>
          </div>
        </div>
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
      links: [
        {
          link: 'https://www.instagram.com/pinkcatdaily/',
          image: require('@/assets/images/art/pinkcat.jpg')
        },
        {
          link: 'https://www.instagram.com/cultdays/',
          image: require('@/assets/images/art/instagram_logo.svg')
        },
        {
          link: 'https://www.youtube.com/user/CultDays/',
          image: require('@/assets/images/art/youtube_logo.svg')
        },
        {
          link: 'https://cultdays.carbonmade.com/',
          image: require('@/assets/images/art/carbonmade.jpg')
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

.art {
  a {
    border: 0 !important;
    transition: transform 100ms;

    &:hover {
      transform: scale(1.1, 1.1);
    }
  }

  .link-image {
    width: 200px;
    height: 200px;
    border-radius: 50px;
    margin-bottom: 25px;
  }
}
</style>
