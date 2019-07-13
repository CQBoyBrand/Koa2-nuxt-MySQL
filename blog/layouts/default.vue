<template>
  <div class="layout_css">
    <AppHeader></AppHeader>
    <transition>
      <AppMain></AppMain>
    </transition>

    <AppFooter></AppFooter>
  </div>
</template>
<script>
  import AppHeader from '../components/appHeader.vue'
  import AppMain from '../components/appMain.vue'
  import AppFooter from '../components/appFooter.vue'
  export default {
    components: {
      AppHeader,AppMain,AppFooter
    },
    data(){
      return {
        docTitle: ''
      }
    },
    watch:{
      $route( to , from ){
       this.docTitle = document.title
      }
    },
    mounted(){
      let _this = this
      this.docTitle = document.title
      document.addEventListener('visibilitychange', function() {
        var isHidden = document.hidden;
        if (isHidden) {
          document.title = '咦，你怎么跑了！';
        } else {
          document.title = _this.docTitle
        }
      });
    }
  }
</script>
<style lang="scss">
  .layout_css{
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 100%;
    padding-top: 60px;
    width: 100%;
    @media screen and (max-width: 920px) {
      min-width: 320px;
    }
    .app-header{
      height: 60px;
    }
    .app-main{
      flex: 1;
    }
    .app-footer{
      height: 94px;
    }
  }


</style>
