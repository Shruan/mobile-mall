const { connect, initSchemas } = require('./database/init.js')
const fs = require('fs')

function addControllers (router, apis, prefix) {
  // 注册模块
  for (let url in apis) {
    let api = url.match(/[^ ]+/ig)
    let type = api[0]
    let path = prefix + api[1] // 增加前缀
    if (type === 'GET') {
      router.get(path, apis[url])
    } else if (type === 'POST') {
      router.post(path, apis[url])
    } else if (type === 'DELETE') {
      router.delete(path, apis[url])
    } else if (type === 'PUT') {
      router.put(path, apis[url])
    }
    console.log(`register URL API: ${type} ${path}`)
  }
}

// 匹配所有模块
function getControllers (router, dir, prefix) {
  let files = fs.readdirSync(__dirname + '/' + dir).filter(item => {
    return item.endsWith('.js')
  })
  files.forEach(fileName => {
    let file = require(__dirname + '/' + dir + '/' + fileName)
    addControllers(router, file, prefix)
  })
}

module.exports = function (dir = 'controllers', prefix = '/api') {
  const router = require('koa-router')()
  // 立即执行函数
  ;(async () => {
    await connect() // 等待 数据库连接
    ;(async () => {
      await initSchemas() // 等待 模块注册
      getControllers(router, dir, prefix)
    })()
  })()
  return router.routes()
}
