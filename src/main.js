// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './router'
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false


//and then use it in main.js
Vue.use(VueAnalytics, {
  id: 'UA-131485297-2',
  router
}),

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
