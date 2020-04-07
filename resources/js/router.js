import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Courses from './views/courses'

Vue.use(Router)

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    },
  ]
})

// Attempt to make Router Work again, no result. Could not find anything online
// that explained it properly.
// Did not ruin code this time, however.
