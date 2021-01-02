import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vueRouter from 'vue-router';

import { routes } from './router/index';
import { store } from './store/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.29.209:4000/';

import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(vueRouter);
Vue.use(Vuelidate);
Vue.use(Antd);

const router = new vueRouter({
  routes,
  mode: 'history'
});

// Protected Guards
router.beforeEach((to, from, next) => {
  if(to.name !== 'SignIn' && to.name !== 'SignUp' && !store.state.AuthStore.token) {
    next('/');
  }
  else if(to.name === 'SignIn' && store.state.AuthStore.token) {
    next('/dashboard');
  }
  else
    next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
