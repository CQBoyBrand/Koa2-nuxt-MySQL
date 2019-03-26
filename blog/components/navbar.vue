<template>
  <div class="nav_container">
    <div class="nav_wrap clearfix" v-if="!isMobile">
      <h2 class="logo"><a href="/">重庆崽儿Brand</a></h2>
        <ul class="nav_box transition-box" v-show="isShow">
          <nuxt-link to="/" tag="li" >首页</nuxt-link>
          <nuxt-link to="/archives" tag="li">归档</nuxt-link>
          <nuxt-link to="/message" tag="li" v-if="false">留言</nuxt-link>
          <nuxt-link to="/about" tag="li">关于我</nuxt-link>
          <li>
            <form autocomplete="off" @submit.prevent="searchHandle">
              <el-input
                type="search"
                placeholder="搜索文章"
                v-model="searchval">
                <el-button slot="append" @click="searchHandle" icon="el-icon-search"></el-button>
              </el-input>
            </form>
          </li>
        </ul>
    </div>
    <div class="nav_wrap clearfix" v-else>
      <h1 class="logo">重庆崽儿Brand</h1>
      <div class="menu_icon">
        <i @click="isShow = !isShow" class="el-icon-menu"></i>
      </div>
      <el-collapse-transition>
        <ul class="nav_box transition-box" v-show="isShow">
          <nuxt-link to="/" tag="li" @click.native="menuToggle">首页</nuxt-link>
          <nuxt-link to="/archives" tag="li" @click.native="menuToggle">归档</nuxt-link>
          <nuxt-link to="/message" tag="li" @click.native="menuToggle" v-if="false">留言</nuxt-link>
          <nuxt-link to="/about" tag="li" @click.native="menuToggle">关于我</nuxt-link>
          <li>
            <form autocomplete="off" @submit.prevent="searchHandleMob" style="width: 96%;">
              <el-input
                type="search"
                placeholder="搜索文章"
                v-model="searchval">
                <el-button slot="append" @click="searchHandleMob" icon="el-icon-search"></el-button>
              </el-input>
            </form>
          </li>
        </ul>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    data() {
      return {
        isShow: false,
        isMobile: false,
        searchval:''
      }
    },
    watch: {},
    methods: {
      menuToggle(){
        this.isShow = !this.isShow
      },
      searchHandle(e){
        if(this.searchval.trim().length == 0){
          return false
        }
        this.$router.push({
          name:'search-keywords',
          query:{
            keywords: this.searchval
          }
        })
        this.searchval=''
        return false
      },
      searchHandleMob(e){
        if(this.searchval.trim().length == 0){
          return false
        }
        this.isShow = false
        this.$router.push({
          name:'search-keywords',
          query:{
            keywords: this.searchval
          }
        })
        this.searchval=''
        return false
      }
    },
    mounted() {
      let _this = this
      if(document.body.clientWidth < 769){
        this.isShow = false
        this.isMobile = true
      }else {
        this.isShow = true
        this.isMobile = false
      }
      window.addEventListener('resize',function () {
        if(document.body.clientWidth < 769){
          _this.isShow = false
          _this.isMobile = true
        }else {
          _this.isShow = true
          _this.isMobile = false
        }
      },false)
    }
  }
</script>

<style lang="scss">
  .nav_container{
    background-color: #fff;
    height: 60px;
    width: 100%;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 9999;
    box-shadow: 0 0px 1px #eee;
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
      padding: 0 15px;
      box-sizing: border-box;
      .logo{
        float: left;
        padding-left: 20px;
        font-style: oblique;
      }
      .nav_box{
        float: left;
        li{
          float: left;
          padding: 0 15px;
          list-style: none;
          cursor: pointer;
          font-size: 13px;
          color: #666;
          &:hover{
            color: #000;
            font-weight: bold;
          }
        }
      }
      input{
        outline: none;
      }
    }
    @media screen and (max-width:768px){
      .menu_icon{
        display: block;
        float: right;
        font-size: 26px;
        padding-right: 20px;
      }
      .logo{
        font-size: 18px;
      }
      .nav_box{
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        padding: 0;
        text-align: center;
        box-shadow: 0 0px 1px #eee;
        li{
          float: none!important;
        }
        li + li{
          border-top: 1px solid #eee;
        }
      }
    }
  }
</style>
