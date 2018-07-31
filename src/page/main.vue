<template>

  <div id="main" class="main-content">
      <HDEADERS v-bind:if_back="0"></HDEADERS>
      <!-- 主要内容 -->
    <p class="text-con" v-text="noteData.node"></p>

    <div class="index-autor" v-on:click="goArt" >
      <img src="../assets/img/11.jpg" />
       <p v-on:click="goArt" >进入</p>
    </div>

  </div>


</template>

<style scoped="">
  .text-con{
    opacity: 0.4;
    position: fixed;
    top:100px;
    left: 30px;
    color: #999999;
    width: 100%;
    height: 400px;
    writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
    font-size:30px;
  }

</style>

<script type="text/javascript">
 import HDEADERS from '../components/header.vue';
 import {mapState,mapActions,mapGetters} from 'vuex';


 export default {
    components: {
      HDEADERS
    },
    data () {
      return {
        noteData:{},
        imgUrl :'./static/assets/img6.jpg'
      }
    },
    computed:{
      ...mapGetters(['getUserInfo'])//测试下mapGetters
    },
    created(){
     this.getNotes();
     let userInfo ={'openId':'ohhpN5RCGIIiRZAP7V52sBdwrKyU'}; //测试下action
     this.setUser(userInfo);
    },
    methods:{
      ...mapActions(['setUser']),//测试下action
      goArt() {
         this.$router.push('/art');
      },
      getNotes(){
         var _this = this ;
        this.$axios.post(this.$api.getNotes).then((response)=>{
          var Data =response.data;
          if (Data && Data.status==200){
            _this.noteData = Data ;
          }

        }).catch((err)=>{
          this.showToast( err.message,'warn');
        })
      }

    }

  }
</script>

