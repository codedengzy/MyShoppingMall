// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button,NavBar,Field,Dialog,Tab, 
  Tabs,Tabbar,TabbarItem, GoodsAction, 
  GoodsActionIcon, GoodsActionButton,Sku,Stepper,
  SubmitBar,Toast, Sidebar, SidebarItem,Pagination,
  Search,Swipe, SwipeItem,Lazyload} from 'vant'

Vue.use(Button).use(NavBar).use(Field)
    .use(Dialog).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(GoodsAction)
    .use(GoodsActionButton).use(GoodsActionIcon).use(Sku)
    .use(Stepper).use(SubmitBar).use(Toast).use(Sidebar)
    .use(SidebarItem).use(Pagination).use(Search)
    .use(Swipe).use(SwipeItem).use(Lazyload);
    
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
