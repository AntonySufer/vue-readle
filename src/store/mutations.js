import { SHOWLOADING,HIDELOADING,SHOWBAR,HIDEBAR,SETUSERINFO,GETUSERINFO } from './mutation-types.js'


const mutations = {
  [SHOWLOADING](state){
    state.showLoading = true;
  },
  [HIDELOADING](state){
    state.showLoading = false;
  },
  [SHOWBAR](state){
    state.showBar = true;
  },
  [HIDEBAR](state){
    state.showBar = false;
  },
  [SETUSERINFO](state,userInfo){
    state.userInfo = userInfo;
  }
}

export default mutations

