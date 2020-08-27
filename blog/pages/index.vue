<template>
  <list :articleList="articleList" ></list>
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
      await store.dispatch('getArtListByType',{currentPage: query.page, artType: 'code'});
    },
    computed: {
      articleList(){
        return this.$store.state.article.list
      },
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style lang="">

</style>
