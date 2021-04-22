<template>
  <div class="register-container">
    <div class="register_bg" />
    <div class="register_form">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h1>注册</h1>
        </div>
        <div class="register_form_content">
          <div>
            <el-form-item prop="username">
              <span style="color:red;">* </span>
              <el-input ref="username" v-model="registerForm.username" style="width:98%" size="large" placeholder="输入手机号码">
                <template slot="prepend"><i style="fontSize:20px" class="el-icon-user" /></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <span style="color:red;">* </span>
              <el-input
                v-model="registerForm.code"
                size="large"
                style="width:72%"
                placeholder="短信验证码"
              >
                <template slot="prepend"><i style="fontSize:20px" class="el-icon-folder-checked" /></template>
              </el-input>
              <button v-if="showCode" class="button_regCode" style="width:25%;" @click.prevent="getCode">获取验证码</button>
              <button v-if="!showCode" disabled class="button_regCode" style="width:25%;">{{ count }}s</button>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" placement="right" manual>
              <el-form-item prop="password">
                <span style="color:red;">* </span>
                <el-input
                  ref="password"
                  :key="passwordType"
                  v-model="registerForm.password"
                  size="large"
                  style="width:72%"
                  placeholder="输入密码"
                  maxlength="16"
                  minlength="6"
                  :type="passwordType"
                  show-password
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                >
                  <template slot="prepend">设置密码</template>
                </el-input>
                <span v-if="pwdLv == 1" class="codeIntensity_1">弱</span>
                <span v-if="pwdLv == 2" class="codeIntensity_2">中</span>
                <span v-if="pwdLv == 3" class="codeIntensity_3">强</span>
              </el-form-item>
            </el-tooltip>
            <el-form-item prop="confirmPassword">
              <span style="color:red;">* </span>
              <el-input
                :key="passwordType"
                v-model="registerForm.confirmPassword"
                size="large"
                style="width:72%"
                placeholder="确认密码"
                :type="passwordType"
                show-password
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
              >
                <template slot="prepend">确认密码</template>
              </el-input>
            </el-form-item>

            <!-- <p><el-checkbox v-model="checked"></el-checkbox>
              <span>我已阅读并同意《用户协议》《隐私政策》</span>
          </p> -->
            <button class="button_regCode_register" style="width:100%;margin-bottom:30px;" @click.prevent="save">立即注册</button>
            <!-- <button @click.prevent="nextStep" class="button_regCode" style="width:100%;margin-bottom:30px;">下一步</button> -->
            <span class="hasIdToLogin"><router-link to="/login">已有账号，现在登陆</router-link></span>
          </div>

        <!-- <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册</el-button> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { sendAuthCode, register } from '@/api/register';

export default {
  name: 'Register',
  inject: ['reload'],
  data() {
    // const validateUsername = (rule, value, callback) => {
    //     if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //     } else {
    //     callback()
    //     }
    // }
    // const validatePassword = (rule, value, callback) => {
    //     if (value.length < 6) {
    //     } else {
    //     callback()
    //     }
    // }
    return {
      registerForm: {
        username: '',
        password: '',
        code: '',
        confirmPassword: ''
      },
      registerRules: {
        // username: { required: true, trigger: 'blur', validator: validateUsername },
        username: { required: true, trigger: 'change', message: '手机号码不能为空' },
        password: { required: true, trigger: 'change', message: '密码不能为空' },
        confirmPassword: { required: true, trigger: 'change', message: '密码不能为空' }
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      checked: false,
      active: 1,
      showCode: true,
      count: '',
      timer: null,
      pwdLv: 0
    };
  },
  mounted() {
    if (this.registerForm.username === '') {
      this.$refs.username.focus();
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus();
      this.reload();
    }
  },
  methods: {
    checkCapslock() {
      this.pwdLv = 0;
      if (this.registerForm.password.match(/[a-z]/g)) { this.pwdLv++; }
      if (this.registerForm.password.match(/[0-9]/g)) { this.pwdLv++; }
      if (this.registerForm.password.match(/[A-Z]/g)) { this.pwdLv++; }
      if (this.registerForm.password.length < 6) { this.pwdLv = 0; }
      if (this.pwdLv > 3) { this.pwdLv = 3; }
    },
    registerDone() {
      if (!this.registerForm.username) {
        this.$message.error('请输入手机号');
        return;
      }

      if (!this.registerForm.code) {
        this.$message.error('请输入验证码');
        return;
      }

      if (!this.registerForm.password || !this.registerForm.confirmPassword) {
        this.$message.error('请确认密码');
        return;
      }

      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$message.error('密码输入不一致,请重新输入');
        return;
      }
      this.$nextTick(() => {
        const params = {
          loginName: this.registerForm.username,
          password: this.registerForm.password,
          authCode: this.registerForm.code
        };
        register(params).then(res => {
          if (res.code == 0) {
            this.$message.success('注册成功');
            this.$router.push({ path: '/index' });
          } else {
            this.$message.error(msg);
          }
        });
      });
    },
    getCode() {
      const TIME_COUNT = 60;
      if (this.registerForm.username) {
        sendAuthCode({ mobile: this.registerForm.username }).then(res => {
          if (res.code == 0) {
            this.count = TIME_COUNT;
            this.showCode = false;
            this.timer = setInterval(() => {
              if (this.count > 1 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.showCode = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
            this.$message({
              message: '短信发送成功，请注意查收！',
              type: 'success'
            });
          } else {
            this.$message.error(res.msg);
          }
        });
        //  this.$message({
        //       message: '短信发送成功，请注意查收！',
        //         type: 'success'
        //     });
      } else {
        this.$message.error('请输入手机号');
      }
    },
    save() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.registerDone();
        } else {
          return false;
        }
      });
    }
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
  }
};
</script>

