import Vue from 'vue'
import Router from 'vue-router'
import Art from '@/screens/art'
import Home from '@/screens/home'
import Music from '@/screens/music'
import Blog from '@/screens/blog'
import Shop from '@/screens/shop'
import About from '@/screens/about'
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
      path: '/art',
      name: 'Art',
      component: Art
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
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
