<template>
  <div class="pageBottom">
    <p>Powered By Nuxt.js，Designed By Brand</p>
    <p class="copyright">Copyright© 2017-{{currentYear}} <a href="https://github.com/CQBoyBrand" target="_blank">
      重庆崽儿Brand</a></p>
    <p><a href="http://beian.miit.gov.cn" target="_blank">渝ICP备17014610号</a></p>
    <div>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50011702500392"
         style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="@/assets/images/beian.png" style="float:left;"/>
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">渝公网安备
          50011702500392号</p></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageBottom',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="scss">
.pageBottom{
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #939393;
  a{
    color: #939393;
  }
  .copyright{
    a{
      font-style: italic;
    }
  }
}
</style>
