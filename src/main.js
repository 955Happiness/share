import Vue from 'vue'
import ElementUI from 'element-ui';

import 'vue2-animate/dist/vue2-animate.min.css';
import 'element-ui/lib/theme-chalk/index.css'; //input style bug, so  must add

import '@/assets/index.scss';

Vue.use(ElementUI)

import App from './App.vue'
import router from '@/router/'
import store from '@/store/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
