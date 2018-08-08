<template>
   <div class="headerCon">
       <p> <span @click="goBack" class="header-back" v-if="if_back=='1'" > < </span> 一点小说 </p>
   </div>

</template>
<script type="text/javascript">
  export default {
    data () {
        return {

        }
    },
    props:["if_back","toPath"],
    methods:{
      goBack(){
          if (!this.toPath){
            this.$router.goBack();
          }else{
            this.$router.push(this.toPath);
          }
      }
    }
  }
</script>




