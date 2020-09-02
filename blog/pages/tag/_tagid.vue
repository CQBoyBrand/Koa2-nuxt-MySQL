<template>
  <article class="tagname">
    <section class="artList-by-type">
      <p class="type-title">与<span># {{tagName || this.$route.params.tagid}}</span>标签相关的文章</p>
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
    name: 'tagid',
    components:{
      list,sidebar
    },
    head() {
      return {
        title: this.tagName,
      }
    },
    data() {
      return {

      }
    },
    async fetch ({ store ,query,params}) {
      await store.dispatch('getArtListByTag',{currentPage: query.page, tagid:params.tagid});
    },
    computed:{
      articleList(){
        return this.$store.state.article.artByTag
      },
      tagName(){
        const tagList = this.$store.state.tag.list
        let tagname = ''
        tagList.map(item => {
          if (item.id == this.$route.params.tagid) {
            tagname = item.tagname
          }
        })
        return tagname
      }
    },
    methods: {

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
