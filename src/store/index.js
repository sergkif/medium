import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: ''
  },
  mutations: {
    setRole (state, payload) {
      state.role = payload
    }
  },
  actions: {
    setRole (context, payload) {
      context.commit('setRole', payload)
    }
  },
  modules: {
  },
  getters: {
    role: state => {
      return state.role
    }
  }
})
