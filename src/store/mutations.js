import { SHOWLOADING,HIDELOADING,SHOWBAR,HIDEBAR,SETUSERINFO,UPBOOKLIST} from './mutation-types.js'
import  commomUtils from '../config/commonUtils'

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
  },
  [UPBOOKLIST](state,action){ //添加书籍

    let localList = commomUtils.getStore('bookList') || [];
    let localBookIdList =  commomUtils.getStore('bookIdList') || [];
    state = {list: localList, id: new Set(localBookIdList)};
    switch(action.type){
      case 'add':

        if (state.id.has(action.data._id)) {
          return state;
        }
        state.list.unshift(action.data);
        state.id.add(action.data._id);
        commomUtils.setStore('bookList', state.list);
        commomUtils.setStore('bookIdList', Array.from(state.id));
        return state;
      case 'remove':
        for (let index in state.list){
          if (state.list[index]._id === action.data._id) {
            state.list.splice(index, 1);
            state.id.delete(action.data._id);
            break;
          }
        }
        commomUtils.setStore('bookList', state.list);
        commomUtils.setStore('bookIdList', Array.from(state.id));
        return state;
      case 'get':
        return state;
      case 'refresh':
        commomUtils.setStore('bookList', action.data);
        state = {list: action.data, id: new Set(localBookIdList)};
        return state;

      default:
        return state;
    }

  }
};

export default mutations

