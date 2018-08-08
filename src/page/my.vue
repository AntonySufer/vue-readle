<template>
  <div id="my"  class="my-con">
    <div class="my-container">

        <div class="img-404" @click="goFunc">
          <img src="@assets/img/11.jpg"/>
          <p class="notfound-p">Github</p>
          <p class="notfound-p">记得 <span style="color:red;opacity: 0.5">start</span> 哦</p>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .my-con{
    width: 100%;
    height: 100%;
  }
  .my-container{
    position: absolute;
    width: 100%;
    top:0;
    left: 0;
    bottom:0;
    background: url("../assets/img/bgindex.jpg") no-repeat center;
    background-size: 100%;
    display: flex;
    flex-flow: column nowrap;
    padding-top: 80px;
    align-items: center;
    justify-content: flex-end;
    .img-404{
      text-align: center;
      margin-bottom: 250px;
    }
    img{
      border:1px solid #e5e5e5;
      height: 120px;
      width: 120px;
      border-radius: 60px;
    }
    p{
      line-height: 50px;
      font-size:36px;
      color: #999999;
    }

  }

</style>

<script>

  export default {
    data () {
      return {

      }
    },
    create(){

    },
    methods:{
      goFunc(){
        window.location.href = 'https://github.com/AntonySufer/vue-readle';
      }
    },
    mounted () {
    }
  }
</script>
