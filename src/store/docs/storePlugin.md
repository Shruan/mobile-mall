### store 插件
- store本地缓存插件使用说明

```javascript
  // 文件路径./plugin/storage.js
  const prefix = '[shruan-web] - '

  // vuex文件
  import $$ from '@/store/plugins/storage'

  const namespace = 'guide'
  $$.setNamespace(namespace)

  const state = {
    test: $$.get('test') || ''
  }

  const getters = {}

  const mutations = {}

  export default {namespaced: true, state, getters, mutations}
```
