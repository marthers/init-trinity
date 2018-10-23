<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class = "login-left">
        <div class = "login-logo-name">
            <div class = "login-logo" src="./../../assets/images/ShunXiangLogo.png" alt="舜翔众邦"></div>
            <div class = "login-name">
                舜翔科技有限公司
            </div>
        </div>
        <p class = "login-slogen">
            自助设备运营管理平台
        </p>
    </div>
    <div class = "login-footer">
      <p>
        <span>© 2009-2018</span> <a href="shunxiang.com" class = "trinity-url">shunxiang.com</a> <span>版权所有</span><span>ICP证: </span><span>京: B2-20080101</span>
      </p>
    </div>
    <div class="login-con" v-if = "!registerShow">
        <div class = "tabs-con">
            <div :class = "[!selectPassword ? '' : 'login-select' , 'password-login']" @click = "passwordSelected">密码登录</div>
            <div class = "tabs-line"></div>
            <div :class = "[!selectPassword ? 'login-select' : '' , 'verify-login']"  @click = "verifySelected">验证码登录</div>
        </div>
        <Input v-model.trim="userName" :placeholder="userNamePlaceholder" number autofocus :maxlength="11" class = "login-input"/>
        <!-- <Input v-model.trim="password" placeholder="请输入密码" autofocus  class = "login-input" v-if = "selectPassword" :maxlength = "16"/> -->
        <!-- <Input v-model="verifyCode" placeholder="请输入验证码" autofocus  class = "verify-input" v-else  search :enter-button="getVerifyCode" on-search="getVerify"/> -->
        <!-- <vue-password v-model="password" v-if = "selectPassword" classes = "login-input" disableStrength/>
            <template slot="password-toggle" scope="props">
                <button class="VuePassword__Toggle" type   = "button" v-on:click  = "props.toggle" v-text = "props.type === 'password' ? 'SHOW' : 'HIDE'" > </button>
            </template>
        </vue-password> -->
        <vue-password v-model="password" v-if = "selectPassword" classes = "login-input" disableStrength >
            <div
                slot       = "password-input"
                slot-scope = "props"
                class      = "control has-icons-left"
            >
                <input class = "login-input" type = "password" placeholder = "请输入密码" :value = "props.value" oninput = "if(value.length > 11)value = value.slice(0, 11)"  ref = "loginPassword" oncopy = "return false" oncut = "return false" onpaste = "return false">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </vue-password>
        <div v-else class = "login-get-verify">
            <!-- <Input v-model="loginVerify" placeholder="请输入验证码" number autofocus :maxlength="11" class = "login-verify"/> -->
            <input type="text" :value="loginVerify" @input="num = $event.target.value.replace(/[^\d]/g,'');$event.target.value = num" class = "login-verify" placeholder="请输入验证码"  maxlength = "6"/>
            <div :class = "[ countDown ? 'count-down-button' : '','get-login-verify-button']" @click="getVerify">
              {{
                getVerifyCode
              }}
            </div>
        </div>
        <div v-if = "graphValidateCodeShow" class = "login-get-verify">
            <Input v-model="graphCode" placeholder="请输入右侧的图形验证码"  autofocus :maxlength="4" class = "login-verify"/>
            <img :src = "graphCodeSrc" class = "graph-code get-login-verify-button"/>
        </div>
        <div class = "two-button">
            <div class = "remember-login" v-if = "selectPassword">
              <div  :class = "[notRemember ? 'not-remember-login' : 'remembered-login']" @click="notRemember = !notRemember"></div>
              <!-- <div v-show= "notRemember" class = "not-remember-login" @click="notRemember = !notRemember"></div> -->
              <!-- <div v-show = "!notRemember" class = "remember-login" @click="notRemember = !notRemember"></div> -->
              <p class = "remember-password" @click="notRemember = !notRemember">
                记住密码
              </p>
            </div>
            <div class = "forgotten-password" @click = "resetPassword">
              忘记密码
            </div>
        </div>
        <div class = "login-button main-button" @click = "login">登录</div>
        <div class = "register-button  main-button" @click = "registerClicked">注册</div>
    </div>

    <!-- 注册&找回密码&设备验证 -->
    <div v-else class = "register-con">
        <div class = "register">
          {{
            registerOrReset
          }}
        </div>
        <Input v-model.trim="registerUsername" :placeholder="userNamePlaceholder" number autofocus :maxlength="11" class = "login-input"/>
        <!-- <Input v-model="registerVerifyCode" placeholder="请输入验证码" autofocus  number class = "verify-input" search enter-button="获取验证码"/> -->
        <div class = "login-get-verify">
            <Input v-model.trim="registerVerifyCode" placeholder="请输入验证码" number autofocus :maxlength="6" class = "login-verify"/>
            <div :class = "[ countDown ? 'count-down-button' : '','get-login-verify-button']" @click="getVerify">
              {{
                getVerifyCode
              }}
            </div>
        </div>
        <!-- <vue-password v-model="registerPassword" disableStrength classes = "password-input">
            <div
                slot       = "password-input"
                slot-scope = "props"
                class      = "control has-icons-left"
            >
                <input
                                                                                                                                                                                                                                                                      class       = "login-input"
                                                                                                                                                                                                                                                                      type        = "password"
                                                                                                                                                                                                                                                                      placeholder = "Text input"
                                                                                                                                                                                                                                                                    :value        = "props.value"
                                                                                                                                                                                                                                                                      @input      = "props.updatePassword($event.target.value)"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </vue-password> -->
        <Input v-model.trim="registerPassword" placeholder="请设置密码(8-16位字母数字组合)" autofocus  class = "login-input" v-if = "!changeDevice" @on-change = "passwordChange" @on-focus = "focusPassword" :maxlength="16"/>
        <Input v-model.trim="confirmRegisterPassword" placeholder="请再次输入密码" autofocus  class = "login-input" v-if = "!changeDevice" :maxlength="16"/>
        <div class = "login-button main-button" @click="registerOrResetPassword">
          {{
            registerOrSubmit
          }}
        </div>
        <div class = "register-button  main-button" @click = "backToLogin">返回</div>
    </div>
  </div>
