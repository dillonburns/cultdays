<template>
  <header :class="{ 'hidden' : !trackPlaying}">
    <logo />
    <div class="columns is-centered is-mobile">
      <div class="player-row column is-11-mobile is-9-tablet is-6-desktop"
           :class="{'hidden': !trackPlaying }">
        <div class="now-playing-cover">
          <img :src="nowPlaying.album.cover">
        </div>
        <div v-if="nowPlaying.album && nowPlaying.track"
             class="now-playing-track">
          <div class="now-playing-title">
            {{ nowPlaying.track.title }}
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
  </header>
</template>

<script>
import { Plyr } from 'vue-plyr'
import { mapGetters } from 'vuex'
import Logo from '@/components/logo'

export default {

  components: {
    Plyr,
    Logo
  },

  computed: {
    ...mapGetters({
      trackPlaying: 'isTrackPlaying',
      nowPlaying: 'getNowPlaying'
    })
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
      }
    }
  },

  watch: {
    nowPlaying () {
      this.loadTrack(this.nowPlaying)
    }
  },

  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all.sass';
header {
  margin: 30px auto 20px;
  text-align: center;
  position: fixed;
  background: linear-gradient(to bottom, white 90%, transparent);
  width: 100vw;
  height: auto;
  display: block;
  z-index: 100;
  margin: 0;
  padding: 10px;
  max-width: unset;

  /deep/ .logo {
    height: 50px;
    transition: 150ms all;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
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
