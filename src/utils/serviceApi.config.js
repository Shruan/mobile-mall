const BASEURL = 'https://easy-mock.com/mock/5af01dd24a095174a7d86d1e'
const LOCALURL = 'http://localhost:3000'
const URL = {
  getShoppingMallInfo: BASEURL + '/api/index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + '/api/register',
  login: LOCALURL + '/api/login'
}

module.exports = URL
