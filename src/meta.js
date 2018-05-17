const metaDescription = 'Cult Days is a musician, fashion and graphic designer from El Cerrito, CA, hailing from Iran and Turkey.'

export default function metaInfo () {
  return {
    titleTemplate: titleTemplate,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: metaDescription },

      // OpenGraph data (Most widely used)
      { property: 'og:title', content: titleTemplate() },
      { property: 'og:site_name', content: 'Cult Days' },
      // The list of types is available here: http://ogp.me/#types
      { property: 'og:type', content: 'website' },
      // Should the the same as your canonical link, see below.
      { property: 'og:url', content: 'https://www.cultdays.com' },
      { property: 'og:image', content: 'https://www.cultdays.com/static/meta-icon.png' },
      // Often the same as your meta description, but not always.
      { property: 'og:description', content: metaDescription },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: 'https://www.cultdays.com' },
      { name: 'twitter:title', content: titleTemplate() },
      { name: 'twitter:description', content: metaDescription },
      // Your twitter handle, if you have one.
      { name: 'twitter:creator', content: '@Cultdays' },
      { name: 'twitter:image:src', content: 'https://pbs.twimg.com/profile_images/972611671226171392/xqq_bj0q_400x400.jpg' },

      // Google / Schema.org markup:
      { itemprop: 'name', content: titleTemplate() },
      { itemprop: 'description', content: metaDescription },
      { itemprop: 'image', content: 'https://www.cultdays.com/static/meta-icon.png' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/static/favicons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/static/favicons/favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/static/favicons/favicons/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'mask-icon',
        href: '/static/favicons/favicons/safari-pinned-tab.svg',
        color: '#000000'
      }
    ]
  }
}

function titleTemplate (titleChunk) {
  return titleChunk ? `${titleChunk} | Cult Days` : 'Cult Days'
}
