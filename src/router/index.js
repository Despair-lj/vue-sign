import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Sign from '@/components/sign/index'
import Sign from '@/components/sign/sign'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Sign',
    component: Sign
  }]
})
