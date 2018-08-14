<template>
  <div class="artdetail_container clearfix">
    <div class="right_content">
      <h3 class="artdetail_title">{{artDetail.artTitle}}</h3>
      <div class="artdetail_post_info">
        <span>{{artDetail.cdate}}</span><span>post by</span><span>{{artDetail.author}}</span>
        <span>浏览 {{artDetail.pv}} 次</span>
      </div>
      <div class="artdetail_content markdown-body">
        <div v-html="markdownRender">

        </div>
      </div>
    </div>
    <div class="left_munu">
      <!--<div class="menus" v-html="markdownRenderToc"></div>-->
    </div>
  </div>
</template>

<script>
  var hljs = require('highlight.js')
  var toc = require('markdown-it-toc')
  // 表情
  var emoji = require('markdown-it-emoji');
  // 下标
  var sub = require('markdown-it-sub')
  // 上标
  var sup = require('markdown-it-sup')
  // <dl/>
  var deflist = require('markdown-it-deflist')
  // <abbr/>
  var abbr = require('markdown-it-abbr')
  // footnote
  var footnote = require('markdown-it-footnote')
  // insert 带有下划线 样式 ++ ++
  var insert = require('markdown-it-ins')
  // mark
  var mark = require('markdown-it-mark')
  // taskLists
  var taskLists = require('markdown-it-task-lists')
  //
  var container = require('markdown-it-container')
  var katex = require('markdown-it-katex-external');
  var miip = require('markdown-it-images-preview');
  var markdown_config = {
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,        // Use '/' to close single tags (<br />).
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
    linkify: false,        // 自动识别url
    typographer: true,
    quotes: '“”‘’',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {
        }
      }

      return '';
    }
  }

  let md = require('markdown-it')(markdown_config)
    .use(emoji)
    .use(taskLists)
    .use(sup)
    .use(sub)
    .use(container)
    .use(container, 'hljs-left') /* align left */
    .use(container, 'hljs-center')/* align center */
    .use(container, 'hljs-right')/* align right */
    .use(deflist)
    .use(abbr)
    .use(footnote)
    .use(insert)
    .use(mark)
    .use(container)
    .use(miip)
    .use(toc)
  export default {
    name: 'detail',
    data() {
      return {
        md: md
      }
    },
    head() {
      return {
        title: this.$store.state.article.details.artTitle,
      }
    },
    fetch({store, params}) {
      return store.dispatch('getArtDetail', {
        id: params.id
      })
    },
    computed: {
      artDetail() {
        return this.$store.state.article.details || {};
      },
      markdownRender() {
        let mdStr = this.$store.state.article.details.md
        let markd = '';
        if (this.$store.state.article.details) {
          markd = mdStr || ''
        }
        return md.render(markd)
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="less">
  .artdetail_container {
    background-color: #fff;
    padding: 20px;
    .left_munu {
      float: left;
      width: 20%;
      padding-left: 20px;
      .menus{
        position: fixed;
        top: 100px;
      }
    }
    .right_content {
      float: left;
      width: 80%;
    }
    .artdetail_title {
      text-align: center;
      font-size: 20px;
      line-height: 40px;
    }
    .artdetail_post_info {
      padding: 10px 6px;
      text-align: center;
      font-size: 13px;
      border-bottom: 2px solid #ccc;
      & > span {
        margin-right: 10px;
      }
    }
    .artdetail_content {
      padding-top: 20px;
      img {
        margin: auto;
        text-align: right;

      }
    }
  }
</style>
