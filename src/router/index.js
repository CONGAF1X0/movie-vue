import { createRouter, createWebHashHistory } from 'vue-router'
import Hello from '../components/HelloWorld.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Cinema from '../components/cinema.vue'
import Mine from '../components/mine.vue'


const routes = [
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/welcome"
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: Cinema
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router