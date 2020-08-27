<template>
  <article class="keywords">
    <section class="artList-by-type">
      <p class="type-title">搜索<span>{{$route.query.keywords}}</span>相关的文章</p>
      <p class="type-total">共找到<span>{{articleList.total || 0}}</span>篇</p>
    </section>
    <list :articleList="articleList"></list>
  </article>
</template>

<script>
  import list from '../../components/articleList'
  import sidebar from '@/components/sidebar'
  export default {
    watchQuery: true,
    name: 'keywords',
    components:{
      list,sidebar
    },
    head() {
      return {
        title: this.$route.query.keywords,
      }
    },
    data() {
      return {
      }
    },
    async fetch ({ store ,query,params}) {
      await store.dispatch('getArtByKeyword',{currentPage: query.page,keywords:query.keywords});
    },
    computed:{
      articleList(){
        return this.$store.state.article.artByKeywords
      }
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style  lang="scss">
.keywords{
  display: flex;
  flex-direction: column;
  .artList-by-type{
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 16px;
    .type-title{
      padding-bottom: 10px;
      span{
        color: orange;
        font-weight: bold;
        border-radius: 4px;
        padding: 5px;
        margin: 0 5px;
      }
    }
    .type-total{
      span{
        margin: 0 5px;
        color: orange;
        font-weight: bold;
      }
    }
  }
}
</style>
