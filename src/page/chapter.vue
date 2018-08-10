<template>

  <div id="chapter" class="chapter-content" :style="{background:color1 }" ref="viewBox" >
    <Loading v-show="showLoading"></Loading>
     <div class="head-cha" :style="{background:color1}">
         <p class="head-tit" :style="{color:fzColor }" v-text="chaTitle"></p>
         <div class="color-div" >
           <color-picker :colors="colors1" class="color-picker" v-model="color1" size="small"></color-picker>
           <p class="ml" @click="fontSizefunc(fzSize,'add')"><img class="img1" src="@assets/img/A.png"/></p>
           <p class="mr" @click="fontSizefunc(fzSize,'rud')"><img src="@assets/img/A-.png"/></p>
         </div>

         <pre class="pre-con" :class="fzSize" :style="{background:color1,color:fzColor}" v-html="bodyText">

         </pre>

       <div class="cha-btn-div" v-show="isPageButton">
         <div   class="addbook" :style="{background:color1,color:fzColor}" @click="checkMenu('up')"  >
             <span >上一章</span>
         </div>
         <div  class="addbook no-borders"  :style="{background:color1,color:fzColor}"  @click="checkMenu('menu')"  >
           <img src="@assets/img/btn.png"/>
         </div>
         <div   class="addbook" :style="{background:color1,color:fzColor}" @click="checkMenu('down')">
           <span >下一章</span>
         </div>

       </div>
       <!--菜单-->
       <div v-transfer-dom >
         <popup v-model="showMenu" position="bottom"   max-height="40%">
           <group gutter="0px" >
             <cell class="cell-ref" v-for="i in ['目录','返回作品','返回首页','取消']" :key="i" :title="i" @click.native="menuFunc(i)"></cell>
           </group>

          </popup>
       </div>

       <!--目录列表-->
       <div v-transfer-dom >
         <popup v-model="showChaterList" position="top" max-height="60%">
           <group gutter="0px" >
             <cell class="cell-ref" v-for="(item, index) in chapterList" :key="index" :title="item.title" @click.native="goNext(index)"></cell>
           </group>

         </popup>
       </div>



     </div>

  </div>


</template>

<style lang="scss" scoped>
  .fzSize-44{
    font-size: 44px;
  }
  .fzSize-40{
    font-size: 40px;
  }
  .fzSize-36{
    font-size: 36px;
  }
  .fzSize-32{
    font-size: 32px;
  }
  .cell-ref{
    font-size:34px;
    text-align: center;
  }

</style>



