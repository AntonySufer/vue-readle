<template>
   <div class="headerCon">
       <p> <span @click="$router.goBack()" class="header-back" v-if="if_back=='1'" > < </span> 一点应用 </p>
   </div>

</template>
<script type="text/javascript">
  export default {
    data () {
        return {

        }
    },
    props:["if_back"]
  }
</script>




