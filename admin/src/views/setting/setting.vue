<template>
  <div class="setting">
    <div class="current-title">
      设置
    </div>
    <div class="clearfix setting-container">
      <div class="site-setting">
        <div class="current-title">
          站点设置：
        </div>
        <el-form :model="siteForm" :rules="siteFormrules" ref="siteForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="ICP备案号：" prop="icp">
            <el-input v-model="siteForm.icp"></el-input>
          </el-form-item>
          <el-form-item label="公安备案号：" prop="psr">
            <el-input v-model="siteForm.psr"></el-input>
          </el-form-item>
          <el-form-item label="全站评论：" prop="discussStatus">
            <el-switch
              v-model="siteForm.discussStatus"
              active-text="开启"
              inactive-text="关闭"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitsiteForm('siteForm')"> {{configType === 'add' ? '保存' : '更新'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="user-setting">
        <div class="current-title">
          用户设置：
        </div>
        <el-form :model="authorForm" status-icon :rules="authorFormRule" ref="authorForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              :action="domain"
              :show-file-list="false"
              :http-request="uploadImg"
              :before-upload="beforeUpload">
              <img v-if="authorForm.avatar" :src="authorForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="authorForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input type="text" v-model="authorForm.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input type="text" v-model="authorForm.signature" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldpass">
            <el-input type="password" v-model="authorForm.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="authorForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="authorForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAuthorForm('authorForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'setting',
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.authorForm.checkPass !== '') {
          this.$refs.authorForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.authorForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      domain: 'https://upload-z0.qiniup.com', // 七牛云的上传地址，根据自己所在地区选择，我这里是华东
      qiniuaddr: 'static.brandhuang.com', // 这是七牛云空间的外链默认域名，可换成自己的   p063wr224.bkt.clouddn.com
      siteForm: {
        icp: '',
        psr: '',
        discussStatus: false
      },
      configType: 'add',
      siteFormrules: {
        icp: [
          { required: true, message: '请输入ICP备案号', trigger: 'blur' }
        ],
        psr: [
          { required: true, message: '请输入公安备案号', trigger: 'blur' }
        ]
      },
      authorFormRule: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        oldpass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    authorForm () {
      return this.$store.state.auth
    }
  },
  watch: {
    // authorForm(){
    //   console.log('this.authData=',this.authData)
    //   this.authorForm = this.authData
    // }
  },
  methods: {
    getConfig () {
      this.Ajax.getConfig().then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.siteForm = {
              id: res.data.id,
              icp: res.data.icp,
              psr: res.data.psr,
              discussStatus: res.data.discussStatus === 1
            }
            if (res.data.id > 0) {
              this.configType = 'edit'
            } else {
              this.configType = 'add'
            }
          }
        }
      })
    },
    /**
       * Author: brand
       * Creation Time: 2019-03-10 16:11
       * Description: 保存站点信息
       */
    submitsiteForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.siteForm.discussStatus) {
            this.siteForm.discussStatus = 1
          } else {
            this.siteForm.discussStatus = 0
          }
          if (this.configType === 'add') {
            this.Ajax.addConfig(this.siteForm).then(res => {

              this.$message.success('操作成功')
              this.getConfig()
            })
          } else {
            this.Ajax.editConfig(this.siteForm).then(res => {
              this.$message.success('操作成功')
              this.getConfig()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
       * Author: brand
       * Creation Time: 2019-03-10 16:11
       * Description: 保存站长信息
       */
    submitAuthorForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.authorForm)
          let postData = {
            id: this.authorForm.id,
            password: md5(this.authorForm.oldpass),
            nickname: this.authorForm.nickname,
            username: this.authorForm.username,
            avatar: this.authorForm.avatar,
            signature: this.authorForm.signature,
            newpass: md5(this.authorForm.password)
          }
          this.Ajax.updateUserInfo(postData).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$store.dispatch('authInit', { username: localStorage.getItem('username') })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          }).catch(err => {
            console.log('err=', err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.Ajax.uploadToQN(this.domain, formdata, config).then(result => {
          this.authorForm.avatar = 'http://' + this.qiniuaddr + '/' + result.key
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
    }
  },
  mounted () {
    this.getConfig()
  }
}
</script>

<style lang="scss">
  .setting {
    .setting-container {
      color: #444d56;

      .site-setting, .user-setting {
        width: 45%;
      }

      .site-setting {
        float: left;
      }

      .user-setting {
        float: right;

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
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
    }
  }
</style>
