import Vue from 'vue'
import App from './App.vue'
import * as Three from "three"
import VueRouter from 'vue-router'
import router from './router/index'
import "./plugins/elementUI";

Vue.prototype.$three = Three;

Vue.config.productionTip = false

Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
