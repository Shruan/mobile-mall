const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId // 申明Object类型

const categorySubSchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_ID: {
    type: String
  },
  MALL_SUB_NAME: {
    type: String
  },
  COMMENTS: {
    type: String
  },
  SORT: {
    type: Number
  }
}, {collections: 'CategorySub'})

// 发布模型（数据库映射） 与数据库表名一致
mongoose.model('CategorySub', categorySubSchema)
