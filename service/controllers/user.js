const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')  // 加密算法 (MD5)

const home = async (ctx) => {
  ctx.body = '首页'
}

// 注册
const register = async (ctx) => {
  let res = ctx.request.body
  if (!res.username || !res.password) {
    ctx.body = {
      data: '',
      code: 400,
      message: '账号密码不能为空'
    }
    return
  }
  let data = {
    userName: res.username,
    password: res.password
  }
  let user = new User(data)
  await user.save().then(res => {
    console.log('注册成功')
    ctx.body = {
      data: '',
      code: 200,
      message: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      data: '',
      code: 500,
      message: err
    }
  })
}

// 登录
const login = async (ctx, next) => {
  let res = ctx.request.body
  let result;
  if (!res.username || !res.password) {
    result = { data: '', success: false, message: '请输入账号密码' }
    ctx.body = result
  }
  // 密码校验
  let user = new User()
  await user.compare(User, res.username, res.password).then(res => {
    if (res.code === 200) {
      result = { data: '', success: true, message: '登录成功' }
    }
  }).catch(res => {
    result = { data: '', success: false, message: res.message }
  })
  ctx.body = result
}

module.exports = {
  'GET /': home,
  'POST /register': register,
  'POST /login': login,
}
