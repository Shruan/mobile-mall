<template>
  <div class="nav">
    <el-menu
      text-color="#fff"
      background-color="#334257"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      :router="true"
      :default-active="nowRoute"
      :collapse="isCollapse"
      :style="pageStyle"
      @open="handleOpen"
      @close="handleClose">

      <template v-for="(item, index) in menuList">
        <el-menu-item
          :key="index"
          v-if="!item.children
          && (isVip || ['MiniProgram'].indexOf(item.key) === -1)
          && (!isVip || ['HomePage'].indexOf(item.key) === -1)"
          :index="item.url"
        >
          <i :class="item.icon" />
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu
          :key="index"
          v-else-if="item.children
          && (isVip || ['MiniProgram'].indexOf(item.key) === -1)
          && (!isVip || ['HomePage'].indexOf(item.key) === -1)"
          :index="index + ''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.url"
            :index="child.url"
          >
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'srn-menu',
  props: {
    pageStyle: String
  },
  data () {
    return {
      nowRoute: '',
      isVip: false
    }
  },
  computed: {
    ...mapState('globalModule', [
      'menuList',
      'user',
      'isCollapse'
    ])
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    updateRouter () {
      // console.log(this.$route)
      this.nowRoute = this.$route.path
    }
  },
  watchs: {
    '$route': 'updateRouter'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 179px!important;
    overflow: hidden;
  }
</style>
