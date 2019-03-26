<template>
  <div class="categoryname clearfix">
    <div class="left-content">
      <div class="artList-by-type">
        <p class="type-title">与<span>{{this.$route.params.categorylist}}</span>相关的文章</p>
        <p class="type-total">共找到<span>{{articleList.total}}</span>篇</p>
      </div>
      <list :articleList="articleList" @getCurrentPage="getCurrentPage"></list>
    </div>
    <div class="side-content">
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
  import list from '../../components/articleList'
  import sidebar from '@/components/sidebar'
  export default {
    name: 'categorylist',
    components:{
      list,sidebar
    },
    data() {
      return {
      }
    },
    async fetch ({ store ,query,params}) {
      await store.dispatch('getArtByCategory',{currentPage: query.page,categoryname:params.categorylist});
    },
    computed:{
      articleList(){
        return this.$store.state.article.artByCategory
      }
    },
    methods: {
      getCurrentPage(data){

      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">

</style>
