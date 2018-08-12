<template>
  <div class="talk_container">
    <articleView
      :articleList="articleList"></articleView>
    <div class="load_more" v-if="articleList.length > 0">
      <el-button v-if="haveMoreArt" round :loading="!loadingMore" @click="loadMore">加载更多</el-button>
      <div v-else style="color: #999;">所有的文章已经被你看完了~</div>
    </div>
  </div>
</template>

<script>
  const articleView = () => import('~/components/article')
  export default {
    name: 'test',
    head() {
      return {
        title: '杂谈',
      }
    },
    components: {
      articleView
    },
    data() {
      return {}
    },
    fetch ({ store }) {
      return store.dispatch('getArtList', {
        type: 2,
        currentPage: 1,
        limit:9,
      })
    },
    computed:{
      articleList(){
        return this.$store.state.article.art.list
      },
      haveMoreArt(){
        return this.$store.state.article.art.pagenation.current_page != this.$store.state.article.art.pagenation.totalPage
      },
      loadingMore() {
        return this.$store.state.article.fetch
      }
    },
    methods:{
      // 加载更多
      loadMore() {
        this.$store.dispatch('getArtList', {
          type: 2,
          currentPage: this.$store.state.article.art.pagenation.current_page + 1,
          limit:9,
        })
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
.talk_container{
  .load_more {
    text-align: center;
    background-color: #fff;
    padding-bottom: 15px;
  }
}
</style>
