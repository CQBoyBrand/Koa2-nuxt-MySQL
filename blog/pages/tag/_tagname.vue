<template>
  <article class="tagname">
    <section class="artList-by-type">
      <p class="type-title">与<span># {{this.$route.params.tagname}}</span>标签相关的文章</p>
      <p class="type-total">共找到<span>{{articleList.total}}</span>篇</p>
    </section>
    <list :articleList="articleList" @getCurrentPage="getCurrentPage"></list>
  </article>
</template>

<script>
  import list from '../../components/articleList'
  import sidebar from '@/components/sidebar'
  export default {
    name: 'tagname',
    components:{
      list,sidebar
    },
    head() {
      return {
        title: this.$route.params.tagname,
      }
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
.tagname{
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
