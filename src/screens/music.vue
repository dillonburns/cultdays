<template>
  <page-default :fixed-header="trackPlaying">
    <div slot="header-slot"
         class="columns is-centered is-mobile">
      <div class="player-row column is-11-mobile is-9-tablet is-6-desktop"
           :class="{'hidden': !trackPlaying }">
        <div class="now-playing-cover">
          <img :src="nowPlaying.album.cover">
        </div>
        <div class="now-playing-track">
          <div class="now-playing-title">
            {{ nowPlaying.album.tracks.indexOf(nowPlaying.track) + 1 }}. {{ nowPlaying.track.title }}
          </div>
          <plyr class="player"
                ref="plyr"
                :emit="['ended']"
                @ended="nextTrack(nowPlaying.album, nowPlaying.track)"
                :options="plyrOptions">
            <audio>
              <source :src="null"
                      type="audio/mp3" />
            </audio>
          </plyr>
        </div>
      </div>
    </div>
    <div class="music">
      <div v-for="(album, aindex) in music.albums"
           :key="aindex"
           class="album columns is-centered is-fluid">
        <div class="cover column is-5">
          <img class="album-cover" :src="album.cover">
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
               :class="{ 'now-playing': isPlaying(track)}">
            <div class="track-title"
                 @click="playTrack(album, track)">
              <span class="track-number">{{ tindex + 1 }}</span>{{ track.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-default>
</template>

<script>
import { Plyr } from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import PageDefault from '@/components/page_default'
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
      },
      nowPlaying: {
        track: {
          title: null,
          path: null
        },
        album: {
          title: null,
          cover: null
        }
      }
    }
  },

  computed: {
    trackPlaying () {
      return this.nowPlaying.track.title !== null
    }
  },

  mounted () {
    if (this.$route.params.album && this.$route.params.track) {
      this.playTrackFromRouterParams(this.$route.params.album, this.$route.params.track)
    }
  },

  methods: {

    playTrack (album, track) {
      this.setNowPlaying(album, track)

      this.trackGoogleAnalytics(this.nowPlaying)
      this.setRouteParameters(this.nowPlaying)
      setTimeout(() => this.loadTrack(this.nowPlaying), 600)
    },

    nextTrack (album, track) {
      this.$ga.event({
        eventCategory: 'Music',
        eventAction: 'Finished Song',
        eventLabel: track.title
      })

      let nextTrack = album.tracks[album.tracks.indexOf(track) + 1]

      if (nextTrack) {
        this.playTrack(album, nextTrack)
      }
    },

    playTrackFromRouterParams (aSlug, tSlug) {
      let album = this.music.albums.filter(
        album => slugify(album.title) === aSlug
      )[0]

      let track = album.tracks.filter(
        track => slugify(track.title) === tSlug
      )[0]

      this.playTrack(album, track)
    },

    setNowPlaying (selectedAlbum, selectedTrack) {
      let album = this.music.albums.filter(
        album => album.title === selectedAlbum.title
      )[0]

      let track = album.tracks.filter(
        track => track.title === selectedTrack.title
      )[0]

      this.nowPlaying = {
        track: track,
        album: album,
        cover: album.cover
      }
    },

    loadTrack (nowPlaying) {
      let track = nowPlaying.track

      let plyr = this.$refs.plyr.player

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

      this.trackGoogleAnalytics(this.nowPlaying)
    },

    setRouteParameters (nowPlaying) {
      this.$router.push({
        path: `/music/${slugify(nowPlaying.album.title)}/${slugify(nowPlaying.track.title)}`
      })
    },

    trackGoogleAnalytics (nowPlaying) {
      this.$ga.event({
        eventCategory: 'Music',
        eventAction: 'Play Album',
        eventLabel: nowPlaying.album.title
      })
      this.$ga.event({
        eventCategory: 'Music',
        eventAction: 'Play Song',
        eventLabel: nowPlaying.track.title
      })
    },

    isPlaying (track) {
      return (track.title === this.nowPlaying.track.title)
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

const slugify = (name) => name.toLowerCase().replace(/\W/g, '')

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

.player-row {
  margin: 15px 0;
  opacity: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 500ms;
  justify-content: center;

  @include mobile {
    margin: 0 0 25px;
  }

  &.hidden {
    opacity: 0;
    height: 0;
  }

  .now-playing-title {
    color: black;
    text-align: left;
    font-weight: bold;

    @include mobile {
      font-size: 14px;
    }
  }

  .now-playing-track {
    flex: 1 1 auto;
  }

  .now-playing-cover {
    flex: 0 0 auto;
    width: 100px;
    height: auto;
    margin-right: 15px;
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
  }

  .tracks {
    text-align: left;
    padding-left: 25px;
    text-align: left;

    @include mobile {
      padding: 0.75rem;
    }

    .album-title {
      font-size: 48px;
      font-weight: bold;
      line-height: 38px;
      text-align: left;
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
  font-weight: bold;
  cursor: pointer;
  margin-left: 22px;
  position: relative;
  flex-direction: row;
  transition: box-shadow 75ms;
  box-shadow: 5px 5px 0px 0px black;

  @include mobile {
    margin-left: 0;
    margin-bottom: 20px;
    padding: 5px 0;
  }

  &.now-playing {
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
    transform: translate(-2.5px, -2.5px);
    box-shadow: 7.5px 7.5px 2.5px 0px black;
  }

  .track-title {
    flex: 1 1 auto;
    padding: 5px 10px;
  }

  .track-number {
    left: -15px;
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
    background: inherit;
  }

  &.plyr--playing {
    .plyr__control {
      background: linear-gradient(124deg, #ff2400, #e81d1d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
      background-size: 600% 600%;
      animation: rainbow 10s ease infinite;
      box-shadow: 7.5px 7.5px 5px 0px black;
      transform: translate(-2.5px, -2.5px);
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
    margin-right: 10px;

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
