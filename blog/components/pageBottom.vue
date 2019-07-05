<template>
  <div class="pageBottom">
    <p>Powered By Nuxt.js，Designed By Brand</p>
    <p class="copyright">Copyright© 2017-{{currentYear}} <a href="https://github.com/CQBoyBrand" target="_blank">
      重庆崽儿Brand</a></p>
    <p><a href="http://www.miitbeian.gov.cn" target="_blank">渝ICP备17014610号</a></p>
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
  a{
    color: #409EFF;
  }
  .copyright{
    a{
      font-style: italic;
    }
  }
}
</style>
