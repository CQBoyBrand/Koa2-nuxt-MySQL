<template>
  <div class="friends">
    <div class="firends-container">
      <div class="friends-title">换个友链？</div>
      <!--          <div class="friends-big-image"><img src="@/assets/images/friends.gif" alt=""></div>-->
      <div class="friends-title">注意事项：</div>
      <ol class="friends-attention">
        <li><span>先友后链</span>，重要的事情只说一遍！</li>
        <li><span>连续三天</span> 不可访问将单向删除！</li>
        <li>站点涉及 <span>敏感内容</span>永拒！！</li>
        <li>其他待定</li>
      </ol>
      <div class="friends-title">申请方式：</div>
      <div class="apply-format">
        <div class="apply-tips"><del>请如下格式在评论区留言</del></div>
        <div class="apply-tips">该模块评论功能待完善</div>
        <div class="apply-tips">请先复制如下内容在任意文章中留言，或者给我 <a href="mailto:brandhuang@qq.com">发邮件</a></div>
        <div class="format-code">
          <p>[必填]站点名称：重庆崽儿Brand</p>
          <p>[必填]站点链接：[http://www.brandhaung.com](http://www.brandhaung.com)</p>
          <p>[选填]站点介绍：工作、生活、诗与远方</p>
          <p>[选填]站点头像：https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80</p>
        </div>
      </div>
      <ul class="friends-box clearfix">
        <li v-for="(link, i) in linkList" :key="i">
          <a :href="link.siteUrl" target="_blank">{{link.siteName}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import htmlparser from 'htmlparser2'

  let hljs = require('highlight.js')
  let toc = require('markdown-it-toc')
  // 表情
  let emoji = require('markdown-it-emoji');
  // 下标
  let sub = require('markdown-it-sub')
  // 上标
  let sup = require('markdown-it-sup')
  // <dl/>
  let deflist = require('markdown-it-deflist')
  // <abbr/>
  let abbr = require('markdown-it-abbr')
  // footnote
  let footnote = require('markdown-it-footnote')
  // insert 带有下划线 样式 ++ ++
  let insert = require('markdown-it-ins')
  // mark
  let mark = require('markdown-it-mark')
  // taskLists
  let taskLists = require('markdown-it-task-lists')
  let miip = require('markdown-it-images-preview');
  let markdown_config = {
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
    .use(deflist)
    .use(abbr)
    .use(footnote)
    .use(insert)
    .use(mark)
    .use(miip)
    .use(toc)
  export default {
    name: "friends",
    head() {
      return {
        title: '关于我',
      }
    },
    data() {
      return {}
    },
    computed: {
      linkList() {
        return this.$store.state.link.list
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {},
  }
</script>

<style lang="scss">
  .friends {
    background-color: #fff;
    padding: 20px 10px;

    .firends-container {
      max-width: 800px;
      margin: 0 auto;

      .friends-big-image {
        width: 280px;
        height: 280px;
        margin: 0 auto;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .friends-title {
        font-weight: bold;
        color: #333;
        padding: 15px 0;
        font-size: 16px;
      }

      .friends-attention {
        padding: 0 22px;
        font-size: 13px;
        line-height: 24px;

        li {
          font-weight: bold;

          span {
            color: orangered;
          }
        }
      }

      .apply-format {
        .format-code {
          background-color: #f6f8fa;
          color: #333;
          padding: 10px;
          font-size: 13px;
          line-height: 20px;
          word-break: break-all;
          margin-top: 10px;
        }
        .apply-tips{
          font-size: 12px;
          a{
            color: #409EFF;
          }
        }
      }

      .friends-box {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;

        li {
          list-style: none;
          float: left;
          width: 33%;
          text-align: center;
          margin-bottom: 15px;

          a {
            background-color: #7F828B;
            color: #fff;
            display: inline-block;
            width: 80%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
            padding: 15px 10px;
          }
        }
      }
    }
  }
</style>
