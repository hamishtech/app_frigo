import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: HomeView,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../components/MapCanvas.vue"),
      },
      {
        path: "/home/:id/edit",
        name: "fridgeEdit",
        component: () => import("../views/FridgeEdit.vue"),
      },
      {
        path: "/home/:id",
        name: "fridgeDetail",
        component: () => import("../views/FridgeDetail.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
