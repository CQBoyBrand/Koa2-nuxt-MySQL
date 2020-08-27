<template>
  <div class="article_id clearfix">
    <div class="left-content" v-if="articleDetail.artTitle">
      <h2 class="article-title">{{articleDetail.artTitle}}</h2>
      <p class="article-info"><span>发布于：{{articleDetail.cdate.split(" ")[0]}}</span><span>{{articleDetail.pv}} 次浏览</span><span>{{commentsList.total}} 条评论</span>
      </p>
      <div class="article-content" id="r-md-preview">
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


    <!--评论-->
    <comment :artDiscuss="articleDetail.artDiscuss" :commentsList="commentsList" :commentId="{id:articleDetail.id}"></comment>
  </div>
</template>

<script>
  import comment from '@/components/comment'
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  import marked from "marked";
  import emoji from 'node-emoji'
  import hljs from 'highlight.js'
  const renderer = new marked.Renderer();
  let tocs = [];

  // renderer.heading = function(text, level, raw) {
  //   let anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
  //   tocs.push({
  //     anchor: anchor,
  //     level: level,
  //     text: text
  //   });
  //   console.log(1)
  //   return `<h${level} id="${anchor}">${text} </h${level}>`
  // };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    // tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code, lang, callback) {
      return hljs.highlightAuto(code).value;
    }
  });

  import {timestampToTime }  from '@/utils/utils'

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
    mounted() {
      const gallery = new Viewer(document.getElementById('r-md-preview'),{
        // movable: false,
        zIndex: 9999
      });
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
        // console.log(23)
        // this.$store.commit('article/SET_ART_TOC', tocs)
        const replacer = (match) => emoji.emojify(match)
        return marked(markd.replace(/(:.*:)/g, replacer)).replace(/<a/g, '<a target="_blank"')
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
      img{
        border-radius: 8px;
      }
    }
    #r-md-preview{
      @media screen and (max-width: 920px) {
        padding-left: 0;
        padding-right: 0;
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
