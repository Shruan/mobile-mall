const Koa = require('koa')
const app = new Koa()
const port = 3000
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')()  // 接收json对象
const cors = require('koa2-cors')()  // 解决跨域

// const Router = require('koa-router')
// let router = new Router()

// let user = require('./controllers/user.js')
// router.use('/api', user.routes())

// 加载中间件
// app.use(router.routes())
// app.use(router.allowedMethods())

app.use(bodyParser)
app.use(cors)

// 立即执行函数
// ;(async () => {
//   await connect()
//   initSchemas()
//   // const User = mongoose.model('User')
//   // let oneUser = new User({
//   //   userName: 'Shruan5',
//   //   password: '1234567',
//   // })
//   // oneUser.save().then(() => {
//   //   console.log('插入成功')
//   // })
//   // let user = await User.findOne({}).exec()
//   // console.log(user)
// })()
let controller = require('./controller.js')()
// 装载所有控制器
app.use(controller)




app.use(async ctx => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(port, () => {
  console.log(`server start at port ${port}`)
})
