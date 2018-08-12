<template>
  <div class="index_container">
    暂时先空着吧~~~
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        name: localStorage.getItem('ms_username'),
      }
    },
    computed: {
      role() {
        return this.name === 'admin' ? '超级管理员' : '普通用户';
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less">
  .index_container {


  }
</style>
