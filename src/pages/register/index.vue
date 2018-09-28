<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
      <div class="register-panel">

      <van-field
        required
        v-model="form.username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        @click-icon="form.username = ''"
      />

      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div class="register-button">
        <van-button
          type="primary"
          size="large"
          :loading="openLoading"
          @click.native="register">
          马上注册
        </van-button>
      </div>
    </div>

  </div>
</template>

<script>
import url from '@/utils/serviceApi.config.js'
import { Toast } from 'vant'

import { mapState } from 'vuex'
export default {
  components: {},
  name: 'Layout',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      openLoading: false // 是否开启用户的Loading
    }
  },
  computed: {
    ...mapState('globalModule', [
      'isCollapse'
    ])
  },
  created () {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 表单验证
    checkForm () {
      return new Promise((resolve, reject) => {
        if (this.form.username.length < 5) resolve({ success: false, message: '用户名不能小于5位' })
        if (this.form.password.length < 6) resolve({ success: false, message: '密码不能少于6位' })
        resolve({ success: true })
      })
    },
    // 注册操作
    register () {
      this.checkForm().then(res => {
        if (res.success) {
          this.openLoading = true
          this.$http.post(url.registerUser, this.form).then(res => {
            if (res.code == 200) {
              Toast.success('注册成功')
              this.$router.push({ name: 'Login' })
            } else {
              Toast.fail('注册失败')
              this.openLoading = false
            }
          }).catch(err => {
            console.log(err)
            Toast.fail('注册失败')
            this.openLoading = false
          })
        } else {
          Toast.fail(res.message)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /* 布局 */
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
 .register-button{
   padding-top:10px;
  }
</style>
