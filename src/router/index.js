import Vue from "vue";
import VueRouter from "vue-router";
import KonvaView from "../views/KonvaView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: KonvaView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
