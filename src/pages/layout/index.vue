<template>
  <div class="shy__box">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  name: 'Layout',
  data () {
    return {
      user: {},
      pageStyle: '',
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState('globalModule', [
      'isCollapse'
    ])
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },

  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /* 布局 */
  .shy__box {
    background: #f9f9f9;
    height: 100%;
  }
  .shy__layout-right {
    box-sizing: border-box;
    transition: padding-left .28s;
    padding-left: 180px;
    height: 100%;
    width: 100%;
  }
  .shy__layout-content {
    box-sizing: border-box;
    position: relative;
    overflow-x: hidden;
    padding: 15px;
    height: calc(100% - 95px);
    width: 100%;
  }
  .shy__layout-nav {
    position: fixed;
    overflow: hidden;
    z-index: 999;
    width: 180px;
    overflow: hidden;
    /* -webkit-transition: all cubic-bezier(0.39, 0.58, 0.57, 1) 520ms; */
  }
  .shy__logo {
    background: #334257;
    width: 179px;
    height: 100px;
    text-align: center;
    border-right: 1px solid #fff;
    -webkit-transition: all .3s ease-in-out;
  }
  .logo-title {
    font-size: 30px;
    font-weight: blod;
    color: #fff;
    padding-top: 40px;
  }
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /* 页面切换 动态效果 */
  .router {
    position: absolute;
    display: block;
    height: calc(100% - 30px);
    width: calc(100% - 30px);
  }
  /* 左滑 */
  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .5s;
  }
  .slide-left-enter, .slide-left-leave-active {
    opacity: 0;
  }
  .slide-left-enter {
    transform: translateX(50px);
  }
  .slide-left-leave-active {
    transform: translateX(-50px);
  }
  /* 右滑 */
  .slide-right-enter-active, .slide-right-leave-active {
    transition: all 1s;
  }
  .slide-right-enter, .slide-right-leave-active {
    opacity: 0;
  }
  .slide-right-enter {
    transform: translateX(31px);
  }
  .slide-right-leave-active {
    transform: translateX(-31px);
  }
  /* 页面切换 动态效果 */

  /* 覆盖element ui样式 */
  .searchform-box .el-form-item .el-form-item__label {
    font-size: 12px;
  }
  .el-form-item .el-date-editor--daterange.el-input {
    width: 100%;
  }
  .el-table__body .el-table__expanded-cell {
    background: #fbfbfb;
  }
</style>
