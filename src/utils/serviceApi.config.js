const BASEURL = 'https://easy-mock.com/mock/5af01dd24a095174a7d86d1e'
const LOCALURL = 'http://localhost:3000'
const URL = {
  getShoppingMallInfo: BASEURL + '/api/index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + '/api/register', // 注册
  login: LOCALURL + '/api/login', // 登录
  getDetailGoodsInfo: LOCALURL + '/api/getDetailGoodsInfo' // 获取商品详情
}

module.exports = URL
