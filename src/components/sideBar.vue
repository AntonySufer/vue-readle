<!--侧边栏-->
<template>
  <div class="sidebar-content">
    <!-- 对transition不了接的可以查看vue2.0官方文档的“过渡 & 动画” 链接：https://cn.vuejs.org/v2/guide/transitions.html-->
    <transition name="fade" @touchmove.stop.prevent>
      <!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
      <div class="menu-mask" v-show="isRellyShow" @click="hideSide"></div>
    </transition>

    <transition name="slide-fade">
      <!-- 这里才是侧栏代码部分 -->
      <div class="side-content" v-show="isRellyShow">
        <!-- css transition动画 加深理解 -->
         <div class="change" >
           <img src="../assets/img/11.jpg" alt="" />
           <p>yidain</p>

         </div>

         <div class="menu-class">
            <p @click="goFunc(1)">历史</p>
            <p @click="goFunc(2)">收藏</p>
            <p @click="goFunc(3)">关于</p>
         </div>



      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    components:{},
    data () {
      return {

      }
    },
    methods: {
      hideSide:function(){
        this.$store.dispatch('hideBar');
      },
      goFunc(num){

        var toRe ='/history';
         if(num==2){
           toRe = '/attent';
         }else if (num ==3){
           toRe = '/my';
         }
        this.$store.dispatch('hideBar');
        this.$router.push(toRe);
      }
    },
    computed:{
      isRellyShow(){
        return this.$store.getters.isShowMethod;
      }
    },
    mounted:function(){

    }
  }
</script>

<style  scoped>
  .menu-mask{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    opacity: 1;
    z-index:10;
  /*background:rgba(0,0,0,0.5);*/
  }
  .side-content{
    z-index: 11;
    position:fixed;
    width: 200px;
    height: 100%;
    background: #24292C;

    top: 79px;
    left: 0;
    bottom: 0;
    -webkit-overflow-scrolling:touch;
  }
  .fade-enter-to, .fade-leave-to{
    transition: opacity 0.3s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }


  .slide-fade-enter-to, .slide-fade-leave-to{
    transition: transform 0.3s;
    transform:translate(0px,0px);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
    -webkit-transform:translate(-286px,0px);
    transform:translate(-286px,0px);
    -webkit-transition:opacity 0.3s ease-in-out 0.3s,-webkit-transform 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out 0.3s,transform 0.3s ease-in-out;
  }

  .change{
    padding-top: 20px;
    width: 100%;
    text-align: center;

  }


  .change img {

    width:150px;
    height:150px;
    border-radius: 100%;
     /*opacity:0;*/
    /*-webkit-transform:translate(284px,200px);*/
    /*transform:translate(284px,200px);*/
    /*-webkit-transition:opacity 0.5s ease-in-out 0.5s,-webkit-transform 1s ease-in-out;*/
    /*transition: opacity 0.5s ease-in-out 0.5s,transform 1s ease-in-out;*/
  }
  .change p{
    margin-top: 20px;
    color: #fff;
    line-height: 30px;
    font-size:30px;
  }

  .menu-class{
    margin-top: 20px;
    color: #fff;
    font-size:34px;
  }
  .menu-class p{
    text-align: center;
    line-height: 80px;
  }


</style>
