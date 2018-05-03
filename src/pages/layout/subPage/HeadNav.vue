<template>
  <header class="shy__layout-right-header">
    <div class="shy__header-btn " @click="changeNav">
      <i class="el-icon-menu"></i>
    </div>
    <TpBreadcrumb />
    <div class="right-menu">
      <el-dropdown trigger="click" @command='logout'>
        <div class="el-dropdown-link">
          <img src="@/assets/logo.png">
          <div class="user-box">
            <div style="position: relative; top: 8px">
              <p>{{user.account || '管理员'}}</p>
              <p style="font-size:12px">{{user.name || 'Shruan'}}</p>
            </div>
          </div>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TpBreadcrumb from './TpBreadcrumb'
export default {
  components: {
    TpBreadcrumb
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('globalModule', [
      'user',
      'isCollapse'
    ])
  },
  created () {
  },
  methods: {
    ...mapMutations('globalModule', [
      '_isCollapse',
      '_user'
    ]),
    changeNav () {
      this._isCollapse(!this.isCollapse)
    },
    logout () {
      this.user = {}
      this._user(this.user)
      window.localStorage.token = ''
      window.localStorage.user_id = ''
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="css">
  .shy__layout-right-header {
    position: relative;
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    text-align: left;
    padding: 0 20px;
    z-index: 888;
  }
  .shy__header-btn {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    line-height: 50px;
  }

  .right-menu {
    float: right;
    height: 100%
  }
  .user-box {
    box-sizing: border-box;
    display: inline-block;
    height: 50px;
    text-align: left;
    line-height: 16px;
    margin-left: 5px;
  }
  .el-dropdown-link {
    line-height: 50px;
    height: 50px;
    cursor: pointer;
  }
  .el-dropdown-link img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    vertical-align: middle;
  }
</style>
