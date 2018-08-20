<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">oops~ 你所访问的页面不存在</div>
    <div class="error-desc-o">去看看其他文章吧</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    layout: '',
    name: 'error',
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
  .error-page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    .error-code{
      line-height: 1;
      font-size: 80px;
      font-weight: bolder;
      color: #2d8cf0;
    }
    .error-code span{
      color: #00a854;
    }
    .error-desc{
      font-size: 20px;
      color: #777;
      padding-top: 30px;
    }
    .error-desc-o{
      font-size: 14px;
      color: #777;
      padding-top: 20px;
    }
    .error-handle{
      margin-top: 30px;
      padding-bottom: 200px;
    }
    .error-btn{
      margin-left: 100px;
    }
  }

</style>
