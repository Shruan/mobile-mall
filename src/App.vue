<template>
  <div id="app" v-cloak>
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    // this.$router.push({path: '/login'})
  },
  methods: {

  }
}
</script>

<style>
  @import './assets/reset.css';
  [v-cloak]{
    display: 'none';
  }
  #app {
    font-family: 'Microsoft YaHei', '微软雅黑', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }
  body,html {
    width: 100%;
    height: 100%;
  }

  /* 全局样式 */
  .shy__full-card {
    min-height: 100%;
  }
  .block {
    margin: 20px 0;
  }
</style>
