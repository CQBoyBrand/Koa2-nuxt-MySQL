<template>
  <list :articleList="articleList"></list>
</template>

<script>
import sidebar from '../components/sidebar'
import list from '../components/articleList'
export default {
  watchQuery: true,
  name: 'life',
  components: {
    sidebar,
    list
  },
  head() {
    return {
      title: '生活',
    }
  },
  data() {
    return {
    }
  },
  async fetch ({ store ,query}) {
    await store.dispatch('getArtListByType',{currentPage: query.page, artType: 'life'});
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
