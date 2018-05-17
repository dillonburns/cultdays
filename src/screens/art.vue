<template>
  <page-default>
    <div class="art columns is-mobile is-centered is-fluid">
      <div class="column is-8-tablet is-6-desktop is-4-widescreen">
        <div class="columns is-multiline">
          <div v-for="(link, index) in links"
               :key="index"
               class="link column is-half">
            <a :href="link.link"
               target="_blank">
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

  metaInfo: {
    title: 'Art'
  },

  data () {
    return {
      links: [
        {
          link: 'https://www.instagram.com/pinkcatdaily/',
          image: require('@/assets/images/art/pinkcat.png')
        },
        {
          link: 'https://www.instagram.com/cultdays/',
          image: require('@/assets/images/art/instagram.png'),
          icon: true
        },
        {
          link: 'https://www.youtube.com/user/CultDays/',
          image: require('@/assets/images/art/youtube.png'),
          icon: true
        },
        {
          link: 'https://cultdays.carbonmade.com/',
          image: require('@/assets/images/art/portfolio.png')
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all.sass';
.art {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 50px 0;
}

.link {
  a {
    border: 0 !important;
  }

  $link-image-dimension: 150px;

  .link-image {
    margin-bottom: 25px;
    transition: transform 100ms;
    width: $link-image-dimension;
    height: $link-image-dimension;

    @include mobile {
      margin-bottom: 5px;
    }

    &:hover {
      transform: scale(1.1, 1.1);
    }
  }
}
</style>
