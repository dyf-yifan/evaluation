import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { Button, Swipe, SwipeItem } from "vant";
import { Lazyload } from "vant";
import { Image as VanImage } from "vant";

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
