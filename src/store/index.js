import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      role: '',
      id: ''
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user.role = payload.role
      state.user.id = payload.id
    }
  },
  actions: {
    setUser (context, payload) {
      context.commit('setUser', payload)
    }
  },
  modules: {
  },
  getters: {
    user: state => {
      return state.user
    }
  }
})
