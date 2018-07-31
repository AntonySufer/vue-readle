<!--
//art  首页
-->
<template>

  <div class="history-content" id="historyList">
    <Loading v-show="showLoading"></Loading>
    <HDEADERS v-bind:if_back="1"></HDEADERS>

    <betterScroll
      class="wrapper his-con"
      ref="scroll"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
       @pullingUp="getArt">
      <transition name="common-fade" mode="out-in">
         <ul class="content">
           <li  class="his-list" v-for="(item, index) in artData"  @click="goDeatail(item.art_id)">
             <p class="his-title"  v-show="item.title" v-text="item.title"></p>
             <p class="his-date" v-show="item.entry_date"  v-text="item.entry_date"></p>
           </li>

         </ul>
      </transition>
    </betterScroll>
    </div>
</template>


<script type="text/javascript">
  import HDEADERS from '../components/header.vue'
  import {mapState,mapMutations} from 'vuex'
 export default {
    components: {
      HDEADERS

    },
    data () {
      return {
        artData:[],
        page:1,
        isloading:true,
        scrollbarObj: false,
        pullDownRefreshObj:false,
        pullUpLoadObj: { // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        startY:80,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700
      }
    },
    computed: {
      ...mapState(['showLoading'])
    },
   created:function () {
     this.getArt();
   },

   mounted(){

   },
    methods:{
      /*获取首页*/
      getArt(){
        var _this = this ;
        if(!_this.isloading){
          return false ;
        }

        this.$axios.post(_this.$api.getHistory,{"page":_this.page}).then((reVo)=>{
            let artD = reVo.data;
            console.log('数据请求成功');
            if (artD && artD.code==200){
              _this.isloading =true ;
                _this.artData = _this.artData.concat(artD.data);

                if (artD.data.length<15 && _this.page==1 ){
                  _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll
                  _this.isloading =false ;
                }
              _this.$refs.scroll.forceUpdate(true); //重启跳槽scroll
              _this.page++;
             }else{
              _this.isloading =false ;
              _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll

            }

             }).catch((err)=>{
             _this.isloading =false ;
            _this.page =  _this.page > 1 ? _this.page-1:_this.page ;
            _this.showToast( err.message,'warn');

          })

      },
       goDeatail:function (id) {
        if (!id){
          return ;
        }
        this.$router.push({name: 'art',params:{'id':id}});
      }
    }
  }
</script>

