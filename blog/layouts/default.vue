<template>
  <div>
    <!--导航栏-->
    <nav-bar/>
    <div class="clearfix content_body" style="min-height: calc(100vh - 100px);">
      <div :class="isShowSide ? 'left_content_float' : 'left_content'">
        <div class="mobie_css">当前位置：{{currentPageName}}</div>
        <nuxt/>
      </div>
      <div class="right_content" v-if="isShowSide">
        <rightside></rightside>
      </div>
    </div>

    <el-button style="position: fixed;right: 30px;bottom: 100px" class="backToTop" v-show="isShowToTop" @click="ScrollToTop" type="info" icon="el-icon-caret-top" circle></el-button>
    <!--底部-->
    <foot/>
  </div>
</template>
<script>
  import navBar from '../components/navBar.vue'
  import foot from '../components/foot.vue'
  import rightside from '../components/rightSide.vue'

  export default {
    components: {
      navBar,
      foot,
      rightside
    },
    data() {
      return {
        isShowSide: true,
        currentPageName: '',
        scrollTop: '',
        isShowToTop: false
      }
    },
    methods: {
      handleScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (this.scrollTop > 500) {
          this.isShowToTop = true
        }else {
          this.isShowToTop = false
        }
      },
      ScrollToTop() {
        let timer=null,_that=this;
        cancelAnimationFrame(timer)
        timer=requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer=requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.isShowToTop=false;
          }
        })

      },
      routerChange() {
        if (this.$route.name == 'article-id' || this.$route.name == 'about') {
          this.isShowSide = false
        } else {
          this.isShowSide = true
        }
        if (this.$route.name == 'index') {
          this.currentPageName = '首页'
        }
        if (this.$route.name == 'talk') {
          this.currentPageName = '碎言碎语'
        }
        if (this.$route.name == 'archives') {
          this.currentPageName = '归档'
        }
        if (this.$route.name == 'collection') {
          this.currentPageName = '收藏'
        }
        if (this.$route.name == 'about') {
          this.currentPageName = '关于我'
        }
        if (this.$route.name == 'myfriends') {
          this.currentPageName = '朋友们'
        }
      }
    },
    watch: {
      '$route': 'routerChange'
    },
    mounted() {
      this.routerChange()
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
<style lang="less">
  .content_body {
    max-width: 1200px;
    margin: 0 auto !important;
    .left_content, .left_content_float, .right_content {
      padding: 80px 0 20px;
    }
    .left_content_float {
      float: left;
      width: 75%;
    }
    .mobie_css {
      display: none;
      padding-left: 10px;
    }
    .left_content {
      width: 100%;
    }
    .right_content {
      float: right;
      width: 22%;
    }
    @media screen and (max-width: 768px) {
      .left_content_float {
        width: 100%;
      }

      .mobie_css {
        display: block;
        padding-bottom: 20px;
      }

      .right_content {
        width: 100%;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
</style>

