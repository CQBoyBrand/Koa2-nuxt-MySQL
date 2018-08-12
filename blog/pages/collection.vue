<template>
  <div class="collection_container">
    <div v-if="collectionList.length == 0" style="text-align: center;">暂无数据</div>
    <el-card v-else shadow="hover" v-for="(item,index) in collectionList" :key="index">
      <a target="_blank" class="collection_title" :href="item.siteUrl">
        {{item.siteName}}
      </a>
      <div class="collection_description">
        {{item.siteDesc}}
      </div>
    </el-card>
    <div class="load_more" v-if="collectionList.length > 0">
      <el-button v-if="haveMore" round :loading="!loadingMore" @click="loadMore">加载更多</el-button>
      <div v-else style="color: #999;">我所有的藏品都被你看完了！</div>
    </div>
  </div>
</template>

<script>
  import {post} from '@/api/axios'

  export default {
    name: 'collection',
    head() {
      return {
        title: '收藏',
      }
    },
    data() {
      return { }
    },
    fetch ({ store }) {
      return store.dispatch('getCollection', {
        currentPage: 1,
        limit:9,
      })
    },
    computed:{
      collectionList(){
        return this.$store.state.collections.collectionList.list
      },
      haveMore(){
        return this.$store.state.collections.collectionList.pagenation.current_page != this.$store.state.collections.collectionList.pagenation.totalPage
      },
      loadingMore() {
        return this.$store.state.collections.fetch
      }
    },
    methods: {
      // 加载更多
      loadMore() {
        this.$store.dispatch('getCollection', {
          currentPage: this.$store.state.collections.collectionList.pagenation.current_page + 1,
          limit:9,
        })

      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .collection_container {
    background-color: #fff;
    padding: 20px;
    & > div {
      margin-bottom: 20px;
    }
    .el-card__header, .el-card__body {
      padding: 10px 20px;
    }
    .collection_title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      &:hover {
        color: #337ab7
      }
    }
    .collection_description {
      padding: 15px 0;
      text-indent: 2em;
      line-height: 24px;
    }
    .load_more {
      text-align: center;
    }
  }
</style>
