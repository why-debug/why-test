import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msisdn: "",
  },
  mutations: {
    newMsisdn({ msisdn }, data) {
      msisdn = data
    }
  },
  actions: {

  }
})
