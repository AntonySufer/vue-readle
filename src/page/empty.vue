<template>

</template>

<script type="text/javascript">
  export default {
    data () {
      this.$router.replace({name:"chapter",params:{'id':this.$route.params.id,'page':this.$route.params.page ||0,'top':0}});
      return {

      }
    }
  }
</script>


