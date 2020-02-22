<template>
  <header class="app-header">
    <nav class="nav_wrap clearfix" v-if="!isMobile">
      <h2 class="logo"><a href="/" title="重庆崽儿Brand">重庆崽儿Brand</a></h2>
      <ul class="nav_box transition-box" v-show="isShow">
        <nuxt-link to="/" tag="li">首页</nuxt-link>
        <nuxt-link to="/archives" tag="li">归档</nuxt-link>
        <nuxt-link to="/friends" tag="li">友链</nuxt-link>
        <nuxt-link to="/message" tag="li" v-if="false">留言</nuxt-link>
        <nuxt-link to="/about" tag="li">关于</nuxt-link>
        <li>
          <form autocomplete="off" @submit.prevent="searchHandle">
            <el-input
              type="search"
              placeholder="输入文章关键词"
              v-model="searchval">
              <el-button slot="append" @click="searchHandle" icon="el-icon-search"></el-button>
            </el-input>
          </form>
        </li>
      </ul>
    </nav>
    <nav class="nav_wrap clearfix" v-else>
      <h1 class="logo">重庆崽儿Brand</h1>
      <div class="menu_icon">
        <i @click="showMenu($event)" class="el-icon-menu"></i>
      </div>
      <el-collapse-transition>
        <ul class="nav_box transition-box" v-show="isShow">
          <nuxt-link to="/" tag="li" @click.native="menuToggle">首页</nuxt-link>
          <nuxt-link to="/archives" tag="li" @click.native="menuToggle">归档</nuxt-link>
          <nuxt-link to="/friends" tag="li" @click.native="menuToggle">友链</nuxt-link>
          <nuxt-link to="/message" tag="li" @click.native="menuToggle" v-if="false">留言</nuxt-link>
          <nuxt-link to="/about" tag="li" @click.native="menuToggle">关于</nuxt-link>
          <li>
            <form autocomplete="off" @submit.prevent="searchHandleMob" style="width: 96%;">
              <el-input
                type="search"
                placeholder="输入文章关键词"
                @focus="isFocus=true"
                @blur="isFocus=false"
                v-model="searchval">
                <el-button slot="append" @click="searchHandleMob" icon="el-icon-search"></el-button>
              </el-input>
            </form>

          </li>
        </ul>
      </el-collapse-transition>
    </nav>
  </header>
</template>

<script>
  import htmlparser from 'htmlparser2'

  export default {
    name: 'navBar',
    data() {
      return {
        isShow: false,
        isMobile: false,
        searchval: '',
        isFocus:false
      }
    },
    watch: {},
    methods: {
      stopDefault(event) {
        event.stopPropagation()
      },
      showMenu(event) {
        event.stopPropagation()
        this.isShow = !this.isShow
      },
      menuToggle() {
        this.isShow = !this.isShow
      },
      searchHandle(e) {
        let _that = this
        let result = ''
        let parser = new htmlparser.Parser({
          onopentag: function (name, attribs) {
            if (name === "script" || name === 'style' || name === "img" || name === 'frame' || name === 'iframe' ||
              name === "link") {
              // alert('小朋友不乖哟，不要乱输入！')
            }
          },
          ontext: function (text) {
            result += text
          },
          onclosetag: function (tagname) {
            if (tagname === "script" || tagname === "style" || tagname === "frame" || tagname === "iframe") {

            }
          }
        }, {decodeEntities: true})
        parser.write(this.searchval)
        parser.end()
        this.searchval = result

        if (this.searchval.trim().length == 0) {
          return false
        }
        this.$router.push({
          name: 'search-keywords',
          query: {
            keywords: this.searchval
          }
        })
        this.searchval = ''
        return false
      },
      searchHandleMob(e) {
        let _that = this
        let result = ''
        let parser = new htmlparser.Parser({
          onopentag: function (name, attribs) {
            if (name === "script" || name === 'style' || name === "img" || name === 'frame' || name === 'iframe' ||
              name === "link") {
              // alert('小朋友不乖哟，不要乱输入！')
            }
          },
          ontext: function (text) {
            result += text
          },
          onclosetag: function (tagname) {
            if (tagname === "script" || tagname === "style" || tagname === "frame" || tagname === "iframe") {

            }
          }
        }, {decodeEntities: true})
        parser.write(this.searchval)
        parser.end()
        this.searchval = result
        if (this.searchval.trim().length == 0) {
          return false
        }
        this.isShow = false
        this.$router.push({
          name: 'search-keywords',
          query: {
            keywords: this.searchval
          }
        })
        this.searchval = ''
        return false
      }
    },
    mounted() {
      let _this = this
      if (document.body.clientWidth < 769) {
        this.isShow = false
        this.isFocus = false
        this.isMobile = true
      } else {
        this.isShow = true
        this.isMobile = false
      }
      document.onclick = function () {
        if (_this.isMobile && !_this.isFocus) {
          _this.isShow = false
        }

      }
      window.addEventListener('resize', function () {
        if (document.body.clientWidth < 769) {
          _this.isShow = false
          _this.isMobile = true
        } else {
          _this.isShow = true
          _this.isMobile = false
        }
      }, false)
    }
  }
</script>

<style lang="scss">
  .app-header {
    background-color: #fff;
    height: 60px;
    width: 100%;
    line-height: 60px;
    position: fixed;
    top: 0;
    z-index: 9999;
    min-width: 320px;
    box-shadow: 0 0px 1px #eee;

    .nuxt-link-exact-active {
      color: #000 !important;
      font-weight: bold;
    }

    .menu_icon {
      display: none;
    }

    .nav_wrap {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 9999;
      padding: 0 15px;
      box-sizing: border-box;

      .logo {
        float: left;
        padding-left: 20px;
        font-style: oblique;
      }

      .nav_box {
        float: left;

        li {
          float: left;
          padding: 0 15px;
          list-style: none;
          cursor: pointer;
          font-size: 13px;
          color: #666;

          &:hover {
            color: #000;
            font-weight: bold;
          }
        }
      }

      input {
        outline: none;
      }
    }

    @media screen and (max-width: 768px) {
      .menu_icon {
        display: block;
        float: right;
        font-size: 26px;
        padding-right: 20px;
      }
      .logo {
        font-size: 18px;
      }
      .nav_box {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        padding: 0;
        text-align: center;
        box-shadow: 0 2px 5px #eee;

        li {
          float: none !important;
        }

        li + li {
          border-top: 1px solid #eee;
        }
      }
    }
  }
</style>
