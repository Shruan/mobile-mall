const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId // 申明Object类型

const categorySchema = new Schema({
  ID: {
    unique: true,
    type: String
  },
  MALL_CATEGORY_NAME: {
    type: String
  },
  IMAGE: {
    type: String
  },
  TYPE: {
    type: Number
  },
  SORT: {
    type: Number
  },
  COMMENTS: {
    type: String
  }
}, {collections: 'Category'})

// 发布模型（数据库映射） 与数据库表名一致
mongoose.model('Category', categorySchema)