<style lang="scss" scoped>
    body,html{
      width: 100%;
      height: 100%;
      position: relative;
    }

    .register-container{
      width: 100%;
      height: 100%;
      padding-top: 220px;
      position: relative;
      .register_bg{
        width: 100%;
        max-width: 1920px;
        overflow: hidden;
        height: 416px;
        background: url("../../assets/logo/register_bg.png") no-repeat;
        position:absolute;
        top: 0;
        left: 0;
        min-width: 1000px;
        z-index:1;
        // zoom: 1;
        // background-color: #fff;
        background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
        -o-background-size: 100% 100%;
        background-position: center 0;
      }
      .register_form{
        width: 100%;
        max-width: 600px;
        position: relative;
        // position: absolute;
        box-sizing: border-box;
        padding: 20px 20px 80px 20px;
        margin-left: auto;
        // margin-top: 100px;
        overflow: hidden;
        margin-right: auto;
        z-index:2;
        zoom: 1;
        // top: 100px;
        // bottom: 0;
        // left: 0;
        // right: 0;
        // margin: auto;
        // margin-left: auto;
        // margin-right: auto;
        // margin-top: 200px;
        // max-height:550px;
        box-shadow: none;

        // margin-top: 200px;
        background: url("../../assets/logo/register_form_bg.png") no-repeat;
        background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
        -o-background-size: 100% 100%;
        background-position: center 0;

        .title-container{
          width: 90%;
          // padding-left: 10px;
          text-align: center;
          padding-top: 10px;
          font-size: 15px;
          margin-left: auto;
          margin-right: auto;
          h1{
            margin: 0;
            font-weight: 500;
          }
        }
        .register_form_content{
          width: 90%;
          padding-top: 20px;
          overflow: hidden;
          margin-top: 10px;
          margin-left: auto;
          margin-right: auto;
          .button_regCode{
            height: 40px;
            float:right;
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(245, 245, 245, 1) 20%, rgba(240, 240, 240, 1) 90%, rgba(210, 210, 210, 1) 100%, rgba(255, 255, 255, 1) 100%);
            box-sizing: border-box;
            border-width: 1px;
            border-style: solid;
            border-color: rgba(121, 121, 121, 1);
            border-radius: 4px;
            box-shadow: none;
            font-size: 16px;
            &:hover{
              cursor: pointer;
            }
          }
          .button_regCode_register{
            width: 104%;
            height: 100px;
            text-align: center;
            padding-bottom: 10px;
            line-height: 90px;
            margin-top: 10px;
            color:#fff;
            font-size: 20px;
            border:none;
            background: url("../../assets/logo/register_button.png") repeat 100% 100%;
            &:hover{
              cursor: pointer;
            }
          }
          .codeIntensity_1{
            display: inline-block;
            width: 8%;
            color: #fff;
            text-align: center;
            vertical-align: top;
            margin-top: 5px;
            border-radius: 5px;
            height: 30px;
            line-height: 30px;
            background-color: #f00;
          }
          .codeIntensity_2{
            margin-left: 8%;
            display: inline-block;
            width: 8%;
            color: #fff;
            text-align: center;
            vertical-align: top;
            margin-top: 5px;
            border-radius: 5px;
            height: 30px;
            line-height: 30px;
            background-color: #FF6A00;
          }
          .codeIntensity_3{
            margin-left: 16%;
            display: inline-block;
            width: 8%;
            color: #fff;
            text-align: center;
            vertical-align: top;
            margin-top: 5px;
            border-radius: 5px;
            height: 30px;
            line-height: 30px;
            background-color: #0f0;
          }
          // .codeIntensity:nth-child(2){
          //   display: inline-block;
          //   width: 8%;
          //   color: #fff;
          //   text-align: center;
          //   height: 40px;
          //   line-height: 40px;
          //   background-color: #ff0;
          // }
          // .codeIntensity:nth-child(3){
          //   display: inline-block;
          //   width: 8%;
          //   color: #fff;
          //   text-align: center;
          //   height: 40px;
          //   line-height: 40px;
          //   background-color: #0f0;
          // }
          .hasIdToLogin{
            color: #999999;
            font-size: 16px;
            &:hover{
              cursor: pointer;
              text-decoration: underline;
            }
          }
          p{
            margin: 30px 0;
            span{
              margin-left: 10px;
            }
          }
        }
      }
    }
</style>
