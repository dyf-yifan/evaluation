import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import False from "../views/False.vue";
import Covid from "../views/Covid.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/covid",
    name: "Covid",
    component: Covid
  },
  {
    path: "/yiqing-module",
    name: "YiQingModule",
    component: () => import("../views/YiQingModule.vue")
  },
  {
    path: "/yiqing-module/module-search",
    name: "ModuleSearch",
    component: () => import("../views/ModuleSearch.vue")
  },
  {
    path: "/yiqing-module/survey-content",
    name: "SurveyContent",
    component: () => import("../views/SurveyContent.vue")
  },
  {
    path: "/yiqing-module/survey-content/login-site",
    name: "LoginSite",
    component: () => import("../views/LoginSite.vue")
  },
  {
    path: "/yiqing-module/survey-content/create-module",
    name: "CreateModule",
    component: () => import("../views/CreateModule.vue")
  },
  {
    path: "/type-content",
    name: "TypeContent",
    component: () => import("../views/TypeContent.vue")
  },
  {
    path: "/type-content/commit",
    name: "Commit",
    component: () => import("../views/Commit.vue")
  },
  {
    path: "/type-content/answer",
    name: "Answer",
    component: () => import("../views/Answer.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "*",
    name: "False",
    component: False
  }
];

const router = new VueRouter({
  routes
});

export default router;
