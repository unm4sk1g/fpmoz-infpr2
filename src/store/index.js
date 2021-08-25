import Vue from 'vue'
import Vuex from 'vuex'
import games from './modules/games';
import common from "./modules/common";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    games,
    common
  }
})
