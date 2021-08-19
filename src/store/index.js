import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 分类参数选中的三级分类id
    cateId: 0
  },
  mutations: {
    seletedId(state, payload) {
      state.cateId = payload
    }
  },
  actions: {},
  getters: {}
})

export default store