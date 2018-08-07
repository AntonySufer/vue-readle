<template>

  <div id="book" class="book-content">
    <HEADERS v-bind:if_back="1" v-bind:toPath="toPath"></HEADERS>
    <Loading v-show="showLoading"></Loading>
    <div class="book-tit-con">

       <div class="tit-div clearfix">
            <div class="tit-img">
              <img v-bind:src="bookItem.cover"/>
            </div>
            <div class="tit-readme">
              <p v-text="bookItem.title"></p>
              <p><span v-text="bookItem.author"></span> | <span v-text="bookItem.cat"></span> | <span v-text="bookItem.wordCount"></span></p>
              <p v-text="bookItem.lastChapter"></p>
            </div>
       </div>
       <div class="button-div">
          <div  class="addbook" v-bind:class="[hisBookClass]"  @click="upBook(hisBookClass)">
            {{hisBookText}}
          </div>
         <div class="addbook" @click="upBook(2)" >
            开始阅读
         </div>

       </div>

       <div class="book-per">
         <div class="book-per-li">
           <p>追书人数</p>
           <p v-text="bookItem.latelyFollower"></p>
         </div>
         <div class="book-per-li">
           <p>读者留存率</p>
           <p v-text="bookItem.retentionRatio"></p>
         </div>
         <div class="book-per-li">
           <p>日更新字数</p>
           <p >{{bookItem.serializeWordCount > 0 ? bookItem.serializeWordCount : 500}}</p>
         </div>
       </div>

       <p class="book-read" v-text="bookItem.longIntro">

       </p>




    </div>


  </div>


</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">
import HEADERS from '@components/header.vue'
import {mapState,mapActions,mapGetters} from 'vuex'

 export default {
    components: {
      HEADERS
    },
    data () {
      return {
        toPath:'',
        hisBookClass:'',
        hisBookText:'+ 追更新',
        bookItemStore:this.$util.getStore('bookIdList') || [], //小说记录
         bookItem:{},
         id:this.$route.params.id ||''  //文章id
      }
    },

    watch:{

    },
    computed:{
      ...mapState(['showLoading']),

    },
    created(){
      if (!this.id){
          this.$router.goBack();
          return ;
      }
      this.getDetail();
    },

   methods: {
      ...mapActions(['upbooklist']), //本地数据操作
      getDetail(){
          let _this = this ;
        this.$axios.get(this.$api.getBookDet + this.id).then((response) => {
          if (response.status == 200) {
             let bookItem = response.data;
            let count = bookItem.wordCount;
            bookItem.wordCount = count ? _this.$util.wordCount2Str(count) :0;
            bookItem.cover = bookItem.cover ?_this.$util.url2Real(bookItem.cover):'../assets/img/error.jpg';
            _this.bookItem =bookItem;

            ////判读是否是书架小说
            let booklistStr = _this.bookItemStore;
            _this.hisBookClass = booklistStr.indexOf(bookItem._id)>-1 ? 'graybook':'' ;
            _this.hisBookText =  _this.hisBookClass ? '不追了' :'+ 追更新';
          }

        }).catch((err) => {
          _this.showToast(err.message, 'warn');
        })
      },

      upBook(type){
          let action= {
              "data":this.bookItem
          };
          //进行缓存本地数据
          if(type=='graybook'){ //已经存储 ，取消
            this.hisBookClass = '';
            this.hisBookText = '追更新';
            action.type ='remove';
            this.upbooklist(action);
            this.showToast('取消书架成功', 'success');
          }else{
            //判断是否已是书架小说
             let idData =   this.$util.getStore('bookIdList') || []
             if(idData.indexOf(this.bookItem._id)> -1){
                 //存在
               //直接打开以前阅读的章节
               let bookData = this.$util.getOneBookStore(this.bookItem._id);

                let   page = 0 ;
                let scrollTop =0 ;
               if (bookData ){
                  page = bookData.page || 0 ;
                 scrollTop = bookData.scrollTop || 0 ;
               }

               this.$router.push({name: 'chapter',params:{'id':this.bookItem._id,'page':page,'top':scrollTop}});
               return ;
             }

            action.type ='add';
            this.upbooklist(action);
            this.hisBookClass = 'graybook';
            this.hisBookText = '不追了';
            this.showToast('添加书架成功', 'success');
            if(type ==2){
              this.$router.push({name: 'chapter',params:{'id':this.bookItem._id,'page':'0','top':0}});
            }
          }
      }

    }

  }
</script>

