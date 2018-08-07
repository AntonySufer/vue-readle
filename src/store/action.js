import * as types from './mutation-types.js'
//理解 { commit } ,
// { dispatch: local.dispatch,
//   commit: local.commit,
//   getters: local.getters,
//   state: local.state,
//   rootGetters: store.getters,
//   rootState: store.state
// }
export default{
  showloader:({ commit }) => {
    commit( types.SHOWLOADING )
  },
  hideloader:({ commit }) => {
    commit( types.HIDELOADING )
  },
  showBar:({ commit }) => {
    commit( types.SHOWBAR )
  },
  hideBar:({ commit }) => {
    commit( types.HIDEBAR )
  },
  setUser:({ commit},userInfo) => {
    commit( types.SETUSERINFO,userInfo )
  },
  upbooklist:({ commit},bookItem) => {
    commit( types.UPBOOKLIST,bookItem )
  }

}
