<template>
<div>
  <div class="navbar-div">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
  <div class="topimage-div">
    <img :src="goodsInfo.IMAGE1" width="100%" />
  </div>
  <div class="goods-name">{{goodsInfo.NAME}} </div>
  <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
  <div>
    <van-tabs swipeable sticky>
      <van-tab title="商品详情">
        <div class="detail" v-html="goodsInfo.DETAIL">
        </div>
      </van-tab>
      <van-tab title="评论">
        评论制作中
      </van-tab>
    </van-tabs>
  </div>

  <div class="goods-bottom">
    <div>
      <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
    </div>
    <div>
      <van-button size="large" type="danger">直接购买</van-button>
    </div>
  </div>

</div>
</template>

<script>
import url from '@/utils/serviceAPI.config.js'
import {
  Toast
} from 'vant'
import {
  toMoney
} from '@/utils/utils.js'
import router from '@/router'
export default {
  props: {
    goodsId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      goodsInfo: {} // 商品详细信息
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (Object.keys(to.query).length > 0 && to.query.goodsId) {
      next()
    } else {
      router.go(-1)
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$http.get(url.getDetailGoodsInfo, {
        params: {
          goodsId: this.goodsId
        }
      }).then(response => {
        if (response.success) {
          this.goodsInfo = response.data
        } else {
          Toast('服务器错误，数据获取失败')
        }
        console.log(this.goodsInfo)
      }).catch(error => {
        console.log(error)
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    addGoodsToCart () {
      // 取出本地购物车中的商品
      // localStorage.removeItem('cartInfo')
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)
      console.log(isHaveGoods)
      console.log(this.goodsInfo)
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo)
        localStorage.cartInfo = JSON.stringify(cartInfo)
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }
      this.$router.push({
        name: 'Cart'
      })
    }
  }
}
</script>

<style scoped>
.goods-name {
  background-color: #fff;
}

.goods-price {
  background-color: #fff;
}

.detail {
  font-size: 0px;
}

.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #FFF;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}

.goods-bottom>div {
  flex: 1;
  padding: 5px;
}
</style>
