export default function metaInfo () {
  return {
    titleTemplate: titleTemplate,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
