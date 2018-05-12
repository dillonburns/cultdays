<template>
  <nav>
    <div v-for="(link, index) in links"
         :key="index"
         class="menu-item">
      <router-link :to="link.path">
        <img :src="link.image"
             class="menu-image" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      links: [
        {
          label: 'Shop',
          path: '/shop',
          image: require('@/assets/images/shop.png')
        },
        {
          label: 'Music',
          path: '/music',
          image: require('@/assets/images/music.png')
        },
        {
          label: 'Art',
          path: '/art',
          image: require('@/assets/images/art.png')
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
        },
        {
          label: 'Music',
          path: '/music',
          image: require('@/assets/images/music.png')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-item {
    margin-bottom: 10px;
  }
  .menu-image {
    height: 35px;
  }
</style>
