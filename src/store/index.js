import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //足迹
    historydata:[]
  },
  mutations: {
    gethistory(state, Newmsg) {
      state.historydata.push(Newmsg)
      console.log(Newmsg);
    }
  },
  actions: {
  },
  modules: {
  }
})
