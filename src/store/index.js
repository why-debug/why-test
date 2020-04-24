import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msisdn: "",
    videoPro:0,
    videoSpeed:0,
    videoTotal:0,
    code:0
  },
  mutations: {
    newMsisdn({ msisdn }, data) {
      msisdn = data
    },
    newvideoPro(state,datas){
      state.videoPro=datas
    },
    newvideoSpeed(state,data){
      state.videoSpeed=data
    },
    newvideoTotal(state,data){
      state.videoTotal=data
    },
    newcode(state,data){
      state.code=data
    }
  },
  actions: {

  }
})
