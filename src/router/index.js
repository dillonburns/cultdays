import Vue from 'vue'
import Router from 'vue-router'
import Art from '@/screens/art'
import Home from '@/screens/home'
import Shop from '@/screens/shop'
import About from '@/screens/about'
import Music from '@/screens/music'
import Press from '@/screens/press'
import Contact from '@/screens/contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/music/:album/:track',
      name: 'Track',
      component: Music
    },
    {
      path: '/art',
      name: 'Art',
      component: Art
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/press',
      name: 'Press',
      component: Press
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
