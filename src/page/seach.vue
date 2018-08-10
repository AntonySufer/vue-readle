<template>

  <div id="seach" class="seach-content">
    <Loading v-show="showLoading"></Loading>
    <div class="seach-header">
      <p> <span @click="$router.goBack()" class="header-back" > < </span> </p>
      <p class="input-p"><input class="sea-input" placeholder="请输入小说名" v-model="query" type="text" maxlength="50" /></p>
      <p class="img-p" @click="getSearch"><img class="menu-img" src="@assets/img/search.png"/></p>
    </div>

    <div v-if="isHistory" class="sea-con">
      <div class="his-list">
          <p class="his-tit">最近搜索历史</p>
         <div class="his-li">
           <span  v-for="(item, index) in hisStore"  @click="goSeach(item)" v-text="item"></span>
         </div>
        <div class="remove-his" @click="delHisStore">
          <img src="@assets/img/delete.png"/>
          <span>清空历史记录</span>
        </div>
      </div>

    </div>
    <div class="his-no-search" v-else >
       <p>您还没有搜索过小说哦</p>
    </div>

    <betterScroll

      class="wrapper sea-list"
      ref="scroll"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
      @pullingUp="getSearch"  v-show="isSeach">
      <transition name="common-fade" mode="out-in">
        <div class="sea-ul">
          <div class="sea-li" v-for="(item, index) in booksList"  @click="goDeatail(item._id)">
            <div class="img-div">
              <img v-bind:src="item.cover" :onerror="defaultImg" />
            </div>
            <div>
              <p class="sea-li-tit" v-text="item.title">这是标题</p>
              <p class="sea-li-readme">{{item.latelyFollower}}人关注|{{item.retentionRatio}}%读者留存|{{item.author}}著</p>
              <p class="sea-li-jieshao" v-html="item.shortIntro"></p>
            </div>
          </div>
        </div>
      </transition>
    </betterScroll>


  </div>


</template>



<script type="text/javascript">
  import {mapState,mapMutations} from 'vuex';
 export default {
    components: {
    },
    data () {
      return {
        defaultImg: 'this.src="' + require('@assets/img/error.jpg') + '"',
        query:'',
        start:0,
        limit:20,
        booksList:[],
        isHistory:false,
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
        startY:0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        isSeach:false,
        hisStore:this.$util.getStore('hisStore') || [] //你是记录
      }
    },

    computed:{
      ...mapState(['showLoading']),
    },
    created(){
        //初始化判断是否有查询
       if (this.hisStore && this.hisStore.length> 0){
          this.query = this.hisStore[Number(this.hisStore.length)-1];
         this.isHistory =true ;

       }else{
          this.isHistory =false ;
       }

    },
    methods:{
      /*获取首页*/
      getSearch(){
        let _this = this ;

        if(!_this.isloading){
          return false ;
        }
        if (!_this.query){
          _this.showToast( '小说名呢','warn');
          return ;
        }

        //临时储存query，用于前后判读
        let old_query =this.$util.getStore('query');
        console.log(old_query);
        if (old_query != _this.query){
          _this.$util.setStore('query',_this.query);
          _this.booksList = [];
          _this.start = 0;
        }

        this.isSeach=true;
        let query ='query='+_this.query+'&start='+_this.start+'&limit='+_this.limit;
        this.$axios.get(this.$api.searchList+query).then((response)=>{
           if (response.status==200 ){
             let booksList = response.data.books;
             _this.isloading =true ;
             if (!booksList || booksList.length ==0){
               _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll
               _this.isloading =false ;
                 return ;
             }
             booksList.map((item) => {
                 item.cover = item.cover ? this.$util.url2Real(item.cover):'../assets/img/error.jpg';
                 item.shortIntro = item.shortIntro.length > 60 ? item.shortIntro.substr(0,60) : item.shortIntro ;
             });

             if (booksList.length<15 && _this.start==0 ){
               _this.booksList =booksList ;
               _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll
               _this.isloading =false ;
               if (_this.hisStore.indexOf(_this.query)<0){
                 _this.hisStore.push(_this.query);
                 _this.$util.setStore('hisStore',_this.hisStore);
               }
               return ;
             }

             setTimeout(()=>{
               _this.booksList = _this.booksList.concat(booksList);
               _this.$refs.scroll.forceUpdate(true); //重启跳槽scroll
             },700);


             _this.start++;

             //把搜索历史添加到store
             if (_this.hisStore.indexOf(_this.query)<0){
               _this.hisStore.push(_this.query);
               _this.$util.setStore('hisStore',_this.hisStore);
             }

           }else{
             _this.isloading =false ;
             _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll
           }


        }).catch((err)=>{
          _this.isloading =false ;
          _this.page =  _this.page > 1 ? _this.page-1:_this.page ;
          _this.$refs.scroll.forceUpdate(false); //重启跳槽scroll
          _this.showToast( err.message,'warn');
        })
      },
      goDeatail:function (id) {
        if (!id){
          return ;
        }
        this.$router.push({name: 'book',params:{'id':id}});
      },

      delHisStore() {
        this.$util.removeStore('hisStore');
        this.isHistory =false;
        this.query='';
      },
      goSeach(item){
          this.query =item;
          this.start = 0 ;
          this.booksList=[];
          this.getSearch();
      }


    }


  }
</script>

