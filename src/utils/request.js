import axios from 'axios'
import store from '../store'
import router from '../router'
import url from './serviceApi.config.js'

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : url.BASEURL,
  timeout: 1000
})
// 请求过滤器
http.interceptors.request.use(config => {
  if (Object.keys(store.state.globalModule.user).length) {
    config.headers['X-USER-ID'] = store.state.globalModule.user.id
    config.headers['X-TOEKN'] = store.state.globalModule.user.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应过滤器
http.interceptors.response.use(res => {
  switch (res.status) {
    case 200:
      if (res.data.success && !res.data.success) {
        router.push({ name: 'Error403' })
        return res.data
      } else {
        return res.data
      }
  }
}, err => {
  if (err.response) {
    switch (err.response.status) {
      case 404:
        console.log('404 error')
        break
      case 500:
        console.log('500 err')
        break
      default:
        console.log('unknow err')
    }
  } else {
    console.log(err)
  }
  return Promise.reject(err)
})

export default http
