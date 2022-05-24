import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import {
    Button, Tabbar, TabbarItem, List, Card, NavBar, Icon, Popup, Area, Col
    , Row, Search, NoticeBar, Cell, CellGroup, Image as VanImage, Divider,
    ActionBar, ActionBarIcon, ActionBarButton, Tab, Tabs, Grid, GridItem, Checkbox, CheckboxGroup
    , Step, Steps, SubmitBar, Overlay, Form, Field, CountDown, Tag
} from 'vant'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

const app = createApp(App)
app.config.globalProperties.$moment = moment
app.use(router)
    .use(Tabbar).use(TabbarItem).use(Button).use(List).use(Card).use(Overlay).use(Form).use(Field)
    .use(NavBar).use(Icon).use(Popup).use(Area).use(Col).use(Row).use(Search).use(CountDown)
    .use(NoticeBar).use(Cell).use(CellGroup).use(VanImage).use(Divider)
    .use(ActionBar).use(ActionBarIcon).use(ActionBarButton).use(Tab).use(Tag)
    .use(Tabs).use(Grid).use(GridItem).use(Checkbox).use(CheckboxGroup)
    .use(Step).use(Steps).use(SubmitBar)
    .use(store)
    .mount('#app')

