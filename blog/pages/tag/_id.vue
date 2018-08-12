<template>
  <div class="tag_container">
    <el-card shadow="hover" class="tag_style">
      <img src="../../static/tag.png" height="30" width="30" align="center"
           style="margin-right: 8px"/>{{articleList.length > 0 ? articleList[0].tag : ''}}
    </el-card>
    <el-card shadow="hover" class="art_style clearfix" v-for="(item,index) in articleList" :key="index">
      <div class="art_img_style" v-if="item.thumbnail != '' || item.thunbnail != null">
        <img style="display: block;height: 100%;width: 100%" :src="item.thumbnail"/>
      </div>
      <div class="art_content_style">
        <nuxt-link tag="h2" class="art_title" :to="`/article/${item.id}`">{{item.title}}</nuxt-link>
        <div class="art_tag">
          <nuxt-link tag="span" class="el-tag " :to="`/tag/${tagitem.id}`" size="small"
                     v-for="(tagitem,index) in item.tagList" :key="index">{{tagitem.name}}
          </nuxt-link>
        </div>
        <div class="art_summary">
          {{item.abstract}}
        </div>
        <div class="publish_info">
          <span>{{item.publishDate}}</span><span>post by</span><span>{{item.author}}</span>
          <span>浏览 {{item.pv}} 次</span>
        </div>
      </div>
    </el-card>
    <div class="load_more">
      <el-button v-if="haveMoreArt" round :loading="!loadingMore" @click="loadMore()">加载更多</el-button>
      <div v-else style="color: #999;">所有的文章已经被你看完了~</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tags',
    data() {
      return {
        tagId: this.$route.params.id
      }
    },
    head() {
      return {
        title:this.$store.state.article.tagArtList.list[0].tag,
      }
    },
    fetch({store, params}) {
      return store.dispatch('getArtListByTagId', {
        id: params.id ,
        currentPage: 1,
        limit: 9,
      })
    },
    computed: {
      articleList() {
        return this.$store.state.article.tagArtList.list
      },
      haveMoreArt() {
        return this.$store.state.article.tagArtList.pagenation.current_page != this.$store.state.article.tagArtList.pagenation.totalPage
      },
      loadingMore() {
        return this.$store.state.article.fetchTagArt
      }
    },
    methods: {
      // 加载更多
      loadMore() {
        this.$store.dispatch('getArtListByTagId', {
          id: this.tagId,
          currentPage: this.$store.state.article.tagArtList.pagenation.current_page + 1,
          limit: 9,
        })
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  .tag_container {
    background-color: #fff;
    padding: 20px;
    .load_more {
      text-align: center;
      background-color: #fff;
      padding-bottom: 15px;
    }
    .tag_style {
      text-align: center;
      font-weight: bold;
      font-size: 24px;
    }
    .art_style {
      margin-bottom: 20px;
      .art_title {
        font-size: 24px;
        color: #333;
        cursor: pointer;
        &:hover {
          color: #337ab7
        }
      }
      .publish_info {
        font-size: 13px;
        font-weight: 500;
        padding: 6px 0;
        font-style: italic;
        & > span {
          padding-right: 10px;
        }
      }
      .art_tag {
        padding: 8px 0;
        font-size: 14px;
        font-weight: normal;
        & > span {
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .art_summary {
        font-size: 14px;
        color: #333;
        line-height: 24px;
        font-weight: normal;
        text-indent: 2em;
      }
      .art_img_style {
        float: left;
        width: 25%;
        padding: 15px
      }
      .art_content_style {
        float: left;
        width: 75%
      }
    }
    @media screen and (max-width: 768px) {
      .art_img_style {
        float: none !important;
        width: 100% !important;
        height: 200px !important;
        padding: 0 !important;
      }

      .art_content_style {
        float: none !important;
        width: 100% !important;
      }
    }
  }
</style>
