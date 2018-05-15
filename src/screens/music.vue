<template>
  <page-default>
    <div class="music">
      <div v-for="(album, aindex) in music.albums"
           :key="aindex"
           class="album">
        <div class="cover">
          <img :src="album.cover">
        </div>
        <div class="tracks">
          <div class="album-title">
            {{ album.title }}
          </div>
          <div class="player-row">
            <div class="now-playing-title">
              {{ album.nowPlayingTrackTitle || 'click a song bitch' }}
            </div>
            <plyr class="player"
                  ref="plyr"
                  :emit="['play']"
                  @play="trackPlayed(aindex, tindex)"
                  :options="plyrOptions">
              <audio>
                <source v-if="album.nowPlayingTrackTitle !== null"
                        :src="null"
                        type="audio/mp3" />
              </audio>
            </plyr>
          </div>
          <div v-for="(track, tindex) in album.tracks"
               :key="tindex"
               class="track"
               :class="{ 'now-playing': track.nowPlaying}">
            <div class="track-title"
                 @click="playTrack(aindex, tindex)">
              <span class="track-number">{{ tindex + 1 }}</span>{{ track.title }}
            </div>
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

export default {
  components: {
    Plyr,
    PageDefault
  },

  data () {
    return {
      plyrOptions: {
        autopause: false,
        controls: [
          'play',
          'volume',
          'progress',
          'duration'
        ]
      },
      music: {
        albums: [
          {
            title: 'BOOM FOREVER',
            cover: require('@/assets/music/BOOM_FOREVER/cover.jpg'),
            tracksContext: require.context('@/assets/music/BOOM_FOREVER/', true, /\.(mp3)$/),
            nowPlayingTrackTitle: null,
            tracks: [
              {
                title: 'CULT DAYS',
                path: require('@/assets/music/BOOM_FOREVER/01_CULT_DAYS.mp3'),
                nowPlaying: false
              },
              {
                title: 'BOOM FOREVER',
                path: require('@/assets/music/BOOM_FOREVER/02_BOOM_FOREVER.mp3'),
                nowPlaying: false
              },
              {
                title: 'SLACK',
                path: require('@/assets/music/BOOM_FOREVER/03_SLACK.mp3'),
                nowPlaying: false
              },
              {
                title: 'MOVE BITCH',
                path: require('@/assets/music/BOOM_FOREVER/04_MOVE_BITCH.mp3'),
                nowPlaying: false
              },
              {
                title: 'ATTITUDE',
                path: require('@/assets/music/BOOM_FOREVER/05_ATTITUDE.mp3'),
                nowPlaying: false
              },
              {
                title: 'O I C U',
                path: require('@/assets/music/BOOM_FOREVER/06_OICU.mp3'),
                nowPlaying: false
              },
              {
                title: 'REAL LOVE (PROD. GHOST DAD)',
                path: require('@/assets/music/BOOM_FOREVER/REAL_LOVE_(PROD_GHOST_DAD).mp3'),
                nowPlaying: false
              }
            ]
          }
        ]
      }
    }
  },

  destroyed () {
    // console.log('destroy music page')
  },

  methods: {
    stopMusicOtherThan (trackID) {
      let plyrs = this.$refs.plyr
      for (let player in plyrs) {
        if (player !== trackID) {
          plyrs[player].player.pause()
        }
      }
    },
    playTrack (aID, tID) {
      let plyr = this.$refs.plyr[aID].player
      let album = this.music.albums[aID]
      let track = album.tracks[tID]

      album.tracks.forEach((track) => {
        track.nowPlaying = false
      })
      track.nowPlaying = true
      album.nowPlayingTrackTitle = track.title

      plyr.source = {
        type: 'audio',
        title: track.title,
        sources: [
          {
            src: track.path,
            type: 'audio/mp3'
          }
        ]
      }
      plyr.play()
    },
    trackPlayed (aID, tID) {
      console.log(trackID + ' played')
      // this.stopMusicOtherThan(trackID.split('.')[1])
    },
    loadMusic () {
      console.log('Loading music directory..')
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
  margin-top: 50px;
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

  .player-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0 10px;
    max-width: 400px;

    .now-playing-title {
      flex: 1 1 80%;
      font-weight: bold;
    }

    .player {
      flex: 3 3 auto;
    }
  }

  .tracks {
    flex: 2 2 auto;
    text-align: left;
    padding-left: 20px;

    .album-title {
      font-size: 48px;
      font-weight: bold;
    }
  }
}

.track {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  position: relative;

  &.now-playing {
    background: yellow;
    font-weight: bold;
  }

  &:hover {
    .track-title {
      color: white;
      cursor: pointer;
      background: black;
      border-color: yellow;
    }
    .track-number {
      color: black;
    }
  }

  .track-title {
    flex: 1 1 auto;
    border-top: 5px solid black;
    border-left: 50px solid black;
    padding-left: 10px;
  }

  .track-number {
    position: absolute;
    display: inline-block;
    left: 22px;
    color: white;
    z-index: 10;
    font-weight: bold;
  }
}
</style>
