<template>
   <div class="headerCon">
       <p> <span @click="$router.goBack(toPath)" class="header-back" v-if="if_back=='1'" > < </span> 微小说 </p>
   </div>

</template>
<script type="text/javascript">
  export default {
    data () {
        return {

        }
    },
    props:["if_back","toPath"]
  }
</script>




