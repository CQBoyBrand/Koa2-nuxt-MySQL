<template>
  <div class="login_container">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="account">
          <el-input v-model="ruleForm.account" placeholder="account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('login',this.ruleForm).then( res => {
              if(res.data.code == 200){
                this.$message.success(res.data.message)
                sessionStorage.setItem('loginInfo',JSON.stringify(res.data.token))
                setTimeout(() => {
                  this.$router.push('/')
                },800)
              }else {
                this.$message.error(res.data.message)
              }
            }).catch( err => {
              console.log('err=',err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .login_container {
    position: relative;
    width: 100%;
    height: 100%;
    .ms-title {
      position: absolute;
      top: 50%;
      width: 100%;
      margin-top: -230px;
      text-align: center;
      font-size: 30px;
      color: #fff;

    }
    .ms-login {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 300px;
      height: 160px;
      margin: -150px 0 0 -190px;
      padding: 40px;
      border-radius: 5px;
      background: #fff;
    }
    .login-btn {
      text-align: center;
    }
    .login-btn button {
      width: 100%;
      height: 36px;
    }
  }
</style>
