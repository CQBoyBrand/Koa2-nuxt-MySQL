<template>
  <div class="article_id clearfix">
    <div class="left-content">
      <h2 class="article-title">{{articleDetail.artTitle}}</h2>
      <p class="article-info"><span>发布于：{{articleDetail.cdate}}</span><span>{{articleDetail.pv}} 次浏览</span><span>{{articleDetail.discuss}} 条评论</span>
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
      </div>

      <!--评论-->
      <div class="comment-container">
        <div class="comment-title" id="tohere">
          共<span>{{articleDetail.discuss}}</span>条评论
        </div>
        <div class="comment_tips">
          <p style="font-size: 16px;color: #000;font-weight: bold;">提示：</p>
          <p>昵称必填，用于展示在评论中</p>
          <p>邮箱必填，不会公开展示，方便及时收到回复</p>
          <p>网址选填，方便看到的人去访问,请完整填写,例如(http://www.brandhuang.com)</p>
        </div>
        <div class="comment_form">
          <el-form :model="artComment" ref="artComment">
            <input type="hidden" v-model="artComment.toemail" v-if="toReply !=''"/>
            <input type="hidden" v-model="artComment.tonickname" v-if="toReply !=''"/>
            <span v-if="toReply != ''" class="reply_to clearfix">回复：{{toReply}} <i class="el-icon-error"
                                                                                   style="float: right;margin-top: 3px;cursor: pointer;"
                                                                                   @click="cleanToReply"></i></span>
            <el-form-item
              label="内容(必填)："
              :rules="[{ required: true, message: '请输入评论内容', trigger: 'blur' }]"
              prop="content">
              <el-input
                type="textarea"
                ref="textInput"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入内容"
                v-model="artComment.content"></el-input>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :sm="12" :md="8">
                <el-form-item
                  prop="nickname"
                  label="昵称(必填)："
                  :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
                >
                  <el-input v-model="artComment.nickname"></el-input>
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
                  :rules="[
                  {required:false,validator: validateUrl, trigger: ['blur','change'] }
                  ]"
                  label="网址(选填)：">
                  <el-input v-model="artComment.webUrl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button id="commentSuccess" class="sbm_btn" type="primary" :loading="committing"
                         @click="postArtComment('artComment')">提交
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="commentsList.result.length > 0" class="comment-list-wrap">
          <div class="comment-list" v-for="(item,index) in commentsList.result" :key="index">
            <div class="clearfix">

              <a :href="item.from_uweb" target="_blank" class="clearfix comment-user" v-if="item.from_uweb !=null && item.from_uweb.length > 0">
                <img :src="item.from_uavatar" alt="item.from_uname"><span>{{item.from_uname}}</span>
              </a>
              <div v-else class="clearfix comment-user nocursor">
                <img :src="item.from_uavatar" alt="item.from_uname"><span>{{item.from_uname}}</span>
              </div>
              <div class="comment-time">{{item.cdate}}</div>
            </div>
            <div class="comment-content">
              <div class="comment-list replyContent-bg" v-if="item.oldContent != null">
                <div class="clearfix">
                  <a :href="item.to_uweb" target="_blank" class="clearfix comment-user" v-if="item.to_uweb != null && item.to_uweb.length > 0">
                    <img :src="item.to_uavatar" alt="item.from_uname"><span>{{item.to_uname}}</span>
                  </a>
                  <div v-else class="clearfix comment-user nocursor">
                    <img :src="item.to_uavatar" alt="item.from_uname"><span>{{item.to_uname}}</span>
                  </div>
                  <div class="comment-time">{{item.oldCdate}}</div>
                </div>
                <div class="comment-content">
                  {{item.oldContent}}
                </div>
              </div>
              {{item.content}}
            </div>
            <div class="clearfix">
              <span class="replyBtn" @click="replyComment(item)">回复</span>
            </div>
          </div>
          <el-pagination
            style="text-align: center;"
            @current-change="getMoreArt"
            :current-page="commentsList.currentPage"
            :page-size="commentsList.limit"
            layout="prev, pager, next"
            :total="commentsList.total">
          </el-pagination>
        </div>
        <div v-else class="no-comment">
          沙发还没有人抢哦～～
        </div>
      </div>
    </div>
    <div class="side-content">
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
  import sidebar from '@/components/sidebar'

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
    watchQuery: ['page'],
    name: 'id',
    components: {
      sidebar
    },
    head() {
      return {
        title: this.$store.state.article.detail.artTitle,
        meta: [
          {hid: 'index', name: 'description', content: this.$store.state.article.detail.abstract}
        ]
      }
    },
    async fetch({store, params, query}) {
      await store.dispatch('getArtDetail', {id: params.id});
      await store.dispatch('getComment', {id: params.id, currentPage: query.page});
    },
    data() {
      let validateUrl = (rule, value, callback) => {
        // let isUrl = /((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i.test(value);
        let isUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i.test(value);

        if(value.length > 0 && isUrl == false){
          this.urlIsCorrect = false
          callback(new Error('请输入正确的网址'))
        }else {
          callback()
          this.urlIsCorrect = true
        }
      };
      return {
        commentType:'comment',
        committing: false,
        urlIsCorrect: true, // 输入网址后校验正确性
        toReply: '', // 要回复的用户
        artComment: {
          artId: this.$store.state.article.detail.id,
          email: '',
          nickname: '',
          content: '',
          webUrl: '',
        },
        validateUrl:validateUrl,
        replyForm: {
          artId: this.$store.state.article.detail.id,
          email: '',
          nickname: '',
          content: '',
          webUrl: '',
          oldContent: '',
          touemail: '',
          touweb: '',
          touname: '',
        }
      }
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
        return tag.split(',')
      },
      markdownRender() {
        let mdStr = this.$store.state.article.detail.content
        let markd = '';
        if (this.$store.state.article.detail) {
          markd = mdStr || ''
        }
        return md.render(markd)
      },
    },
    methods: {
      //翻页
      getMoreArt(val) {

        this.$store.dispatch('getComment', {id: this.$route.params.id, currentPage: val});
        this.$nextTick(() => {
          let el = document.getElementById('commentSuccess')
          el.scrollIntoView()
        })
      },
      cleanToReply() {
        this.toReply = ''
        this.commentType = 'comment'
      },
      //发布评论
      postArtComment(formName) {
        let useInfo = {
          email: this.artComment.email,
          nickname: this.artComment.nickname,
          webUrl: this.artComment.webUrl,
        }
        localStorage.setItem("commentUserInfo", JSON.stringify(useInfo))
        this.$refs[formName].validate((valid) => {
          if (valid && this.urlIsCorrect) {
            this.committing = true
            if(this.commentType == 'comment'){
              this.$store.dispatch('addComment', this.artComment).then(res => {
                if (res.code == 1) {
                  this.$message.success(res.message)
                  this.artComment.content = ''
                  this.$store.dispatch('getComment', {id: this.$route.params.id});
                  let el = document.getElementById('commentSuccess')
                  el.scrollIntoView()
                  setTimeout(() => {
                    this.committing = false
                  }, 500)
                } else {
                  this.$message.error(res.message)
                  this.committing = false
                }
              })
            }else {
              this.replyForm.content =this.artComment.content

              this.$store.dispatch('addReplyComment', this.replyForm).then(res => {
                if (res.code == 1) {
                  this.$message.success(res.message)
                  this.artComment.content = ''
                  this.toReply = ''
                  this.commentType = 'comment'
                  this.$store.dispatch('getComment', {id: this.$route.params.id});
                  let el = document.getElementById('commentSuccess')
                  el.scrollIntoView()
                  setTimeout(() => {
                    this.committing = false
                  }, 500)
                } else {
                  this.$message.error(res.message)
                  this.committing = false
                }
              })
            }

          } else {
            setTimeout(() => {
              this.committing = false;
            }, 500);
            return false;
          }
        });
      },
      // 回复评论
      replyComment(item) {
        this.commentType = 'reply'
        this.toReply = item.from_uname
        let el = document.getElementById('tohere')
        el.scrollIntoView()
        this.$refs.textInput.focus()
        this.replyForm = {
          artId: this.$store.state.article.detail.id,
          email: this.artComment.email ,
          nickname: this.artComment.nickname ,
          content: '',
          webUrl: this.artComment.webUrl,
          oldContent: item.content,
          oldCdate: item.timestamp,
          touemail: item.from_uemail,
          touweb: item.from_uweb,
          touname: item.from_uname,
          touavatar: item.from_uavatar,
        }
      }
    },
    mounted() {
      if (localStorage.getItem('commentUserInfo')) {
        this.artComment.email = JSON.parse(localStorage.getItem('commentUserInfo')).email || ''
        this.artComment.nickname = JSON.parse(localStorage.getItem('commentUserInfo')).nickname || ''
        this.artComment.webUrl = JSON.parse(localStorage.getItem('commentUserInfo')).webUrl || ''
      }

    }
  }