<script type="text/javascript">
  import { ColorPicker, Cell,TransferDom, Popup, Group } from 'vux'
  import {mapState,mapActions} from 'vuex'
 export default {
    components: {
      ColorPicker,
      Popup,
      Group,
      Cell
    },
   directives: {
     TransferDom
   },
    data () {
      return {
        page:this.$route.params.page || 0, //章节
        chaTitle:'', //标题
        id: this.$route.params.id , //书籍id
        scrollTop :this.$route.params.top || 0, //滚动
        newScrollTop:0,
        bookList :this.$util.getStore('bookList'),
        bookIdList :this.$util.getStore('bookIdList'),
        chapterList: [], //章节列表
        showChaterList:false,
        showMenu:false, //menu中间
        catMenu:true, //章节列表开关
        bodyText:'', //内容
        fzSize:this.$util.getStore('fzSize') || 'fzSize-36', //默认大小
        color1:this.$util.getStore('fontColor') || '#F6F5FB',//颜色
        colors1: ['#F6F5FB', '#DCDCE8','#ECDFCC', '#D6E3D9', '#E4D6E5', '#ECE8E5','#313131']
      }
    },

    computed:{
      ...mapState(['showLoading']),
      fzColor(){
          if (this.color1=='#313131'){
            this.$util.setStore('fontColor','#313131');
              return '#999999';
          }
          this.$util.setStore('fontColor',this.color1);
          return '#24292c';
      },
      //是否显示button上下页
      isPageButton(){
        if ((Number(this.newScrollTop)-100 )>= Number(document.documentElement.clientHeight)){
          return true ;
        }
        return false ;
      }




    },
    created(){
        //是否是书架并查看过
      let _this = this ;
        if(!this.id){
           this.showToast('id缺失啦', 'warn');
           setTimeout(()=>{
             _this.$router.goBack();
           },1000);
          return ;
        }

        let bookItem = _this.$util.getOneBookStore(this.id);
        if(!bookItem.chapters || bookItem.chapters.length == 0 ){ //不存在
          this.getChpterDea();
        }else{ //存在 直接获取资源
          if (!bookItem.chapters[this.page].link){
             this.getChpterDea(bookItem.chapters);
          }else{
            this.chapterList = bookItem.chapters;
            this.getText(bookItem.chapters);

          }
        }

    },
    watch:{
      '$route'(to, from) {
           this.$router.go(0);

      }
    },
    mounted(){
        var _this = this ;
      this.$nextTick(function () {

        //监控滚动
        window.addEventListener('scroll',_this.handleScroll );
      });


    },
    methods:{
      ...mapActions(['upbooklist']),
      getChpterDea(){
        var _this = this ;
        this.$axios.get('/api/toc?view=summary&book='+this.id).then((response) => {
          if (response.status == 200) {
              let data = response.data ;
            let sourceId = data.length > 1 ? data[1]._id : data[0]._id;
            for (let item of data) {
              if (item.source === 'my176') {
                sourceId = item._id;
                break ;
              }
            }
            _this.getLink(sourceId);
          }

        }).catch((err) => {
          _this.showToast(err.message, 'warn');
          _this.bodyText ='资源没找到了......';
        })


      },
      getLink:function (sourceId) {
          let _this = this ;
        this.$axios.get('/api/toc/'+sourceId+'?view=chapters').then((response) => {
          if (response.status == 200) {
            let chapterList = response.data;
            _this.chapterList =chapterList.chapters;//章节列表
            _this.chaTitle = _this.chapterList[_this.page].title;
            _this.getText(_this.chapterList);
          }

        }).catch((err) => {
          _this.showToast(err.message, 'warn');
          _this.bodyText ='资源没找到了......';
        })

      },
      getText(chapters){
          let _this = this ;
        this.$axios.get(`/chapter/`+`${encodeURIComponent(chapters[_this.page].link)}`+`?k=2124b73d7e2e1945&t=1468223717)`).then((response) => {
          if (response.status == 200) {
             let data = response.data;
             if (data.ok){
                 if (data.chapter.body.indexOf('下载最新的追书神器app阅读本作') > -1){
                   _this.bodyText ='资源丢失了......';
                   return ;
                 }
                 if (data.chapter.body.indexOf('请安装最新版追书') > -1){
                   _this.bodyText ='资源丢失了......';
                   return ;
                 }
               _this.chaTitle = chapters[_this.page].title;
               _this.bodyText =data.chapter.body;
               //缓存当前
               _this.keepItem();
             }

          }

        }).catch((err) => {
          _this.showToast(err.message, 'warn');
          _this.bodyText ='资源没找到了......';
        })

      },
      //字体
      fontSizefunc(fzSize,type){
        let fzSize_num =fzSize.substr(fzSize.length-2,fzSize.length);
         if (type == 'add'){
            if (fzSize_num < 44){
              fzSize_num =Number(fzSize_num) + 4;
            }

         }else{

           if (32 < fzSize_num){
             fzSize_num =Number(fzSize_num) - 4;
           }

         }
        this.fzSize = 'fzSize-'+fzSize_num;
        this.$util.setStore('fzSize',this.fzSize);

      },
      menuFunc(type){

          if (type =='取消'){
              this.showMenu = false ;
            return;
          }else if(type =='返回作品'){
            this.$router.push({name: 'book',params:{'id':this.id}});
            return;
          }else if (type =='返回首页'){
            this.$router.push('/');
            return;
          }else if (type =='目录'){
            this.showMenu = false ;
            this.showChaterList = true ;

          }

      },
      checkMenu(type){
          let _this = this ;

        if (type=='menu'){
          _this.showMenu = true;
            return ;
        }
        let page =Number(this.page);

        if (type =='down'){
          if(Number(page)+1 == _this.chapterList.length ){
            _this.showToast('已经是最后一页了', 'success');
            return ;
          }
          page+=1;
        }else if ('up'){
          if(page == 0 ){
            _this.showToast('已经是第一页了', 'success');
            return ;
          }
          page= page>=1 ? page -=1  : 0;
        }

        _this.$router.replace({name: 'empty',params:{'id':this.id,'page':page,'top':0}});
      },
      goNext(i){

        this.$router.replace({name: 'empty',params:{'id':this.id,'page':i,'top':0}});
      },
      handleScroll(){
         this.newScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      },
      //缓存
      keepItem(){

        //存储章节 和位置 ，保留20章节
        let bookData = this.$util.getOneBookStore(this.id);
           if(!bookData){
               return ;
           }
          bookData.chapters = this.chapterList;
          bookData.page = this.page;
          bookData.scrollTop = Number(this.newScrollTop) - 80>0 ? Number(this.newScrollTop) - 80 :0 ;
          let action= {
            "data":bookData,
            "type":'remove'
          };
          this.upbooklist(action); //删除
          action.type = 'add';
          this.upbooklist(action); //添加
      }
    },
     beforeDestroy() {

       this.keepItem();

       this.scrollTop=0;
       window.removeEventListener('scroll', this.handleScroll);
     //存储当前滚动和章节挂载到本地上

   }

  }
</script>

