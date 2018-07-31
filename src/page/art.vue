<!--
//art  首页
-->
<template>

  <div class="art-content" id="art">
    <Loading v-show="showLoading"></Loading>

    <sideBar></sideBar> <!--侧边栏效果-->

    <HDEADERS v-bind:if_back="1"></HDEADERS>
    <div class="art-head" @click="showSide">
      <img  src="../assets/img/category.png"/>
    </div>

    <div class="art-mid" >

      <img v-show="isShow" class="art-img" v-bind:src="imgUrl" />

       <p class="art-title" v-text="artData.title" ></p>
       <p class="yuedu">
         <span v-text="artData.entry_date"></span>
          <span v-text="artData.brower_num || ''"></span>
       </p>

      <transition name="common-fade" mode="out-in">
         <div class="art-mid-con" v-html="artData.content">
         </div>

      </transition>

     <FOOTER v-show="isComment" v-bind:art_id="art_id"></FOOTER>

    </div>

  </div>
</template>



<script type="text/javascript">
  import HDEADERS from '../components/header.vue';
  import FOOTER from '../components/footer.vue';
  import sideBar from '../components/sideBar.vue';
  import {mapState,mapMutations} from 'vuex';
  export default {
    components: {
      HDEADERS,
      sideBar,
      FOOTER
    },
    data () {
      return {
        artData:[],
        clientHeight:0,
        imgUrl:'',
        art_id:this.$route.params.id ,
        isComment:false,
      }
    },
    computed: {
      ...mapState(['showLoading']),
      ...mapState(['userInfo']),
      //内容高度
      conHeight: function () {
        //获取屏幕高度
        let valHeight =   `${document.documentElement.clientHeight-104}` ;
        window.onresize = function temp() {
          valHeight = `${document.documentElement.clientHeight-104}`;
        };
        return valHeight;
      },
      //图片显示
      isShow:function () {
          if (!this.imgUrl){
             return false ;
          }
          return true ;
      }
    },

    created(){
       this.getNewArt();

    },
    mounted(){
    },
    methods:{
       /*侧边栏*/
      showSide(){
        this.$store.dispatch('showBar'); //侧边栏
      },
      /*获取首页*/
      getNewArt(){
          let data = {'openid':this.userInfo.openId,'art_id':this.art_id};
          this.$axios.post(this.$api.getIndexArt,data).then((response)=>{
            var artData =response.data;
            if (artData && artData.code===200){
              this.artData = artData.data ;

              let img = this.artData.img ;
              this.art_id = artData.art_id;
              this.artData.brower_num ='阅读 '+this.artData.brower_num;
              if (img && img.indexOf('../../img')>-1){
                  this.imgUrl = img.replace(/..\/..\/img/,'./static/assets')
              }else{
                this.imgUrl ='./static/assets/img6.jpg';
              }
              this.isComment =true;//底部
            }

          }).catch((err)=>{
            this.showToast( err.message,'warn');
          })
        }
    }
  }
</script>

