export default {
  data () {
    return {
      music: {
        albums: [
          {
            title: 'FIRE FLAMES HARDBODY KARATE',
            cover: require('@/assets/music/FIRE_FLAMES/cover.jpg'),
            tracksContext: require.context('@/assets/music/FIRE_FLAMES/', true, /\.(mp3)$/),
            nowPlayingTrackTitle: null,
            nowPlayingTrackID: null,
            tracks: [
              {
                title: 'SMOOTH OPERATOR',
                path: require('@/assets/music/FIRE_FLAMES/SMOOTH_OPERATOR.mp3')
              },
              {
                title: 'BAD GYAL',
                path: require('@/assets/music/FIRE_FLAMES/BAD_GYAL.mp3')
              },
              {
                title: 'LOONY GOON',
                path: require('@/assets/music/FIRE_FLAMES/LOONY_GOON.mp3')
              },
              {
                title: 'FASHION (FEAT. KOOL A.D.)',
                path: require('@/assets/music/FIRE_FLAMES/FASHION_(FEAT._KOOL_A.D.).mp3')
              },
              {
                title: 'HIPPY RAPPER',
                path: require('@/assets/music/FIRE_FLAMES/HIPPY_RAPPER.mp3')
              },
              {
                title: 'GET UP',
                path: require('@/assets/music/FIRE_FLAMES/GET_UP.mp3')
              },
              {
                title: 'NO ATTACHMENTS',
                path: require('@/assets/music/FIRE_FLAMES/NO_ATTACHMENTS.mp3')
              },
              {
                title: 'WAR',
                path: require('@/assets/music/FIRE_FLAMES/WAR.mp3')
              },
              {
                title: 'BORN 2 B FREE',
                path: require('@/assets/music/FIRE_FLAMES/BORN_2_B_FREE.mp3')
              },
              {
                title: 'ALL DAY (FEAT. KOOL A.D.)',
                path: require('@/assets/music/FIRE_FLAMES/ALL_DAY_(FEAT._KOOL_A.D.).mp3')
              },
              {
                title: 'CLOSER',
                path: require('@/assets/music/FIRE_FLAMES/CLOSER.mp3')
              },
              {
                title: 'NOTHIN BUT LOVE',
                path: require('@/assets/music/FIRE_FLAMES/NOTHIN_BUT_LOVE.mp3')
              },
              {
                title: 'LIFECHANGING LOVE',
                path: require('@/assets/music/FIRE_FLAMES/LIFECHANGING_LOVE.mp3')
              },
              {
                title: 'I NEED U (FEAT. KOOL A.D.)',
                path: require('@/assets/music/FIRE_FLAMES/I_NEED_U_(FEAT._KOOL_A.D.).mp3')
              }
            ]
          },
          {
            title: 'NEON ROSE',
            cover: require('@/assets/music/NEON_ROSE/cover.jpg'),
            tracksContext: require.context('@/assets/music/NEON_ROSE/', true, /\.(mp3)$/),
            nowPlayingTrackTitle: null,
            tracks: [
              {
                title: 'TIME AWAY',
                path: require('@/assets/music/NEON_ROSE/TIME_AWAY.mp3')
              },
              {
                title: 'NAKED RAIN',
                path: require('@/assets/music/NEON_ROSE/NAKED_RAIN.mp3')
              },
              {
                title: 'CREEPIN',
                path: require('@/assets/music/NEON_ROSE/CREEPIN.mp3')
              },
              {
                title: 'KNOCK KNOCK',
                path: require('@/assets/music/NEON_ROSE/KNOCK_KNOCK.mp3')
              },
              {
                title: 'BAD GIRL',
                path: require('@/assets/music/NEON_ROSE/BAD_GIRL.mp3')
              },
              {
                title: 'MY SWEET LORD',
                path: require('@/assets/music/NEON_ROSE/MY_SWEET_LORD.mp3')
              },
              {
                title: 'KING OF HEARTS',
                path: require('@/assets/music/NEON_ROSE/KING_OF_HEARTS.mp3')
              },
              {
                title: 'BEST I HAD',
                path: require('@/assets/music/NEON_ROSE/BEST_I_HAD.mp3')
              },
              {
                title: 'DISCO',
                path: require('@/assets/music/NEON_ROSE/DISCO.mp3')
              },
              {
                title: 'ATTI2UDE',
                path: require('@/assets/music/NEON_ROSE/ATTI2UDE.mp3')
              },
              {
                title: 'ROCKSTEADY',
                path: require('@/assets/music/NEON_ROSE/ROCKSTEADY.mp3')
              },
              {
                title: 'HUNTED',
                path: require('@/assets/music/NEON_ROSE/HUNTED.mp3')
              },
              {
                title: 'BLACK AND BLUE',
                path: require('@/assets/music/NEON_ROSE/BLACK_AND_BLUE.mp3')
              }
            ]
          },
          {
            title: 'BOOM FOREVER',
            cover: require('@/assets/music/BOOM_FOREVER/cover.jpg'),
            tracksContext: require.context('@/assets/music/BOOM_FOREVER/', true, /\.(mp3)$/),
            nowPlayingTrackTitle: null,
            tracks: [
              {
                title: 'CULT DAYS',
                path: require('@/assets/music/BOOM_FOREVER/01_CULT_DAYS.mp3')
              },
              {
                title: 'SLACK',
                path: require('@/assets/music/BOOM_FOREVER/03_SLACK.mp3')
              },
              {
                title: 'BOOM FOREVER',
                path: require('@/assets/music/BOOM_FOREVER/02_BOOM_FOREVER.mp3')
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
                title: 'REAL LOVE (PROD. GHOST DAD)',
                path: require('@/assets/music/BOOM_FOREVER/REAL_LOVE_(PROD_GHOST_DAD).mp3')
              }
            ]
          }
        ]
      }
    }
  }
}
