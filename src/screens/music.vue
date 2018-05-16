<template>
  <page-default>
    <div class="music">
      <div v-for="(album, aindex) in music.albums"
           :key="aindex"
           class="album columns is-centered is-fluid">
        <div class="cover column is-one-third">
          <img :src="album.cover">
        </div>
        <div class="tracks column is-two-thirds">
          <div class="album-title">
            {{ album.title }}
            <a :href="album.download">
              <img src="@/assets/images/download.png">
            </a>
          </div>
          <div class="player-row">
            <div class="now-playing-title">
              {{ album.nowPlayingTrackTitle || '' }}
            </div>
            <plyr class="player"
                  ref="plyr"
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
import MusicData from '@/screens/music/music_mixin.js'

export default {
  components: {
    Plyr,
    PageDefault
  },

  mixins: [ MusicData ],

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
      }
    }
  },

  mounted () {
    // this.loadMusic()
  },

  methods: {
    stopMusicOtherThan (aID) {
      let plyrs = this.$refs.plyr
      for (let player in plyrs) {
        if (player !== aID) {
          plyrs[player].player.pause()
        }
      }
    },
    playTrack (aID, tID) {
      // identify what track is playing
      let plyr = this.$refs.plyr[aID].player
      let album = this.music.albums[aID]
      let track = album.tracks[tID]

      // unset all Now Playing data
      this.music.albums.forEach((album) => {
        album.nowPlayingTrackTitle = null
        album.tracks.forEach((track) => {
          track.nowPlaying = false
        })
      })

      // set correct Now Playing data
      track.nowPlaying = true
      album.nowPlayingTrackTitle = track.title

      // stop all other players and play the track
      this.stopMusicOtherThan(aID)
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
  margin: 50px 0;
  padding: 0 7.5%;
}

.album {
  margin-bottom: 50px;
  .cover {
    img {
      width: 350px;
    }
  }

  .player-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0 10px;

    .now-playing-title {
      flex: 1 1 auto;
      font-weight: bold;
    }

    .player {
      flex: 3 3 auto;
    }
  }

  .tracks {
    text-align: left;
    padding-left: 15px;

    .album-title {
      font-size: 48px;
      font-weight: bold;
      line-height: 38px;

      a{
        border: 0;
        img {
          width: 24px;
          padding: 5px;
          border: 2px solid black;

          &:hover {
              border-bottom-width: 5px;
              transform: translateY(-2px);
          }
        }
      }
    }
  }
}

.track {
  margin: 15px 0;
  display: flex;
  cursor: pointer;
  margin-left: 22px;
  position: relative;
  flex-direction: row;
  transition: padding 50ms;
  box-shadow: 5px 5px 0px 0px black;

  &.now-playing {
    font-weight: bold;
    box-shadow: 10px 10px 5px 0px black;
    color: black;
    background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 600% 600%;
    animation: rainbow 6s ease infinite;

    &:hover {
      box-shadow: 10px 10px 5px 0px black;
    }
  }

  &:hover {
    font-weight: bold;
    transform: scale(1.05, 1.25);
    box-shadow: 7.5px 7.5px 2.5px 0px black;
  }

  .track-title {
    flex: 1 1 auto;
    padding: 5px 10px;
  }

  .track-number {
    left: -25px;
    color: black;
    z-index: 10;
    font-weight: bold;
    position: absolute;
    display: inline-block;
  }
}

@keyframes rainbow {
  0%,
  100% {
    background-position:0% 82%;
  }
  50% {
    background-position:100% 19%;
  }
  100% {
    background-position:0% 82%;
  }
}
</style>
