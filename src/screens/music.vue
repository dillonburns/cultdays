<template>
  <page-default>
    <div class="music">
      <div v-for="(album, index) in music.albums"
           :key="index"
           class="album">
        <div class="cover">
          <img :src="album.cover">
        </div>
        <div class="tracks">
          <div class="title">
            {{ album.title }}
          </div>
          <div v-for="(track, index) in album.tracks"
               :key="index"
               class="track">
            <div class="track-title">
              {{ track.title }}
            </div>
            <plyr class="player"
                  ref="plyr">
              <audio>
                <source :src="album.tracks[index].path"
                        type="audio/mp3" />
              </audio>
            </plyr>
          </div>
        </div>
      </div>
    </div>
  </page-default>
</template>

<script>
import PageDefault from '@/components/page_default'
import { Plyr } from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const BOOM_FOREVER_PATH = '@/assets/music/BOOM_FOREVER/'

export default {
  components: {
    Plyr,
    PageDefault
  },

  data () {
    return {
      music: {
        albums: [
          {
            title: 'BOOM FOREVER',
            cover: require('@/assets/music/BOOM_FOREVER/cover.jpg'),
            tracksContext: require.context('@/assets/music/BOOM_FOREVER/', true, /\.(mp3)$/),
            tracks: [
              {
                title: 'CULT DAYS',
                path: require('@/assets/music/BOOM_FOREVER/01_CULT_DAYS.mp3')
              },
              {
                title: 'BOOM FOREVER',
                path: require('@/assets/music/BOOM_FOREVER/02_BOOM_FOREVER.mp3')
              },
              {
                title: 'SLACK',
                path: require('@/assets/music/BOOM_FOREVER/03_SLACK.mp3')
              },
              {
                title: 'MOVE BITCH',
                path: require('@/assets/music/BOOM_FOREVER/04_MOVE_BITCH.mp3')
              },
              {
                title: 'ATTITUDE',
                path: require('@/assets/music/BOOM_FOREVER/05_ATTITUDE.mp3')
              },
              {
                title: 'O I C U',
                path: require('@/assets/music/BOOM_FOREVER/06_OICU.mp3')
              },
              {
                title: 'REAL LOVE',
                path: require('@/assets/music/BOOM_FOREVER/REAL_LOVE.mp3')
              },
              {
                title: 'REAL LOVE (PROD. GHOST DAD)',
                path: require('@/assets/music/BOOM_FOREVER/REAL_LOVE_(PROD_GHOST_DAD).mp3')
              },

            ]
          }
        ]
      }
    }
  },

  mounted () {
  },

  methods: {
    loadMusic () {
      console.log('Loading music..')
      for (let album in this.music.albums) {
        let tracksContext = this.music.albums[album].tracksContext
        let trackPaths = []
        tracksContext.keys().forEach((filename, index) => {
          trackPaths.push(tracksContext(filename))
        })
        this.music.albums[album].tracks = trackPaths
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.music {
  color: black;
  margin-top: 100px;
  line-height: 48px;
}

.album {
  display: flex;
  flex-direction: row;

  .cover {
    flex: 1 1 auto;

    img {
      width: 350px;
    }
  }

  .tracks {
    flex: 2 2 auto;
    text-align: left;
    padding-left: 20px;

    .title {
      font-size: 48px;
    }

    .track {
      display: flex;
      flex-direction: row;

      .track-title {
        flex: 2 2 60%;
      }

      .player {
        flex: 1 1 auto;
      }
    }
  }

}
</style>
