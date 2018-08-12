<template>
  <div class="nav_container">
    <div class="nav_wrap clearfix">
      <h1 class="logo">重庆崽儿Brand</h1>
      <div class="menu_icon">
        <i @click="menuToggle" class="el-icon-menu"></i>
      </div>
      <ul class="nav_box" :class="isShow ? 'nav_box_show' : '' ">
        <nuxt-link to="/" tag="li" @click.native="menuToggle">首页</nuxt-link>
        <nuxt-link to="/talk" tag="li" @click.native="menuToggle">碎言碎语</nuxt-link>
        <nuxt-link to="/archives" tag="li" @click.native="menuToggle">归档</nuxt-link>
        <nuxt-link to="/collection" tag="li" @click.native="menuToggle">收藏</nuxt-link>
        <nuxt-link to="/myfriends" tag="li" @click.native="menuToggle">朋友们</nuxt-link>
        <nuxt-link to="/about" tag="li" @click.native="menuToggle">关于我</nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    data() {
      return {
        isShow: false
      }
    },
    watch: {},
    methods: {
      menuToggle(){
        this.isShow = !this.isShow
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
.nav_container{
  background-color: #fff;
  height: 60px;
  width: 100%;
  line-height: 60px;
  position: fixed;
  top: 0;
  z-index: 9999;
  box-shadow: 0 1px 1px #ccc;
  .nuxt-link-exact-active{
    color: #000!important;
    font-weight: bold;
  }
  .menu_icon{
    display: none;
  }
  .nav_wrap{
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 9999;
    .logo{
      float: left;
      padding-left: 20px;
    }
    .nav_box{
      float: left;
      li{
        float: left;
        padding: 0 15px;
        cursor: pointer;
        color: #666;
        &:hover{
          color: #000;
          font-weight: bold;
        }
      }
    }
  }
  @media screen and (max-width:768px){
    .menu_icon{
      display: block;
      float: right;
      font-size: 30px;
      padding-right: 20px;
    }
    .nav_box_show{
      display: block!important;
    }
    .nav_box{
      position: absolute;
      top: 60px;
      width: 100%;
      display: none;
      background-color: #fff;
      padding: 0;
      text-align: center;
      li{
        float: none!important;
      }
      li + li{
        border-top: 1px solid #ccc;
      }
    }
  }
}
</style>
