<template>
  <div class="Home">
    <el-row class="container">
      <!--头部-->
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-title">
          <span style="font-size: 18px;color: #fff;">后台管理</span>
        </div>
        <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i>嗨， {{nickname}}  <i
            class="iconfont icon-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <!--<el-dropdown-item>-->
                <!--<div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>-->
              <!--</el-dropdown-item>-->
              <el-dropdown-item>
                <div @click="jumpTo('/setting')"><span style="color: #555;font-size: 14px;">设置</span></div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>

      <!--中间-->
      <el-col :span="24" class="main">
        <!--左侧导航-->
        <aside>
          <!--导航菜单-->
          <el-menu :default-active="defaultActiveIndex" router @select="handleSelect">
            <template v-for="(item,index) in $router.options.routes">
              <div v-if="item.meta">
                <el-submenu v-if="!item.meta.leaf && item.children && item.children.length" :index="index+''">
                  <template slot="title"><i :class="item.meta.icon"></i><span slot="title">{{item.meta.title}}</span></template>
                  <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path"
                                :class="$route.path==term.path?'is-active':''">
                    <i :class="term.meta.icon"></i><span slot="title">{{term.meta.title}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else="item.meta.leaf" :index="item.children[0].path"
                              :class="$route.path==item.children[0].path?'is-active':''">
                  <i :class="item.meta.icon"></i><span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
              </div>

            </template>
          </el-menu>
        </aside>

        <!--右侧内容区-->
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      defaultActiveIndex: '0'
    }
  },
  computed: {
    nickname () {
      return this.$store.state.auth.nickname
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$store.dispatch('authInit', { username: localStorage.getItem('username') })
    },
    handleSelect (index) {
      this.defaultActiveIndex = index
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    jumpTo (url) {
      this.defaultActiveIndex = url
      this.$router.push(url) // 用go刷新
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning'
      }).then(() => {
        // 确认
        localStorage.clear()
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.getUserInfo()
    // console.log(this.$router.options)
  }
}
</script>

<style lang="scss">
.Home{
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #333744;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #333744;
        color: #409EFF;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 30px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
