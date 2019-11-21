import Vue from 'vue'
import Router from 'vue-router'
import Output from '@/components/Output'


Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/outputs',
      name: 'Output',
      component: Output
    },
    
  ]
})