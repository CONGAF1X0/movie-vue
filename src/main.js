import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import {
    Button, Tabbar, TabbarItem, List, Card, NavBar, Icon, Popup, Area, Col
    , Row, Search, NoticeBar, Cell, CellGroup, Image as VanImage, Divider,
    ActionBar, ActionBarIcon, ActionBarButton, Tab, Tabs, Grid, GridItem, Checkbox, CheckboxGroup
    , Step, Steps, SubmitBar
} from 'vant'

const app = createApp(App)
app.use(router)
    .use(Tabbar).use(TabbarItem).use(Button).use(List).use(Card)
    .use(NavBar).use(Icon).use(Popup).use(Area).use(Col).use(Row).use(Search)
    .use(NoticeBar).use(Cell).use(CellGroup).use(VanImage).use(Divider)
    .use(ActionBar).use(ActionBarIcon).use(ActionBarButton).use(Tab)
    .use(Tabs).use(Grid).use(GridItem).use(Checkbox).use(CheckboxGroup)
    .use(Step).use(Steps).use(SubmitBar)
    .use(store)
    .mount('#app')

