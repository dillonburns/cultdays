<template>
  <page-default>
    <div class="music">
      <div v-for="(album, aindex) in music.albums"
           :key="aindex"
           class="album columns is-centered is-fluid">
        <div class="cover column is-5">
          <img class="album-cover" :src="album.cover">
          <div class="player-row"
             :class="{ 'hidden': album.nowPlayingTrackTitle === null}">
          <div class="now-playing-title">
            {{ album.nowPlayingTrackTitle || '' }}
          </div>
          <plyr class="player"
                ref="plyr"
                :emit="['ended']"
                @ended="nextTrack(aindex, album.nowPlayingTrackID)"
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
            <a v-if="album.download"
               :href="album.download">
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

  metaInfo: {
    title: 'Music'
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

  methods: {
    playTrack (aID, tID) {
      // identify what track is playing
      let plyr = this.$refs.plyr[aID].player
      let album = this.music.albums[aID]
      let track = album.tracks[tID]

      // unset all Now Playing data
      this.music.albums.forEach((album) => {
        album.nowPlayingTrackTitle = null
        album.nowPlayingTrackID = null
        album.tracks.forEach((track) => {
          track.nowPlaying = false
        })
      })

      // set correct Now Playing data
      track.nowPlaying = true
      album.nowPlayingTrackTitle = track.title
      album.nowPlayingTrackID = tID

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
    nextTrack (aID, tID) {
      let nextTrackID = tID + 1
      console.log('next track')
      console.log(this.music.albums[aID].tracks[nextTrackID])
      if (this.music.albums[aID].tracks[nextTrackID] != null) {
        // Wait 600ms and go to next track
        setTimeout(() => this.playTrack(aID, nextTrackID), 600)
      }
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
      // UNUSED. MAY LOAD SONGS VIA DIRECTORY IN THE FUTURE
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
.music {
  color: black;
  margin: 75px 0;
  padding: 0 5%;

  @include mobile {
    padding: 0 7.5%;
  }
}

.album {
  margin-bottom: 75px;

  .cover {
    .album-cover {
      max-width: 500px;
      width: 100%;
      height: auto;
      margin: auto;
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
  }

  .tracks {
    text-align: left;
    padding-left: 25px;
    text-align: right;

    @include mobile {
      padding: 0.75rem;
    }

    .album-title {
      font-size: 48px;
      font-weight: bold;
      line-height: 38px;
      text-align: right;
      margin-bottom: 35px;

      @include mobile {
        font-size: 32px;
        line-height: 24px;
      }

      a{
        border: 0;
        img {
          width: 24px;
          padding: 5px;
          border: 1px solid black;
          box-shadow: 2px 2px 0px 0px black;

          &:hover {
            transform: translate(-1px, -1px);
            box-shadow: 5px 5px 5px 0px black;
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
  transition: all 75ms;
  box-shadow: 5px 5px 0px 0px black;

  @include mobile {
    margin-left: 0;
  }

  &.now-playing {
    font-weight: bold;
    box-shadow: 5px 5px 5px 0px black;
    color: black;
    background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 600% 600%;
    animation: rainbow 10s ease infinite;

    &:hover {
      box-shadow: 7.5px 7.5px 5px 0px black;
    }
  }

  &:hover {
    font-weight: bold;
    transform: translate(-2.5px, -2.5px);
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
  * {
    border-radius: 0;
  }

  &.plyr--playing {
    .plyr__control {
      background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
      background-size: 600% 600%;
      animation: rainbow 10s ease infinite;
      margin-right: 10px;
    }
  }
  .plyr__controls {
    padding-left: 0;
    padding-right: 0;
  }

  .plyr__control {
    color: black !important;
    box-shadow: 5px 5px 0px 0px black;
    border-radius: 0;

    &:hover {
      background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
      background-size: 600% 600%;
      animation: rainbow 10s ease infinite;
      box-shadow: 7.5px 7.5px 5px 0px black;
      transform: translate(-2.5px, -2.5px);
    }
  }
  .plyr__progress,
  .plyr__volume {
    input[type=range] {
      color: black !important;
      border-radius: 0px;
    }
  }
  .plyr__progress--buffer {
    border-radius: 0;
  }
}
</style>
