<template>

  <div id="main" class="main-content">
    <div class="main-header">
      <p>一点小说</p>
      <div class="main-head">
        <router-link to="/seach"><img class="sea-img" src="@assets/img/search.png"/></router-link>
         <img class="menu-img" src="@assets/img/menu.png" @click="showMenuFunc"/>

        <div></div>
      </div>
    </div>
    <!--菜单-->
    <div v-transfer-dom >
      <popup v-model="showMenu" position="top"  max-height="60%">
        <group gutter="0px" >
          <router-link to="/my"><cell   class="cell-ref" v-for="i in ['关于']" :key="i" :title="i"  ></cell></router-link>
        </group>

      </popup>
    </div>

    <section v-if="hasList">

      <div class="main-con">

        <div class="main-li" v-for="(item,index) in bookList" :key="index" @click="goBook(item)">
          <div class="main-li-pre">
            <img  v-bind:src="item.cover"/>
          </div>
        </div>

      </div>
    </section>
    <section v-else @click="goSeach">
       <p class="main-seach-p"> 书架空空如也，赶紧搜索添加吧</p>
    </section>

  </div>


</template>
<style lang="scss" scoped>
  .cell-ref{
    font-size:34px;
    text-align: center;
    background: #FE9424;
  }
</style>

<script type="text/javascript">
  import { ColorPicker, Cell,TransferDom, Popup, Group } from 'vux'

 export default {
    components: {
      Popup,
      Group,
      Cell
    },
   directives: {
     TransferDom
   },
    data () {
      return {
        showMenu:false,
        bookList : this.$util.getStore('bookList') || [], //我的书架
      }
    },
    computed:{
      hasList(){
          if (this.bookList.length > 0){
            return true ;
          }
          return false ;
      }
    },
    watch:{

    },
    created(){

    },
    methods:{
        goBook(item){
          this.$router.push({name: 'book',params:{'id':item._id,'page':item.page,'top':item.scrollTop}});
        },
        goSeach(){
         this.$router.push('/seach');
        },
       showMenuFunc(){
            this.showMenu = true ;
      }
    }

  }
</script>

