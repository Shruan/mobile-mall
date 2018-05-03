<template>
  <div class="search-bar">
    <van-row gutter="5">
      <van-col span="3">
        <img :src="locationIcon" width="80%" class="location-icon" />
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input" />
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      locationIcon: require('../../assets/images/logo.png')
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height:2.2rem;
  }
  .search-input{
    width:100%;
    height: 1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom: 1px solid 1px !important ;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
</style>
