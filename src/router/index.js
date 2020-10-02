import Vue from 'vue'
import Router from 'vue-router'
import vClickOutside from 'v-click-outside'
import Privacy from '../components/Privacy.vue'
import Home from '../components/Home.vue'
import Main from '../components/Main.vue'
// import Install from '../components/Install.vue'
import NotFound from '../components/404.vue'

Vue.use(vClickOutside)
Vue.use(Router)
 
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/app', component: Main },
    { path: '/privacy', component: Privacy },
    // { path: '/install', component: Install },
    { path: '*', component: NotFound }

  ]
})
