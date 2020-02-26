<template>
  <div class="article_id clearfix">
    <div class="left-content" v-if="articleDetail.artTitle">
      <h2 class="article-title">{{articleDetail.artTitle}}</h2>
      <p class="article-info"><span>发布于：{{articleDetail.cdate.split(" ")[0]}}</span><span>{{articleDetail.pv}} 次浏览</span><span>{{commentsList.total}} 条评论</span>
      </p>
      <div class="article-content markdown-body">
        <div v-html="markdownRender">

        </div>
      </div>
      <div class="article-type">
        <p>文章归类于：
          <nuxt-link :to="`/category/${articleDetail.category}`">{{articleDetail.category}}</nuxt-link>
        </p>
        <p class="art_tag">文章标签：
          <nuxt-link :to="`/tag/${item}`" v-for="(item,index) in tagList" :key="index">#{{item}}</nuxt-link>
        </p>
        <p class="art_tag">版权声明：
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh" target="_blank"> 自由转载-署名-非商用</a>
        </p>
      </div>
    </div>
    <div v-else class="left-content not-found">
      咦，你要找的东西好像不见了
    </div>
    <div style="text-align: center;border-bottom: 1px solid #eee;border-top: 1px solid #eee;padding: 20px 0;margin: 15px 0;">
      <p style="color: #333;">来公众号找我</p>
      <img width="130" height="130" src="@/assets/images/WXbrand.jpg" alt="">
      <p style="font-size: 12px;">扫码关注，不迷路</p>
    </div>


    <!--评论-->
    <comment v-if="true" :commentsList="commentsList" :commentId="{id:articleDetail.id}"></comment>
  </div>
</template>

<script>
  import comment from '@/components/comment'

  import {mdRender, timestampToTime }  from '@/utils/utils'

  export default {
    watchQuery: ['page'],
    name: 'id',
    components:{
      comment
    },
    head() {
      return {
        title: this.$store.state.article.detail.artTitle,
        meta: [
          {hid: 'index', name: 'description', content: this.$store.state.article.detail.abstract}
        ]
      }
    },
    data(){
      return {
        timestampToTime: timestampToTime
      }
    },
    async fetch({store, params, query}) {
      await store.dispatch('getArtDetail', {id: params.id});
      await store.dispatch('getComment', {id: params.id, currentPage: query.page});
    },

    computed: {
      articleDetail() {
        return this.$store.state.article.detail
      },
      commentsList() {
        return this.$store.state.comment.list
      },
      tagList() {
        let tag = this.$store.state.article.detail.tag
        if(tag){
          return tag.split(',')
        }

      },
      markdownRender() {
        let mdStr = this.$store.state.article.detail.content
        let markd = '';
        if (this.$store.state.article.detail) {
          markd = mdStr || ''
        }
        return mdRender(markd)
      },
    },
  }
</script>

<style lang="scss">
  .el-message {
    top: 65px !important;
  }

  .article_id {
    background-color: #fff;
    padding: 15px;
    .article-title {
      text-align: center;
      font-size: 20px;
      color: #666;
      margin: 16px 0;
    }

    .article-info {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding-bottom: 15px;

      span {
        padding: 0 6px;
      }
    }

    .article-content {
      font-size: 14px;
      line-height: 34px;
      pre{
        max-height: 400px;
      }
    }

    .article-type {
      /*border-top: 2px solid #ccc;*/
      border-left: 2px solid #ccc;
      background-color: #f6f8fa;
      margin-top: 30px;
      margin-bottom: 15px;
      padding: 15px 0 15px 15px;
      font-size: 14px;

      p {
        padding-bottom: 5px;
      }

      a {
        color: #409EFF;
        text-decoration: underline;
        font-weight: bold;
      }
    }

    .art_tag {
      a {
        padding: 0 6px;
      }
    }

    .not-found{
      text-align: center;
    }
  }
</style>
