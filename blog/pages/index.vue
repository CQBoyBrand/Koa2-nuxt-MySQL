<template>
  <div class="index clearfix">
    <div class="left-content">
      <list :articleList="articleList" @getCurrentPage="getCurrentPage"></list>
    </div>
    <div class="side-content">
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
  import sidebar from '../components/sidebar'
  import list from '../components/articleList'
  export default {
    watchQuery: true,
    name: 'index',
    components: {
      sidebar,
      list
    },
    head() {
      return {
        title: '首页',
      }
    },
    data() {
      return {
      }
    },
    async fetch ({ store ,query}) {
      await store.dispatch('getAllArtList',{currentPage: query.page});
    },
    computed: {
      articleList(){
        return this.$store.state.article.list
      },
    },
    methods: {
      getCurrentPage(data){
        this.$store.dispatch('getAllArtList',{
          currentPage: data.currentPage,
          limit:1,
        })
      }
    },
    mounted() {

    }
  }
</script>

<style lang="">

</style>
