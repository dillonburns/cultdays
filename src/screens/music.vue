<template>
  <page-default>
    <div class="music">
      <div v-for="(album, aindex) in music.albums"
           :key="aindex"
           class="album columns is-centered is-fluid">
        <div class="cover column is-5">
          <div class="album-cover"
               :style="{ backgroundImage: 'url(' + album.cover + ')' }"/>
          <div class="player-row"
             :class="{ 'hidden': album.nowPlayingTrackTitle === null}">
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
        </div>
        <div class="tracks column is-7">
          <div class="album-title">
            {{ album.title }}
            <a :href="album.download">
              <img src="@/assets/images/download.png">
            </a>
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
    stopMusicOtherThan (aID) {
      let plyrs = this.$refs.plyr
      for (let player in plyrs) {
        if (player !== aID) {
          plyrs[player].player.pause()
        }
      }
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
@import '~bulma/sass/utilities/_all.sass';
@mixin rainbowBackground {
  background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) !important;
  background-size: 600% 600% !important;
  animation: rainbow 10s ease infinite !important;
}

.music {
  color: black;
  margin: 50px 0;
  padding: 0 7.5%;
}

.album {
  margin-bottom: 50px;
  .album-cover {
    width: 350px;
    height: 350px;
    background-size: 100%;
  }

  .player-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0 10px;
    opacity: 1;
    transition: opacity 500ms;

    &.hidden {
      opacity: 0;
    }

    .now-playing-title {
      font-weight: bold;
    }

    .player {
      width: 100%;
    }
  }

  .tracks {
    text-align: left;
    padding-left: 15px;

    .album-title {
      font-size: 48px;
      font-weight: bold;
      line-height: 38px;

      @include mobile {
        font-size: 32px;
        line-height: 24px;
      }

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
    @include rainbowBackground;

    &:hover {
      box-shadow: 10px 10px 5px 0px black;
    }
  }

  &:hover {
    font-weight: bold;
    transform: scale(1.05, 1.05);
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

/deep/ > .plyr--audio {
  &.plyr--playing {
    .plyr__control {
      @include rainbowBackground;
    }
  }
  .plyr__control {
    color: black !important;
    &:hover {
      @include rainbowBackground;
    }
  }
  .plyr__progress,
  .plyr__volume {
    input[type=range] {
      color: black !important;
    }
  }
}
</style>
