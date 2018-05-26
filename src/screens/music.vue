<template>
  <page-default>
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
import { mapGetters } from 'vuex'
import PageDefault from '@/components/page_default'
import MusicData from '@/screens/music/music_mixin.js'

// const FAKE_LOADING_TIME = 300

export default {
  components: {
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
          'play-large',
          'volume',
          'progress',
          'duration'
        ]
      }
    }
  },

  computed: {
    trackPlaying () {
      return this.nowPlaying.track.title !== null
    },
    ...mapGetters({
      trackPlaying: 'isTrackPlaying',
      nowPlaying: 'getNowPlaying'
    })
  },

  mounted () {
    if (this.$route.params.album && this.$route.params.track) {
      this.playTrackFromRouterParams(this.$route.params.album, this.$route.params.track)
    } else if (this.trackPlaying) {
      this.setRouteParameters(this.nowPlaying)
    }
  },

  methods: {

    playTrack (album, track) {
      this.setNowPlaying(album, track)
      this.trackGoogleAnalytics(this.nowPlaying)
      this.setRouteParameters(this.nowPlaying)
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

      let nowPlaying = {
        track: track,
        album: album,
        cover: album.cover
      }

      this.$store.commit('setNowPlaying', nowPlaying)
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
</style>
