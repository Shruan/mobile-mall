import $$ from '@/store/plugins/storage'
import menuList from './menuList'

const namespace = 'globalModule'

$$.setNamespace(namespace)

const state = {
  user: {},
  menuList: menuList,
  isCollapse: false, // 是否关闭左侧菜单栏
  // 顶部tags列表
  tagsList: [
    { routerName: 'Home', label: '首页' }
  ],
  tag: 'Home' // 激活的tag
}

const mutations = {
  _user (state, user) {
    state.user = user
  },
  _isCollapse (state, data) {
    state.isCollapse = data
  },
  _menuList (state, data) {
    state.menuList = data
  },
  _tagsList (state, data) {
    state.tagsList = data
  },
  _tag (state, value) {
    state.tag = value
  }
}

const actions = {
  _AddTag ({ commit, state }, data) {
    let tag = {
      routerName: data.name,
      label: data.meta.title
    }
    let tagsList = state.tagsList
    if (!tagsList.some(item => item.routerName === tag.routerName)) {
      tagsList.push(tag)
      commit('_tagsList', tagsList)
    }
    commit('_tag', tag.routerName)
  }
}

const getters = {}

export default { namespaced: true, state, mutations, getters, actions }
