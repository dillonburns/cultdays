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
              {{ album.nowPlayingTrackTitle || 'click a song bitch' }}
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
      line-height: 35px;

      a{
        border: 0;
        img {
          width: 24px;
          padding: 5px;
          border: 1px solid black;

          &:hover {
              border-bottom-width: 2px;
              transform: translateY(-2px);
          }
        }
      }
    }
  }
}

.track {
  display: flex;
  position: relative;
  margin-bottom: 15px;
  flex-direction: row;

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
