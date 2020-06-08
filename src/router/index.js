import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/covid",
        name: "Covid",
        component: import("../views/Covid.vue")
      },
      {
        path: "/yiqing-module",
        name: "YiQingModule",
        component: import("../views/YiQingModule.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
