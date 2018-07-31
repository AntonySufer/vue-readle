<template>

  <div  id="app" >
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>



<script>

  export default {
    data () {
      return {
        transitionName: 'slide-right'
      }
    },
    mounted () {

    },
    watch: {
      '$route' (to, from) {
        // 切换动画
        //let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退

      }
    },
    methods: {
    },
    computed: {
    }
  }
</script>

<style lang="scss" >

#app {
  font-family: "Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
  height: 100%;
  width: 100%;

}

.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .4s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>


