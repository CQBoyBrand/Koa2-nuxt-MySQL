<template>
  <div class="article_container">
    <div v-if="articleList.length == 0" style="text-align: center;">暂无数据</div>
    <el-card v-else shadow="hover" class="art_style clearfix" v-for="(item,index) in articleList" :key="index">
      <div class="art_img_style" v-if="item.thumbnail != '' || item.thunbnail != null">
        <img style="display: block;height: 100%;width: 100%" :src="item.thumbnail"/>
      </div>
      <div class="art_content_style">
        <nuxt-link tag="h2" class="art_title" :to="`/article/${item.id}`">{{item.title}}</nuxt-link>
        <div class="art_tag">
          <nuxt-link tag="span" class="el-tag " :to="`/tag/${tagitem.id}`" size="small" v-for="(tagitem,index) in item.tagList" :key="index">{{tagitem.name}}</nuxt-link>
        </div>
        <div class="art_summary">
          {{item.abstract}}
        </div>
        <div class="publish_info">
          <span>{{item.publishDate}}</span><span>post by</span><span>{{item.author}}</span>
          <span>浏览 {{item.pv}} 次</span> <span>评论 {{item.commentNum}} 条</span>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
  import NuxtLink from "../.nuxt/components/nuxt-link";

  export default {
    components: {NuxtLink},
    name: 'articlelist',
    props: ['articleList'],
    data() {
      return {
        loadingMore: false
      }
    },
    watch: {},
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="less">
  .article_container {
    background-color: #fff;
    padding: 20px;
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
