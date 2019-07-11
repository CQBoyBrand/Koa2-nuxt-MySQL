<template>
  <div class="about">
    <div class="about-me">关于我</div>
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
      </ul>
    </div>
    <div class="contact-me">联系我</div>
    <div class="contact-box">
      <div class="contact-method clearfix">
        <div class="contact-label">邮箱：</div><div class="contact-detail"><a href="mailto:brandhuang@qq.com">brandhuang@qq.com</a></div>
      </div>
      <div class="contact-method clearfix">
        <div class="contact-label">Github：</div><div class="contact-detail"><a href="https://github.com/CQBoyBrand" target="_blank">
        使劲戳我</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    head() {
      return {
        title: '关于我',
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
  .about-me,.about-myfriends,.contact-me{
    text-align: center;
    font-style: italic;
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
    .contact-method{
      line-height: 40px;
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
