import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 懒加载
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
