const mongoose = require('mongoose')

// 获取商品详情
const getDetailGoodsInfo = async (ctx) => {
  try {
    const Goods = mongoose.model('Goods')
    let goodsId = ctx.request.query.goodsId
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = {
      success: true,
      data: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      success: false,
      message: err
    }
  }
}

// 获取商品类别（大类）
const getCategoryList = async (ctx) => {
  try {
    let goodsId = ctx.request.query.goodsId
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {
      success: true,
      data: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      success: false,
      message: err
    }
  }
}

// 获取商品类别（小类）
const getCategorySubList = async (ctx) => {
  try {
    let categoryId = ctx.request.query.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = {
      success: true,
      data: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      success: false,
      message: err
    }
  }
}

// 商品类别获取商品列表
const getGoodsListByCategorySubID = async (ctx) => {
  try {
    let categorySubId = ctx.request.query.categorySubId
    let page = ctx.request.query.page
    let num = 10
    let start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    // skip 跳过数量
    // limit 获取数据数量
    let result = await Goods.find({ SUB_ID: categorySubId }).skip(start).limit(num).exec()
    ctx.body = {
      success: true,
      data: result
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
  'GET /goods/getDetailGoodsInfo': getDetailGoodsInfo,
  'GET /goods/getCategoryList': getCategoryList,
  'GET /goods/getCategorySubList': getCategorySubList,
  'GET /goods/getGoodsListByCategorySubID': getGoodsListByCategorySubID
}
