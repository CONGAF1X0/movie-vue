import { createRouter, createWebHashHistory } from 'vue-router'
import Hello from '../views/HelloWorld.vue'
import Nav from '../views/nav.vue'
import Welcome from '../views/welcome.vue'
import Cinema from '../views/cinema.vue'
import Mine from '../views/mine.vue'
import MovieInfo from '../views/movieInfo.vue'
import CinemaInfo from '../views/cinemaInfo.vue'

const routes = [

  {
    path: '/',
    name: 'Nav',
    component: Nav,
    children: [
      {
        path: '/about', name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/cinema', name: 'Cinema', component: Cinema },
      { path: '/mine', name: 'Mine', component: Mine },
      { path: '/hello', name: 'Hello', component: Hello },
    ],
    redirect: '/welcome'
  },
  { path: '/movieinfo', name: 'MovieInfo', component: MovieInfo },
  { path: '/cinemainfo', name: 'CinemaInfo', component: CinemaInfo },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router