import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)


let state={
  showLoading:false,
  showBar:false,
  userInfo:{}
}

var  store = new Vuex.Store({
  state,actions,getters,mutations
});



export default store;