</script>

<style lang="scss">
  .el-message {
    top: 65px !important;
  }

  .article_id {
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
    }

    .article-type {
      border-top: 2px solid #ccc;
      margin-top: 30px;
      padding: 15px 0;
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


    .comment-container {
      .comment-title {
        font-size: 13px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;

        span {
          color: darkorange;
          padding: 0 6px;
        }
      }

      .comment_tips {
        font-size: 12px;
        color: #999;

        p {
          margin-bottom: 0;
        }
      }

      .comment_form {
        padding-top: 10px;

        .reply_to {
          display: block;
          border: 1px solid #ddd;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }

      .no-comment {
        text-align: center;
        color: #333;
        font-size: 14px;
      }

      .comment-list-wrap{
        padding-top: 15px;
        border-top: 1px solid #eee;
      }
      .comment-list {
        border-bottom: 1px dashed #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .comment-user {
          display: block;
          float: left;

          img {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            float: left;
            margin-right: 10px;
          }

          span {
            display: inline-block;
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          line-height: 20px;
          font-size: 14px;
        }

        .comment-time {
          float: right;
          font-size: 12px;
          color: #333;
        }

        .comment-content {
          text-indent: 2em;
          font-size: 14px;
          color: #333;
          line-height: 20px;
          padding: 8px 0;
        }

        .replyBtn {
          float: right;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
    .replyContent-bg{
      background-color: #eee;
      padding: 10px;
      box-sizing: border-box;
      .comment-user,.comment-time{
        text-indent: 0;
      }
    }
  }
</style>
