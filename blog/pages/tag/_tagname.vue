<template>
  <div class="tagname clearfix">
    <div class="left-content">
      <div class="artList-by-type">
        <p class="type-title">与<span>#{{this.$route.params.tagname}}</span>相关的文章</p>
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
    name: 'tagname',
    components:{
      list,sidebar
    },
    data() {
      return {
      }
    },
    async fetch ({ store ,query,params}) {
      await store.dispatch('getArtListByTag',{currentPage: query.page,tagname:params.tagname});
    },
    computed:{
      articleList(){
        return this.$store.state.article.artByTag
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

<style  lang="scss">

</style>
