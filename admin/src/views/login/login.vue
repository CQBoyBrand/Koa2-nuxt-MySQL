<template>
  <div class="login">
    <el-form ref="loginFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="login-container">
      <h3 class="title">管理员登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import md5 from 'md5'

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      account: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginFrom.validate((valid) => {
        if (valid) {
          let accountInfo = {
            username: this.account.username,
            password: md5(this.account.password)
          }
          this.Ajax.login(accountInfo).then(res => {
            if (res.code === 200) {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('username', res.data.username)
              this.$router.push({
                name: 'home'
              })
              this.$message.success('登录成功')
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            console.log(err)
          })
          // this.$router.push({
          //   name: 'home'
          // })
        }
      })
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
  .login {
    position: relative;
    height: 100%;
    background-image: url("../../assets/image/login-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    .login-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 0 auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      border: 1px solid #eaeaea;
      background: #fff;
      box-shadow: 0 0 25px #cac6c6;

      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }

      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }

</style>
