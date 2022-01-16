import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Tabbar, TabbarItem, List, Card, NavBar, Icon, Popup, Area } from 'vant'

const app = createApp(App)
app.use(router)
app.use(Tabbar).use(TabbarItem).use(Button).use(List).use(Card).use(NavBar).use(Icon).use(Popup).use(Area)
app.mount('#app')
