<template>
  <div class="about">
    <div class="about-me"><el-divider>关于我</el-divider></div>
    <div class="clearfix about-me-detail">
      <div class="about-me-left">
        <img src="https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80" alt="重庆崽儿Brand">
        <h5>重庆崽儿Brand</h5>
      </div>
      <ul class="about-me-right">
        <li>90后瘦宅，喜欢美剧、爬山、徒步、篮球、乒乓球、羽毛球等球类</li>
        <li>工作主要使用的是Vue.js，平时自己偶尔折腾下Node.js</li>
        <li>轻微强迫症，对代码有一点点洁癖</li>
        <li>喜欢看足球，C罗粉</li>
        <li>在学拍照，但是还没有认真去拍过。。。</li>
        <li>未完待续</li>
      </ul>
    </div>
    <div class="contact-me"><el-divider>联系我</el-divider></div>
    <div class="contact-box">
      <div class="contact-method clearfix">
        <div class="contact-label">邮箱：</div><div class="contact-detail"><a href="mailto:brandhuang@qq.com">brandhuang@qq.com</a></div>
      </div>
      <div class="contact-method clearfix">
        <div class="contact-label">Github：</div><div class="contact-detail"><a href="https://github.com/CQBoyBrand" target="_blank">
        重庆崽儿Brand</a></div>
      </div>
      <div style="text-align: center;padding: 20px 0;margin: 15px 0;">
        <p style="color: #333;">来公众号找我</p>
        <img width="130" height="130" src="@/assets/images/WXbrand.jpg" alt="">
        <p style="font-size: 12px;">扫码关注，不迷路</p>
      </div>
    </div>
    <div class="about-site"><el-divider>关于本站</el-divider></div>
    <div class="site-box">
      <div class="site-descript">
        本站当初建立，主要是自己为了使用新学的技术，因为当初在工作中一直使用的原生和 JQuery 开发，新的框架在工作中一直没有使用的机会，于是只能自己来练手了。慢慢的，这个博客已经上线2年了，现在它不仅仅是我练手的站点了，也是我自己用来记录学习，工作和一切自己想记录的东西的地方。欢迎访问
        <a href="http://www.brandhuang.com">我的博客</a>。
        <div>
          博客界面有些丑，但是暂时不打算改了，等 Vue3 出来了再弄弄。如果你有一些简约看着又不错的博客界面，可以给我留言或者邮件，我参考参考。
        </div>
        <div style="text-align: center;">
          <img src="http://static.brandhuang.com/Hi-brand-dongtu.gif" alt="">
        </div>
      </div>
      <div>
        本站所用技术栈：
      </div>
      <div class="site-tech">
        <div>前端：Nuxt.js</div>
        <div>后端：Vue.js + ElementUI</div>
        <div>服务端：Koa2</div>
        <div>数据库：Mysql</div>
        <div>本站源码：<a href="https://github.com/CQBoyBrand/Koa2-nuxt-MySQL" target="_blank">Koa2-nuxt-MySQL</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    head() {
      return {
        title: '关于',
      }
    },
    computed:{
      linkList(){
        return this.$store.state.link.list
      }
    },
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .about{
    background-color: #fff;
    padding: 15px 0;
    box-sizing: border-box;
    .about-me,
    .contact-me,
    .about-site{
      text-align: center;
      font-size: 18px;
      line-height: 60px;
      color: #333;
    }
    .about-me-detail{
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      .about-me-left{
        img{
          display: block;
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }
        h5{
          padding: 8px 0 0;
        }
      }
      .about-me-right{
        font-size: 13px;
        li{
          list-style: none;
        }
      }
    }
    .contact-box{
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      font-size: 13px;
      .contact-method{
        line-height: 30px;
        .contact-label{
          float: left;
          width: 80px;
        }
        .contact-detail{
          float: left;
          a{
            color: #409EFF;
            cursor: pointer;
          }
        }
      }
    }
    .friends-list-wrap{
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      li{
        float: left;
        background-color: #eee;
        list-style: none;
        border-radius: 4px;
        margin-bottom: 7px;
        margin-right: 7px;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 38px;
          padding: 0px 10px;
        }
      }
    }
    .site-box{
      padding: 15px;
      font-size: 13px;
      line-height: 24px;
      box-sizing: border-box;
      a{
        color: #409EFF;
      }
      .site-descript{
        text-indent: 2em;
        padding-bottom: 15px;
      }
      .site-tech{
        padding: 8px 0 8px 2em;
        box-sizing: border-box;
      }
    }
    @media screen and (min-width: 769px) {
      .about-me-left,.about-me-right{
        float: left;
      }
      .about-me-left{
        width: 100px;
        margin: 0 auto;
        text-align: center;
      }
      .about-me-right{
        max-width: 600px;
        margin-left: 20px;
        li{
          padding-bottom: 15px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .about-me-left{
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
      .about-me-right{
        padding-bottom: 15px;
      }
    }
  }
</style>
