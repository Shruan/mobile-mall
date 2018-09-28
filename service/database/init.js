const mongoose = require('mongoose')
const db = "mongodb://localhost/mobile-mail"
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise =  global.Promise

// 初始化
exports.initSchemas = () => {
  // 匹配所有的schema
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  //连接数据库
  let maxConnectTimes = 0
  mongoose.connect(db)

  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('mongoose断开连接。')
      if (maxConnectTimes <= 3) {
        maxConnectTimes ++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出错，无法自动处理，请手动修复')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('mongoose错误：' + err)
      console.log('————————————————————————————————————————————————————————')
      if (maxConnectTimes <= 3) {
        maxConnectTimes ++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出错，无法自动处理，请手动修复')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
