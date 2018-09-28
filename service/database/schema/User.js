const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId  // 申明Object类型
const bcrypt = require('bcrypt')  // 加密算法 (MD5)

const SALT_WORK_FACTOR = 10 // 加盐

const userSchema = new Schema({
  UserId: Object,
  userName: {
    type: String,
    unique: true
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  // collection: 'user' // 自定义表名
})

//每次存储数据时都要执行
userSchema.pre('save', function (next) {
  // 加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // 加密
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 解密
userSchema.methods.compare = function (User, username, password) {
  return new Promise((resolve, reject) => {
    resolve(User.findOne({userName: username}).exec())
  }).then(res => {
    return new Promise((resolve, reject) => {
      if (!res) resolve({ success: false, message: '账号不存在' })  // 账号不存在
      bcrypt.compare(password, res.password, (err, res) => {
        if (err) {
          reject(err)
          throw err
        }
        if (res) resolve({ success: true, result: res }) // 登录成功
        if (!res) resolve({ success: false, message: '密码错误' })  // 密码错误
      })
    })
  })
}

// 发布模型（数据库映射） 与数据库表名一致
mongoose.model('User', userSchema)
