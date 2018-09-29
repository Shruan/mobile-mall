const mongoose = require('mongoose')
const fs = require('fs')

// 导入商品
const insertAllGoodsInfo = async (ctx, next) => {
  fs.readFile('./assets/goods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((item, index) => {
      console.log(item)
      let newGoods = new Goods(item)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
}

// 导入商品
const insertAllCategory = async (ctx, next) => {
  fs.readFile('./assets/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((item, index) => {
      console.log(item)
      let newCategory = new Category(item)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
}

// 导入商品
const insertAllCategorySub = async (ctx, next) => {
  fs.readFile('./assets/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((item, index) => {
      console.log(item)
      let newCategorySub = new CategorySub(item)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
}

module.exports = {
  // 'GET /insertAllGoodsInfo': insertAllGoodsInfo
  'GET /insertAllCategory': insertAllCategory,
  'GET /insertAllCategorySub': insertAllCategorySub
}
