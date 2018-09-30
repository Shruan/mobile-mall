const mongoose = require('mongoose')
const Goods = mongoose.model('Goods')

const getDetailGoodsInfo = async (ctx) => {
  try {
    let goodsId = ctx.request.query.goodsId
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = {
      success: true,
      data: result,
      message: '成功'
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      success: false,
      message: err
    }
  }
}

module.exports = {
  'GET /getDetailGoodsInfo': getDetailGoodsInfo
}
