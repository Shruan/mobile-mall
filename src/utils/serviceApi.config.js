const BASEURL = 'https://easy-mock.com/mock/5af01dd24a095174a7d86d1e'
const LOCALURL = 'http://localhost:3000'
const URL = {
  getShoppingMallInfo: BASEURL + '/api/index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + '/api/register', // 注册
  login: LOCALURL + '/api/login', // 登录
  getDetailGoodsInfo: LOCALURL + '/api/goods/getDetailGoodsInfo', // 获取商品详情
  getCateGoryList: LOCALURL + '/api/goods/getCateGoryList', // 得到大类信息
  getCateGorySubList: LOCALURL + '/api/goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: LOCALURL + '/api/goods/getGoodsListByCategorySubID' // 得到小类商品信息
}

module.exports = URL
