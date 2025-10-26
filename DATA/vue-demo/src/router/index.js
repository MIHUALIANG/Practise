import { createRouter, createWebHashHistory } from "vue-router";
import TableManager from "../views/TableManager.vue";

const routes = [
  {
    path: "/",
    name: "table-manager",
    component: TableManager,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
