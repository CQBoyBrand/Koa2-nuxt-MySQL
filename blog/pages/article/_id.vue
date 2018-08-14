<template>
  <div class="artdetail_container ">
    <div class="detail_body clearfix">
      <div class="right_mdcontent">
        <h3 class="artdetail_title">{{artDetail.artTitle}}</h3>
        <div class="artdetail_post_info">
          <span>{{artDetail.cdate}}</span><span>post by</span><span>{{artDetail.author}}</span>
          <span>浏览 {{artDetail.pv}} 次</span>
        </div>
        <div class="artdetail_content markdown-body">
          <div v-html="markdownRender" ref="htmlContent">

          </div>
          <!--留言区-->
          <div class="art_comment">
            <div class="comment_title">我要吐槽</div>
            <div class="comment_tips">
              <p style="font-size: 16px;color: #000;font-weight: bold;">提示：</p>
              <p>昵称必填，用于展示在评论中</p>
              <p>邮箱必填，不会公开展示，方便及时收到回复</p>
              <p>网址选填，方便看到的人去访问,请完整填写,例如(http://www.brandhuang.com)</p>
            </div>
            <div class="comment_form">
              <el-form :model="artComment" ref="artComment">
                <el-row :gutter="10">
                  <el-col :sm="12" :md="8">
                    <el-form-item
                      prop="nickName"
                      label="昵称(必填)："
                      :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
                    >
                      <el-input v-model="artComment.nickName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item
                      prop="email"
                      label="邮箱(必填)："
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
                    >
                      <el-input v-model="artComment.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item
                      prop="webUrl"
                      label="网址(选填)：">
                      <el-input v-model="artComment.webUrl"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item
                  label="内容(必填)："
                  :rules="[{ required: true, message: '请输入评论内容', trigger: 'blur' }]"
                  prop="comment">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="artComment.comment"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" :loading="committing" @click="postArtComment('artComment')">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="left_munu">
        <div class="menus">
          目录:
          <div class="menuNav" ref="menuNav" v-html="markdownToc"></div>
        </div>
      </div>
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
        committing: false,
        artComment: {
          email: '',
          webUrl: '',
          nickName: '', //昵称
          comment: ''
        }
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
      },
      markdownToc() {
        let mdStr = this.$store.state.article.details.md
        let markd = '';
        if (this.$store.state.article.details) {
          markd = mdStr || ''
        }
        return md.render(markd)
      }
    },
    methods: {
      // 评论
      postArtComment(formName) {
        this.committing = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            setTimeout(() => {
              this.committing = false
            },500)

          } else {
            console.log('error submit!!');
            setTimeout(() => {
              this.committing = false;
            },500)
            return false;
          }
        });
      },
      navMenu() {
        let nodes = this.$refs.menuNav.children
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i], i, nodes)
          }
        }
        let _this = this
        this.$refs.menuNav.style.display = 'block'

        function judageH(node, i, nodes) {
          let reg = /^H[1-6]{1}$/;
          if (!reg.exec(node.tagName)) {
            node.style.display = 'none'
          } else {
            node.onclick = function () {
              let htmlContent = _this.$refs.htmlContent.children[i];
              let pos = htmlContent.offsetTop
              document.documentElement.scrollTop = pos - 60
              document.body.scrollTop = pos - 60
            }
          }
        }
      }
    },
    mounted() {
      this.navMenu()
    }
  }
</script>

<style lang="less">
  .artdetail_container {
    background-color: #fff;
    padding: 20px;
    @media screen and (max-width: 992px) {
      .left_munu {
        display: none;
      }

      .right_mdcontent {
        float: left;
        width: 100%;
      }
    }
    @media screen and (min-width: 992px) {
      .right_mdcontent {
        float: left;
        width: 80%;
      }
    }
    .left_munu {
      float: left;
      width: 20%;
      padding-left: 20px;
      .menus {
        position: fixed;
        top: 100px;
        max-width: 240px;
        border-left: 1px solid #ccc;
        padding-left: 20px;
        .menuNav {
          display: none;
        }
        h1, h2, h3, h4, h5, h6 {
          margin: 2px 0;
          font-weight: 500;
          font-size: 17px;
          color: #2185d0;
          cursor: pointer;
          line-height: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 12px;
          border-bottom: none;
          &:hover {
            color: #483D8B;
            text-decoration-line: underline;
          }
        }
        h2 {
          padding-left: 27px;
          font-size: 17px;
        }
        h3 {
          padding-left: 42px;
          font-size: 17px;
        }
        h4 {
          padding-left: 58px;
          font-size: 15px;
        }
        h5 {
          padding-left: 72px;
          font-size: 15px;
        }
        h6 {
          padding-left: 87px;
          font-size: 15px;
        }
      }
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

    .art_comment {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 2px solid #000;
      .comment_title {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }
      .comment_tips {
        font-size: 12px;
        color: #999;
        p {
          margin-bottom: 0;
        }
      }
      .comment_form {
        padding-top: 30px;
      }
    }
  }
</style>
