<template>

  <div id="my" class="my-content">
      <HDEADERS v-bind:if_back="1"></HDEADERS>
      <div class="my-mid">
        <div>
          <img src="../assets/img/qrcode.png"/>
        </div>
        <p>
          <span>yidian</span>
        </p>
        <p>
          <span>邮箱: </span><span>dian_note@163.com</span>
        </p>
      </div>

  </div>
</template>



<script type="text/javascript">
 import HDEADERS from '../components/header.vue';

 export default {
    components: {
      HDEADERS
    },
    data () {
      return {

      }
    },
    computed:{

    },
    created(){

    },
    methods: {

    }

  }
</script>

