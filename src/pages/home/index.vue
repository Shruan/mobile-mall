<template>
  <div class="page-home">
    <!-- 顶部筛选 -->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3" style="height: 2.2rem">
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

    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 菜单 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index" >
        <img v-lazy="cate.image" width="80%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="recommend-area">
      <div class="recommend-title">
        楼层
      </div>
      <div class="recommend-body">
        <!--floor one area-->
        <div class="floor">
          <div class="floor-anomaly">
            <div class="floor-one"><img :src="floor1_0.image" width="100%" /></div>
            <div>
              <div class="floor-two"><img :src="floor1_1.image" width="100%" /></div>
              <div><img :src="floor1_2.image" width="100%" /></div>
            </div>
          </div>
        </div>

        <div class="floor-rule">
          <div v-for="(item ,index) in floor1.slice(3)" :key="index">
            <img :src="item.image" width="100%"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/logo.png'),
      bannerPicArray: [
        {image: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
        {image: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
        {image: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'}
      ],
      category: [],
      adBanner: [],
      recommendGoods: [],
      floor1: [],
      floor1_0: {},
      floor1_1: {},
      floor1_2: {}
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.$http.get('/api/index').then(res => {
        console.log(res.data)
        res = res.data
        this.bannerPicArray = res.slides
        this.category = res.category
        this.adBanner = res.advertesPicture
        this.recommendGoods = res.recommend
        this.floor1 = res.floor1 // 楼层1数据
        this.floor1_0 = this.floor1[0]
        this.floor1_1 = this.floor1[1]
        this.floor1_2 = this.floor1[2]
      }).catch(res => {})
    }
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
    border-bottom: 1px solid !important ;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    margin-top: .2rem;
    margin-left: .3rem;
    border-radius: 50%;
  }
  .swiper-area{
    max-height: 10rem;
    clear: both;
    overflow: hidden;
  }
  .type-bar {
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
  }
  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }

  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title {
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    padding-left: .8rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }

  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .floor-anomaly {
     display: flex;
     flex-direction:row;
     background-color: #fff;
     border-bottom:1px solid #ddd;
 }
  .floor-anomaly div{
    width:10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one {
    border-right:1px solid #ddd;
  }
 .floor-two {
    border-bottom:1px solid #ddd;
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;

  }
  .floor-rule div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }

</style>
