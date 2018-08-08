<template>
  <div id="error" ref="error" >
    <div class="notfoud-container">
      <div class="img-404">
      </div>
      <p class="notfound-p">哎呀迷路了...</p>

      <div class="notfound-btn-container">
        <router-link class="notfound-btn" to="/home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="css">
  .notfoud-container .img-404{
    height:155px;background:url('../assets/img/404.png') center center no-repeat;
    -webkit-background-size:150px auto;
    padding-top:40px;
    margin-bottom:20px}
  .notfoud-container .notfound-p{
    line-height:22px;
    font-size:17px;
    padding-bottom:15px;
    border-bottom:1px solid #f6f6f6;
    text-align:center;color:#262b31
  }
  .notfoud-container .notfound-btn-container{margin:40px auto 0;text-align:center}
  .notfoud-container .notfound-btn-container .notfound-btn{display:inline-block;border:1px solid #ebedef;background-color:#239bf0;color:#fff;font-size:15px;border-radius:5px;text-align:center;padding:10px;line-height:16px;white-space:nowrap}

</style>
<script>

  export default {
    data () {
      return {
          error:''
      }
    },
    create(){

    },
    mounted () {
    }
  }
</script>
