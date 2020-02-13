<template>
  <div class="art-manage">
    <div class="current-title">
      文章管理
    </div>
    <el-form ref="artForm" :rules="artFormRules" :model="artForm" label-width="100px">
      <el-form-item label="文章标题" prop="artTitle">
        <el-input v-model="artForm.artTitle"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="文章摘要" prop="abstract">
            <el-input type="textarea" v-model="artForm.abstract"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章分类" prop="category">
            <el-select v-model="artForm.category" filterable placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.categoryname"
                :value="item.categoryname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="添加缩略图" prop="thumbnail">
            <el-input v-model="artForm.thumbnail" style="margin-bottom: 8px;"></el-input>
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
          <el-form-item label="文章标签" prop="tag">
            <el-select
              v-model="artForm.tag"
              multiple
              filterable
              default-first-option
              placeholder="请选择文章标签">
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.tagname"
                :value="item.tagname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="文章内容" prop="content">
        <mavon-editor v-model="artForm.content" :ishljs = "true" ref="md" @imgAdd="$imgAdd" @save="save" @change="change" style="min-height: 600px"/>
        <el-input type="hidden" v-model="artForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="editor-btn" type="primary" @click="submitData('artForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      hideTime: false,
      uploadToken: {},
      domain: 'https://upload-z0.qiniup.com', // 七牛云的上传地址，根据自己所在地区选择，我这里是华东
      qiniuaddr: 'static.brandhuang.com', // 这是七牛云空间的外链默认域名，可换成自己的   p063wr224.bkt.clouddn.com
      artForm: {
        artTitle: '',
        abstract: '',
        thumbnail: '',
        content: '',
        category: '',
        tag: ''
      },
      artFormRules: {
        artTitle: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '请选填写文章标签', trigger: 'blur' }
        ]
      },
      categoryList: [
        // {
        //   label: '首页',
        //   value: '1'
        // },
        // {
        //   label: '碎言碎语',
        //   value: '2'
        // }
      ],
      tagList: [
        // {id: '1', tagName: '标签'},
        // {id: '3', tagName: '标签2'},
        // {id: '4', tagName: '标签3'},
      ],
      content: '',
      html: '',
      configs: {}
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    //  图片上传七牛云
    uploadImg (req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = this.$store.state.auth.username + '-' + new Date().getTime() + Math.floor(Math.random() * 100) + '.' + filetype
      this.Ajax.getQNToken().then(res => {
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.result.token)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.Ajax.uploadToQN(this.domain, formdata).then(res => {
          this.artForm.thumbnail = 'http://' + this.qiniuaddr + '/' + res.key
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 图片上传前
    beforeUpload (file) {
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
    $imgAdd (pos, $file) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let filetype = ''
      if ($file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = this.$store.state.auth.username + '-' + new Date().getTime() + Math.floor(Math.random() * 100) + '.' + filetype
      this.Ajax.getQNToken().then(res => {
        const formdata = new FormData()
        formdata.append('file', $file)
        formdata.append('token', res.result.token)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.Ajax.uploadToQN(this.domain, formdata).then(res => {
          let url = 'http://' + this.qiniuaddr + '/' + res.key
          this.$refs.md.$img2Url(pos, url)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
    },
    save () {
      this.submitData('artForm')
    },
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.artForm.tag = this.artForm.tag.join(',')
          if (this.$route.query.method === 'edit') {
            this.artForm.id = this.$route.query.id
            this.Ajax.editArticle(this.artForm).then(res => {
              this.$message.success('文章修改成功')
              this.$router.push({
                name: 'artlist'
              })
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.Ajax.addArticle(this.artForm).then(res => {
              this.$message.success('文章添加成功')
              this.$router.push({
                name: 'artlist'
              })
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取文章详情
    getArtDetail () {
      let id = this.$route.query.id
      this.Ajax.getArticleDetail({ id }).then(res => {
        res.tag = res.tag.split(',')
        this.artForm = res
      }).catch(err => {

      })
    },
    // 获取标签
    getAllTaglist () {
      this.Ajax.getAllTag().then(res => {
        this.tagList = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取所有分类
    getAllCategorylist () {
      this.Ajax.getAllCategory().then(res => {
        this.categoryList = res
      }).catch(err => {

      })
    }
  },
  mounted () {
    this.getAllTaglist()
    this.getAllCategorylist()
    let method = this.$route.query.method
    if (method === 'edit') {
      this.hideTime = true
      this.getArtDetail()
    } else {
      this.hideTime = false
    }
  }
}
</script>

<style lang="scss">
.art-manage{
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