</template>

<script>
import baseConfig from './../../config/index'
// import LoginForm from '_c/login-form'
import md5 from 'js-md5'
import VuePassword from 'vue-password'
import {
  validateMobilephone, // 校验手机号
  validatePassword, // 校验密码是否8至16位数字字母
  validateVerificationCode, // 校验验证码
  validateGraphCode//
} from './../../libs/validate'
import { mapActions } from 'vuex'; import axios from '@/libs/api.request'
const TIME_COUNT = 60;
import {_debounce,_throttle} from './../../libs/debounce';
import {uuid} from './../../libs/uuid';
export default {
  components: {
    // LoginForm,
    VuePassword
  },
  data () {
    return {
      score                  : 10,
      selectPassword         : true,
      userName               : '',
      password               : '',
      verifyCode             : '',
      userNamePlaceholder    : '请输入用户名',
      notRemember            : true,
      registerShow           : false,
      registerUsername       : '',
      registerVerifyCode     : '',
      registerPassword       : '',
      confirmRegisterPassword: '',
      getVerifyCode          : '获取验证码',
      timer                  : null,
      count                  : '',
      countDown              : false,
      registerOrReset        : '',
      registerOrSubmit       : '确定',
      changeDevice           : false,
      alertType              : 'error',
      alertMsg               : '系统异常，请及时联系管理员',
      graphValidateCodeShow  : false,
      graphCode              : '',
      graphCodeSrc           : 'http://img2.imgtn.bdimg.com/it/u=1190478869,2154054603&fm=26&gp=0.jpg',
      user_info              : {}
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    updatePassword (inputVal) {
      console.log(`inputVal=${inputVal}`)
    },
    backToLogin () {
      this.getVerifyCode = '获取验证码'
      this.countDown     = false
      if (this.timer) {
        console.log(`this.timer=${this.timer}`)
        clearInterval(this.timer)
        this.timer = null
      } else {
        console.log(`!this.timer=${this.timer}`)
      };
      this.registerShow = false
    },
    // 注册
    registerClicked () {
      this.getVerifyCode = '获取验证码'
      this.countDown     = false
      if (this.timer) {
        console.log(`this.timer=${this.timer}`)
        clearInterval(this.timer)
        this.timer = null
      } else {
        console.log(`!this.timer=${this.timer}`)
      }
      this.registerShow     = true
      this.registerOrReset  = '用户注册'
      this.registerOrSubmit = '注册'
      // 及时清空
      this.password    = ''
      this.loginVerify = ''
    },
    ifNotUuid() {
      if(localStorage.getItem('uuid') == null) {
        localStorage.setItem('uuid',uuid(8,16));
      }
    },
    // login
    login : _debounce(function() {
      console.log('validateMobilephone(this.userName):')
      console.log(validateMobilephone(this.userName))
      console.log("validatePassword('this.password'):")
      console.log(validatePassword(this.password))
      console.log('validateVerificationCode(this.loginVerify):')
      console.log(validateVerificationCode(this.loginVerify))
      console.log(this.registerShow)
      // 账号密码登录
      if (this.selectPassword) {
        console.log('账号密码登录')
        //账号密码登录合法
        if (validateMobilephone(this.userName)) {
          console.log(`this.password=${this.password}`);
          // if (validatePassword(this.password)) {
          if (validatePassword(this.$refs.loginPassword.value)) {
            console.log('baseConfig:')
            console.log(baseConfig);
            this.ifNotUuid();
            axios.request({
              url    : baseConfig.baseUrl.dev + 'user/sign_in_web_mobile_password',
              method : 'post',
              headers: {
                'Content-Type'    : 'application/json; charset=utf-8',
                'Trinity-Token'   : '',
                'Request-Datatime': new Date().getTime()
              },
              data: {
                'priority': '3',
                'group'   : '',
                'data'    : {
                  'phone'      : this.userName,
                  'password'   : md5(this.password),
                  'verify_code': '',
                  'captcha'    : '',
                  'device_id'  : localStorage.getItem('uuid') != null ? localStorage.getItem('uuid'): uuid(8,16),
                  'device_name': window.navigator.userAgent
                }
              }
            })
            .then(res => {
              console.log("res:");
              console.log(res)
              //请求成功
              if(res.status && res.status == 200) {
                // 登录成功
                if(res.data.code == 0 || res.data.success) {
                  //登录成功的数据包
                  if(res.data.data) {
                    let resData = res.data.data;
                    localStorage.setItem('token',resData.token)
                    localStorage.setItem('password',resData.password);
                    this.user_info = resData.user_info;
                    console.log("this.user_info:");
                    console.log(this.user_info);
                    this.$Message.success({
                        content : '登录成功',
                        duration: 5,
                        closable: true
                    });
                    this.$router.push({
                      name: 'home'
                    });
                  }else {
                    this.$Message.error({
                        content : '登录失败',
                        duration: 5,
                        closable: true
                    });
                  }
                }
                //登录失败
                else{
                  if(res.data.code) {
                    if(res.data.code == 105) {
                      this.$Message.info({
                          content : res.data.msg ? res.data.msg: '更换设备需要验证',
                          duration: 5,
                          closable: true
                      });
                      this.changeDevice     = true;
                      this.registerOrReset  = '设备验证';
                      this.registerOrSubmit = '验证'
                      this.registerShow     = true;
                    }
                  }else {
                    this.$Message.error({
                        content : res.data.msg ? res.data.msg: '登录失败',
                        duration: 5,
                        closable: true
                    });
                  }
                }
                console.log("res.data:");
                console.log(res.data);
                console.log("res.data.data:")
                console.log(res.data.data)
              }
              //请求失败
              else{
                this.$Message.error({
                    content : res.status,
                    duration: 5,
                    closable: true
                });
              }
              console.log(res);
              console.log("this.$config:");
              console.log(this.$config);
              console.log("this.$route:");
              console.log(this.$route);
              console.log("this.$router:")
              console.log(this.$router)
            })
            .catch(err => {
              console.log("err:");
              console.log(err);
              this.$Message.error({
                  content : '网络异常，请联系管理员处理',
                  duration: 5,
                  closable: true
              });
            })
          } 
          else {
            console.log('password is invalidate');
            console.log(this.$refs.loginPassword.value)
            this.$Message.error({
              content : '密码不正确，须输入8-16位数字字母',
              duration: 5,
              closable: true
            })
          }
        } 
        //账号密码登录不合法
        else {
          console.log('username is invalidate')
          this.$Message.error({
            content : '用户名有误!',
            duration: 3,
            closable: true
          })
        }
      }
      // 手机验证码登录
      else {
        console.log('手机验证码登录')
        //手机验证码登录,手机号合法
        if (validateMobilephone(this.userName)) {
          if (validateVerificationCode(this.loginVerify)) {
            this.ifNotUuid();
            // 注册或者重置密码
            axios.request({
              url    : baseConfig.baseUrl.dev + 'user/sign_in_web_mobile_verify_code',
              method : 'post',
              headers: {
                'Content-Type'    : 'application/json; charset=utf-8',
                'Trinity-Token'   : '',
                'Request-Datatime': new Date().getTime()
              },
              data: {
                'priority': '3',
                'group'   : '',
                'data'    : {
                  'phone'      : this.userName,
                  'password'   : '',
                  'verify_code': this.loginVerify,
                  'captcha'    : '',
                  'device_id'  : localStorage.getItem('uuid') != null ? localStorage.getItem('uuid'): uuid(8,16),
                  'device_name': window.navigator.userAgent
                }
              }
            })
            .then(res => {
              console.log("res:");
              console.log(res);
              //请求成功
              if(res.status && res.status == 200) {
                // 登录成功
                if(res.data.code == 0) {
                  //登录成功的数据包
                  if(res.data.data) {
                    let resData = res.data.data;
                    localStorage.setItem('token',resData.token)
                    localStorage.setItem('password',resData.password);
                    this.user_info = resData.user_info;
                    console.log("this.user_info:");
                    console.log(this.user_info);
                    this.$Message.success({
                        content : '登录成功',
                        duration: 5,
                        closable: true
                    });
                    this.$router.push({
                      name: 'home'
                    });
                  }else {
                    this.$Message.error({
                        content : '登录失败',
                        duration: 5,
                        closable: true
                    });
                  }
                }
                //登录失败
                else{
                  this.$Message.error({
                      content : res.data.msg ? res.data.msg: '登录失败',
                      duration: 5,
                      closable: true
                  });
                }
                console.log("res.data:");
                console.log(res.data);
                console.log("res.data.data:")
                console.log(res.data.data)
              }
              //请求失败
              else{
                this.$Message.error({
                    content : res.status,
                    duration: 5,
                    closable: true
                });
              }
              console.log(res);
              console.log("this.$config:");
              console.log(this.$config);
              console.log("this.$route:");
              console.log(this.$route);
              console.log("this.$router:")
              console.log(this.$router)
            })
            .catch(err => {
              console.log("err:");
              console.log(err);
              this.$Message.error({
                  content : '网络异常，请联系管理员处理',
                  duration: 5,
                  closable: true
              });
            })
          } else {
            console.log('loginVerify is invalidate')
            this.$Message.error({
              content : '验证码格式有误！',
              duration: 3,
              closable: true
            })
          }
        } 
        //手机验证码登录,手机号不合法
        else {
          console.log('username is invalidate')
          this.$Message.error({
            content : '用户名有误!',
            duration: 3,
            closable: true
          })
        }
      }
    },200),
    passwordChange () {
      console.log('passwordChange')
    },
    focusPassword () {
      console.log('focusPassword')
    },
    // 忘记密码
    resetPassword () {
      this.registerShow     = true
      this.registerOrReset  = '找回密码'
      this.registerOrSubmit = '确定'
      // 及时清空
      this.password    = ''
      this.loginVerify = ''
      // 及时携带用户已经输入的手机号
      this.registerUsername = this.userName;
      //及时更新获取验证码定时器的状态
      if(this.timer) {
        clearInterval(this.timer);
        this.timer         = null;
        this.countDown     = false;
        this.getVerifyCode = '获取验证码'
      }
    },
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    passwordSelected () {
      this.selectPassword      = true
      this.userNamePlaceholder = '请输入用户名'
      // 及时清空
      this.password    = ''
      this.loginVerify = ''
    },
    verifySelected () {
      this.selectPassword      = false
      this.userNamePlaceholder = '请输入手机号'
      // 及时清空
      this.password    = ''
      this.loginVerify = ''
    },
    registerOrResetPassword () {
      if (this.registerOrReset == '找回密码') {
        console.log('找回密码')
      } else {
        console.log('用户注册');
        //如果注册时手机号合法、验证码合法、两次密码合法且相等
        if(validateMobilephone(this.registerUsername) && validateVerificationCode(this.registerVerifyCode) && validatePassword(this.registerPassword) && validatePassword(this.confirmRegisterPassword) && this.registerPassword === this.confirmRegisterPassword ){
            this.ifNotUuid();
            axios.request({
              url    : baseConfig.baseUrl.dev + 'user/sign_up_web',
              method : 'post',
              headers: {
                'Content-Type'    : 'application/json; charset=utf-8',
                'Trinity-Token'   : '',
                'Request-Datatime': new Date().getTime()
              },
              data: {
                'priority': '3',
                'group'   : '',
                'data'    : {
                  'phone'      : this.registerUsername,
                  'password'   : md5(this.confirmRegisterPassword),
                  'verify_code': this.registerVerifyCode,
                  'captcha'    : '',
                  'device_id'  : localStorage.getItem('uuid') != null ? localStorage.getItem('uuid'): uuid(8,16),
                  'device_name': window.navigator.userAgent
                }
              }
            })
            .then(res => {
                console.log("res:");
                console.log(res);
                //请求成功
                if(res.status && res.status == 200) {
                  // 登录成功
                  if(res.data.code == 0) {
                    //登录成功的数据包
                    if(res.data.data) {
                      let resData = res.data.data;
                      localStorage.setItem('token',resData.token)
                      localStorage.setItem('password',resData.password);
                      this.user_info = resData.user_info;
                      console.log("this.user_info:");
                      console.log(this.user_info);
                      this.$Message.success({
                          content : '登录成功',
                          duration: 5,
                          closable: true
                      });
                      this.$router.push({
                        name: 'home'
                      });
                    }else {
                      this.$Message.error({
                          content : '登录失败',
                          duration: 5,
                          closable: true
                      });
                    }
                  }
                  //登录失败
                  else{
                    this.$Message.error({
                        content : res.data.msg ? res.data.msg: '登录失败',
                        duration: 5,
                        closable: true
                    });
                  }
                }
                //请求失败
                else{
                  this.$Message.error({
                      content : res.status,
                      duration: 5,
                      closable: true
                  });
                }
                console.log(res);
                console.log("this.$config:");
                console.log(this.$config);
                console.log("this.$route:");
                console.log(this.$route);
                console.log("this.$router:")
                console.log(this.$router)
                console.log("res.data:");
                console.log(res.data);
                console.log("res.data.data:")
                console.log(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
        else {
          if(!validateMobilephone(this.registerUsername)) {
            this.$Message.warning({
              content : '手机号格式有误',
              duration: 5,
              closable: true
            })
          }else if(!validateVerificationCode(this.registerVerifyCode)){
            this.$Message.warning({
              content : '验证码格式有误',
              duration: 5,
              closable: true
            })
          }else {
            if(!validatePassword(this.registerPassword) || !validatePassword(this.confirmRegisterPassword)) {
              this.$Message.warning({
                content : '密码格式有误',
                duration: 5,
                closable: true
              })
            }else{
              if(this.registerPassword === this.confirmRegisterPassword) {
                this.$Message.warning({
                  content : '两次输入的密码不相同',
                  duration: 5,
                  closable: true
                })
              }else {
                console.log('debugger')
              }
            }
          }
        }
      }
    },
    getVerify : _throttle(function() {
      //当前并非登录获取验验证码，如果输入的手机号不合法
      if(! validateMobilephone(this.userName) && !validateMobilephone(this.registerUsername)) {
        this.$Message.error({
          content : '手机号格式有误!',
          duration: 3,
          closable: true
        })
      }else {
        // 当前登录获取验验证码
        if(this.registerShow) {
          if(!validateMobilephone(this.registerUsername)) {
            this.$Message.error({
              content : '手机号格式有误!',
              duration: 3,
              closable: true
            });
            if(!this.timer) {
              clearInterval(this.timer)
              this.timer         = null
              this.getVerifyCode = '获取验证码'
              this.countDown     = false
            }
          }else{
                if (!this.timer) {
                  this.count = TIME_COUNT
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--
                      this.getVerifyCode = '重新发送' + this.count + 'S'
                      this.countDown     = true
                    } else {
                      clearInterval(this.timer)
                      this.timer         = null
                      this.getVerifyCode = '获取验证码'
                      this.countDown     = false
                    }
                  }, 1000);
                  this.ifNotUuid();
                  axios.request({
                    url    : baseConfig.baseUrl.dev + 'verify_code/send',
                    method : 'post',
                    headers: {
                      'Content-Type'    : 'application/json; charset=utf-8',
                      'Trinity-Token'   : '',
                      'Request-Datatime': new Date().getTime()
                    },
                    data: {
                      'priority': '3',
                      'group'   : '',
                      'data'    : {
                        'phone': !this.registerShow ? this.userName: this.registerUsername
                      }
                    }
                  })
                  .then(res => {
                    console.log(res);
                    //请求成功
                    if(res.status && res.status == 200) {
                      //获取验证码
                      if(res.data.success && res.data.msg == 'success') {
                        //获取验证码的数据包
                        this.$Message.success({
                          content : '验证码已发送',
                          duration: 5,
                          closable: true
                        })
                      }
                      //获取验证码失败
                      else{
                        this.$Message.error({
                            content : res.data.msg ? res.data.msg: '获取验证码失败',
                            duration: 5,
                            closable: true
                        });
                      }
                      console.log("res.data:");
                      console.log(res.data);
                      console.log("res.data.data:")
                      console.log(res.data.data)
                    }
                    //请求失败
                    else{
                      this.$Message.error({
                          content : res.status,
                          duration: 5,
                          closable: true
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
                } else {
                  console.log(this.timer)
                }
          }
        }
        //当前登录获取验验证码
        else{
          //当前登录获取验验证码，如果输入的手机号不合法
          if(!validateMobilephone(this.userName)) {
            this.$Message.error({
              content : '手机号格式有误!',
              duration: 3,
              closable: true
            });
            if(!this.timer) {
              clearInterval(this.timer)
              this.timer         = null
              this.getVerifyCode = '获取验证码'
              this.countDown     = false
            }
          }
          // /当前并非登录获取验验证码，如果输入的手机号合法
          else{
                if (!this.timer) {
                  this.count = TIME_COUNT
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--
                      this.getVerifyCode = '重新发送' + this.count + 'S'
                      this.countDown     = true
                    } else {
                      clearInterval(this.timer)
                      this.timer         = null
                      this.getVerifyCode = '获取验证码'
                      this.countDown     = false
                    }
                  }, 1000);
                  this.ifNotUuid();
                  axios.request({
                    url    : baseConfig.baseUrl.dev + 'verify_code/send',
                    method : 'post',
                    headers: {
                      'Content-Type'    : 'application/json; charset=utf-8',
                      'Trinity-Token'   : '',
                      'Request-Datatime': new Date().getTime()
                    },
                    data: {
                      'priority': '3',
                      'group'   : '',
                      'data'    : {
                        'phone': !this.registerShow ? this.userName: this.registerUsername
                      }
                    }
                  })
                  .then(res => {
                    console.log(res);
                    //请求成功
                    if(res.status && res.status == 200) {
                      //获取验证码
                      if(res.data.success && res.data.msg == 'success') {
                        //获取验证码的数据包
                        this.$Message.success({
                          content : '获取验证码成功',
                          duration: 5,
                          closable: true
                        })
                      }
                      //获取验证码失败
                      else{
                        this.$Message.error({
                            content : res.data.msg ? res.data.msg: '获取验证码失败',
                            duration: 5,
                            closable: true
                        });
                      }
                      console.log("res.data:");
                      console.log(res.data);
                      console.log("res.data.data:")
                      console.log(res.data.data)
                    }
                    //请求失败
                    else{
                      this.$Message.error({
                          content : res.status,
                          duration: 5,
                          closable: true
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
                } else {
                  console.log(this.timer)
                }
          }
        }
      }
    },200)
  }
}
</script>

<style>

</style>
