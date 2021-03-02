import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";
import room from "@/store/room";
import message from "@/store/message";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    room,
    message
  }
})
