<template>
  <div class="login">
    <div class="login-box">
      <p class="logo">
        <img src="../assets/logo.png"/>
      </p>
      <p class="login-input">
        <input v-model="user.username" type="text" placeholder="账号" name="username">
      </p>
      <p class="login-input">
        <input v-model="user.password" type="password" placeholder="密码" name="password">
      </p>
      <p class="login-input">
        <button @click="login" :disabled="!loginBtnDisabled">LOGIN</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    loginBtnDisabled () {
      return this.user.username && this.user.password
    }
  },
  created () {
    if (window.localStorage.password) {
      this.user.username = window.localStorage.account
      this.user.password = window.localStorage.password
    }
  },
  methods: {
    ...mapMutations('globalModule', [
      '_user'
    ]),
    login () {
      // let url = this.apiUrl + '/admin/login'
      let data = {
        account: this.user.username,
        password: this.user.password
      }
      this._user(data)
      // this.$http.post(url, data).then(res => {
      //   res = res.data
      //   if (res.status == '1000') {
      //     window.localStorage.account = res.user.account
      //     window.localStorage.password = this.user.password
      //     res.user.token = res.token
      //     this.setUser(res.user)
      //     this.$router.push({path: '/home/index'})
      //     this.$message.success('欢迎登陆')
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // }).catch(() => {
      //   this.$message.error('网络错误，请稍后再试')
      // })
      this.$router.push({path: '/home/index'})
      this.$message.success('欢迎登陆')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #202d3e;
    position: relative;
  }
  .login .login-box {
    width: 300px;
    height: 240px;
    padding: 20px;
    border-radius: 6px;
    background: #334257;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .8);
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .logo {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
  }
  .logo img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    box-shadow: 0 0 10px rgba(255, 255, 255, .8);
  }
  .login-input {
    margin-bottom: 20px;
  }
  .login-input input {
    width: 100%;
    height: 40px;
    border: 2px solid #D3DCE6;
    /*background: transparent;*/
    color: #727e8c;
    outline: none;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 4px;
  }
  .login-input button {
    width: 100%;
    height: 40px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 4px;
    outline: none;
    background: #EEE;
    font-size: 18px;
    color: #1F2D3D;
    cursor: pointer;
    transition: all .2s;
  }
  .login-input button:hover {
    background: #FFF;
  }
  .login-input button[disabled] {
    background: #CCC;
    color: #999;
  }
  .login-input button[disabled]:hover {
    cursor: not-allowed;
    background: #CCC;
    color: #999;
  }
</style>
