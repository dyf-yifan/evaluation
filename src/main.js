import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import style from "../src/style/style.css";
import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  Pagination,
  Cell,
  CellGroup
} from "vant";
import { Tab, Tabs } from "vant";
import { Image as VanImage } from "vant";
import { RadioGroup, Radio } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Pagination);
Vue.use(PullRefresh);
Vue.use(style);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(VueAxios, axios);
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
