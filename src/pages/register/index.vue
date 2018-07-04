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
          v-model="form.username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
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
            @click.native="register">
            马上注册
          </van-button>
      </div>
     </div>

  </div>
</template>

<script>
import url from '@/utils/serviceApi.config.js'

import { mapState } from 'vuex'
export default {
  components: {},
  name: 'Layout',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
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
    register () {
      this.$http.post(url.registerUser, this.form).then(res => {
        console.log(res)
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
