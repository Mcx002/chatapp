import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug:true,
  connection:SocketIO(process.env.VUE_APP_AXIOS_BASEURL),
  vuex:{
    store,
    actionPrefix:'SOCKET_',
    mutationPrefix:'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
