import { createRouter, createWebHashHistory } from 'vue-router'
import Hello from '../views/HelloWorld.vue'
import Nav from '../views/nav.vue'
import Welcome from '../views/welcome.vue'
import Cinema from '../views/cinema.vue'
import Mine from '../views/mine.vue'
import MovieInfo from '../views/movieInfo.vue'
import CinemaInfo from '../views/cinemaInfo.vue'
import UserInfo from '../views/userInfo.vue'
import Session from '../views/session.vue'
import Seat from '../views/seat.vue'
import Ticket from '../views/ticket.vue'
import Actor from '../views/actor.vue'

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
  { path: '/movieinfo/:id', name: 'MovieInfo', component: MovieInfo },
  { path: '/cinemainfo/:id', name: 'CinemaInfo', component: CinemaInfo, meta: { keepAlive: true } },
  { path: '/userinfo', name: 'UserInfo', component: UserInfo },
  { path: '/session/:id', name: 'Session', component: Session },
  { path: '/seat/:id', name: 'Seat', component: Seat },
  { path: '/ticket', name: 'Ticket', component: Ticket },
  { path: '/actor/:id', name: 'Actor', component: Actor }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router