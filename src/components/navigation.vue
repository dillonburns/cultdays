<template>
  <nav :class="{horizontal}">
    <div v-for="(link, index) in links"
         :key="index"
         class="menu-item">
      <a v-if="link.externalURL"
         target="_blank"
         :href="link.externalURL">
        <img v-if="link.image"
             :src="link.image"
             class="menu-image" />
        <div v-else>
          {{ link.label }}
        </div>
      </a>
      <router-link v-else :to="link.path">
        <img :src="link.image"
             class="menu-image" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      links: [
        {
          label: 'Shop',
          externalURL: 'https://shop.cultdays.com/',
          image: require('@/assets/images/shop.png')
        },
        {
          label: 'Music',
          path: '/music',
          image: require('@/assets/images/music.png'),
          children: [
            {
              label: 'Bandcamp',
              url: 'https://cultdays.bandcamp.com/',
              image: require('@/assets/images/bandcamp.png'),
              hidden: true
            },
            {
              label: 'Soundcloud',
              url: 'https://soundcloud.com/cultdays',
              image: require('@/assets/images/soundcloud.png')
            }
          ]
        },
        {
          label: 'Art',
          path: '/art',
          image: require('@/assets/images/art.png'),
          children: [
            {
              label: 'Instagram',
              url: 'https://www.instagram.com/cultdays/',
              image: require('@/assets/images/instagram.png')
            }
          ]
        },
        {
          label: 'Press',
          path: '/press',
          image: require('@/assets/images/contact.png')
        },
        {
          label: 'Contact',
          path: '/contact',
          image: require('@/assets/images/contact.png')
        },
        {
          label: 'About',
          path: '/about',
          image: require('@/assets/images/aboutme.png')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  .menu-item {
    margin-bottom: 10px;
  }

  &.horizontal {
    .menu-item {
      display: inline-block;
      margin-right: 20px;
    }
  }
}

.menu-image {
  height: 35px;
}
</style>
