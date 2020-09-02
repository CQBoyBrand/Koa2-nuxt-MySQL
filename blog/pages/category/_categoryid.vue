<template>
  <article class="categoryname">
    <section class="artList-by-type">
      <p class="type-title">归类在<span>{{categoryName || this.$route.params.categoryid}}</span>下的文章</p>
      <p class="type-total">共有<span>{{articleList.total || 0}}</span>篇</p>
    </section>
    <list :articleList="articleList"></list>
  </article>
</template>

<script>
  import list from '../../components/articleList'
  import sidebar from '@/components/sidebar'
  import {compile} from "../../.nuxt/utils";
  export default {
    watchQuery: true,
    name: 'categoryid',
    components:{
      list,sidebar
    },
    head() {
      return {
        title: this.categoryName,
      }
    },
    data() {
      return {
      }
    },
    async fetch ({ store ,query,params}) {
      await store.dispatch('getArtByCategory',{currentPage: query.page,categoryid:params.categoryid});
    },
    computed:{
      articleList(){
        return this.$store.state.article.artByCategory
      },
      categoryName(){
        const categoryList = this.$store.state.category.list
        let categoryname = ''
        categoryList.map(item => {
          if (item.id == this.$route.params.categoryid) {
            categoryname = item.categoryname
          }
        })
        return categoryname
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
.categoryname{
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
