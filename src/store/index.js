import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({

  state: {
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
  },

  getters: {
    isTrackPlaying: state => state.nowPlaying.track.title !== null,
    getNowPlaying: state => state.nowPlaying,

    getNowPlayingTrackTitle: state => state.nowPlaying.track.title,
    getNowPlayingPath: state => state.nowPlaying.track.path,

    getNowPlayingAlbumTitle: state => state.nowPlaying.album.title,
    getNowPlayingCover: state => state.nowPlaying.album.cover
  },

  mutations: {
    setNowPlaying (state, payload) {
      state.nowPlaying = payload
    }
  }

})

export default store
