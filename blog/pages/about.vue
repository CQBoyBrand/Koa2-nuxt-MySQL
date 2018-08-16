<template>
  <div class="about_container">
    <div class="about_module">
      <div class="about_title">
        <span class="line"></span>
        <span class="txt">ABOUT ME</span>
        <span class="line"></span>
      </div>
      <div class="about_content about_me">
        <p>重庆崽儿Brand</p>
        <p>一个92年boy，瘦宅</p>
        <p>16年大学毕业，一直从事前端开发，对代码有那么一点点小洁癖、有点强迫症又缺乏那么一点点美感（美感学习培养中...）的前端代码搬运工。</p>
        <p>平时没事喜欢逛逛 <a href="https://github.com/" target="_blank">GitHub</a>、<a href="https://juejin.im" target="_blank">掘金</a>、<a href="https://www.zhihu.com/" target="_blank">知乎</a>，最近开始，在没事的时候练练字(自己写的字太丑了，哈哈)，打算学学拍照(目前器材就是手机)</p>
      </div>
    </div>
    <div class="about_module">
      <div class="about_title">
        <span class="line"></span>
        <span class="txt">ABOUT MY BLOG</span>
        <span class="line"></span>
      </div>
      <div class="about_content about_blog">
        <p>博客前端页面使用到的技术：Nuxt.js + axios + ElementUI</p>
        <p>后端采用：Koa2 + Mysql</p>
        <p>服务器：阿里云入门级服务器，购买可点这里<a href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=r2v7kr9u" target="_blank">阿里云领券</a></p>
        <p>本博客主要是时自己的练手项目，自己想学的一些东西只要工作中没有什么机会用到的，都会拿这个博客来练手。自己感觉代码这个东西，还是用项目来联手学的比较快。</p>
        <p>本博客还有一个功能就是用来记录一些自己在工作中遇到的一些坑和一些自己感觉比较重要的点，也放一些自己的学习、工作、生活的杂七杂八的东西。</p>
      </div>
    </div>
    <div class="about_module">
      <div class="about_title">
        <span class="line"></span>
        <span class="txt">CONTACT ME</span>
        <span class="line"></span>
      </div>
      <div class="about_content about_contact">
        <p>邮箱：<a href="mailto:brandhuang@qq.com" target="_blank">brandhuang@qq.com</a></p>
        <p>Github：<a href="https://github.com/CQBoyBrand" target="_blank">GitHub</a></p>
        <p>掘金：<a href="https://juejin.im/user/58bbac26ac502e006b02ce97" target="_blank">掘金</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    head() {
      return {
        title: '关于我-重庆崽儿Brand-前端代码搬运工',
      }
    },
    data() {
      return {}
    },
    watch: {},
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less">
  .about_container {
    background-color: #fff;
    max-width: 900px;
    min-width: 320px;
    margin: 0 auto;
    .about_module {
      margin-bottom: 20px;
      .about_title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        .line {
          display: inline-block;
          width: 40%;
          border-top: 1px solid #ccc;
        }
        .txt {
          color: #686868;
          padding:0 8px;
          vertical-align: middle;
        }
      }
      .about_content {
        padding-left: 30px;
        box-sizing: border-box;
        &.about_contact, &.about_blog,&.about_me{
          p{
            padding: 10px 0;
          }
          a{
            color: #3a8ee6;
            text-decoration: underline;
            font-weight: bold;
          }
        }
      }

    }
  }
</style>
