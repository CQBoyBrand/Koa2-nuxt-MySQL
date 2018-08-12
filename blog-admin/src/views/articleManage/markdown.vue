<template>
  <div class="markdown_container">
    <el-form ref="artForm" :rules="artFormRules" :model="artForm" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="artForm.title"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="文章摘要" prop="abstract">
            <el-input type="textarea" v-model="artForm.abstract"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章分类" prop="type">
            <el-select v-model="artForm.type" filterable placeholder="请选择">
              <el-option
                v-for="item in artType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="添加缩略图">
            <!--<el-input v-model="artForm.thumbnail"></el-input>-->
            <el-upload
              class="avatar-uploader"
              :action="domain"
              :show-file-list="false"
              :http-request="uploadImg"
              :before-upload="beforeUpload">
              <img v-if="artForm.thumbnail" :src="artForm.thumbnail" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章标签" prop="tagId">
            <el-select
              v-model="artForm.tagId"
              multiple
              filterable
              default-first-option
              placeholder="请选择文章标签">
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.tagName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="文章内容" prop="md">
        <mavon-editor v-model="artForm.md" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
        <el-input type="hidden" v-model="artForm.md"></el-input>
      </el-form-item>
      <el-form-item v-if="!hideTime" label="发布日期" prop="publishDate">
        <el-date-picker
          v-model="artForm.publishDate"
          type="datetime"
          value-format="timestamp"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="editor-btn" type="primary" @click="submitData('artForm')">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'markdown',
    data() {
      return {
        hideTime: false,
        uploadToken: {},
        domain: "https://upload-z0.qiniup.com", // 七牛云的上传地址，根据自己所在地区选择，我这里是华东
        qiniuaddr: "static.brandhuang.com",// 这是七牛云空间的外链默认域名，可换成自己的   p063wr224.bkt.clouddn.com
        artForm: {
          title: '',
          abstract: '',
          thumbnail: '',
          md: '',
          publishDate: '',
          type: '',
          tagId: ''
        },
        artFormRules: {
          title: [
            {required: true, message: '请输入文章标题', trigger: 'blur'}
          ],
          abstract: [
            {required: true, message: '请输入文章摘要', trigger: 'blur'}
          ],
          md: [
            {required: true, message: '请输入文章内容', trigger: 'blur'}
          ],
          publishDate: [
            {required: true, message: '请选择发布日期', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择文章分类', trigger: 'blur'}
          ],
          tagId: [
            {required: true, message: '请选填写文章标签', trigger: 'blur'}
          ]
        },
        artType: [
          {
            label: '首页',
            value: '1'
          },
          {
            label: '碎言碎语',
            value: '2'
          }
        ],
        tagList: [],
        content: '',
        html: '',
        configs: {}
      }
    },
    components: {
      mavonEditor
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      //  图片上传七牛云
      uploadImg(req) {
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        let filetype = ''
        if (req.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        // 重命名要上传的文件
        const keyname = "HiBrand-" + new Date().getTime() + Math.floor(Math.random() * 100) + '.' + filetype
        this.$get('/uploadTolen').then(res => {
          const formdata = new FormData()
          formdata.append('file', req.file)
          formdata.append('token', res.data.data)
          formdata.append('key', keyname)
          // 获取到凭证之后再将文件上传到七牛云空间
          this.$post(this.domain, formdata, config).then(result => {
            this.artForm.thumbnail = 'http://' + this.qiniuaddr + '/' + result.data.key
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 图片上传前
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },

      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file) {
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        let filetype = ''
        if ($file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        // 重命名要上传的文件
        const keyname = "HiBrand-" + new Date().getTime() + Math.floor(Math.random() * 100) + '.' + filetype
        this.$get('/uploadTolen').then(res => {
          const formdata = new FormData()
          formdata.append('file', $file)
          formdata.append('token', res.data.data)
          formdata.append('key', keyname)
          // 获取到凭证之后再将文件上传到七牛云空间
          this.$post(this.domain, formdata, config).then(result => {
            let url = 'http://' + this.qiniuaddr + '/' + result.data.key
            this.$refs.md.$img2Url(pos, url);
          })
        }).catch(err => {
          console.log(err)
        })
      },
      change(value, render) {
        // render 为 markdown 解析后的结果
        this.html = render;
      },
      initFrom() {
        this.artForm = {
          title: '',
          abstract: '',
          thumbnail: '',
          md: '',
          publishDate: '',
          type: '',
          tagId: ''
        }
      },
      submitData(formName) {
        if(this.$route.query.method == 'edit'){
          this.artForm.id = this.$route.query.id
          this.artForm.tagId = this.artForm.tagId.join(',')
          this.$post('editArticle',this.artForm).then( res => {
            if(res.data.code == 200){
              this.$message.success(res.data.message);
              this.$router.push('/articleList')
              this.initFrom()
            }else {
              this.$message.error(res.data.message);
            }
          })
        }else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.artForm.tagId = this.artForm.tagId.join(',')
              this.$post('addArticle',this.artForm).then( res => {
                if(res.data.code == 200){
                  this.$message.success(res.data.message);
                  this.$router.push('/articleList')
                  this.initFrom()
                }else {
                  this.$message.error(res.data.message);
                }
              }).catch( err => {
                console.log(err)
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    },
    mounted() {
      let artId = this.$route.query.id
      let method = this.$route.query.method
      if(method == 'edit'){
        this.initFrom()
        this.hideTime = true
        this.$post('editArticleDetail',{id:artId}).then( res => {
          this.artForm = res.data.articleDetail
          this.artForm.tagId = res.data.articleDetail.tagId.split(',').map(Number)
        })
      }else {
        this.hideTime = false
      }
      this.$post('getArtTagList').then( res => {
        this.tagList = res.data.tagList
      }).catch( err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="less">
  .markdown_container {
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    .el-upload--text {
      width: 240px;
      height: 100px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 240px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 240px;
      height: 100px;
      display: block;
    }
  }
</style>
