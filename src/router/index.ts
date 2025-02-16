import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/login/index.vue";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../pages/home/HomePage.vue"),
      },
      {
        path: "monitor",
        name: "Monitor",
        component: () => import("@/pages/home/index.vue"),
        children: [
          {
            path: "performance",
            name: "PerformanceMonitor",
            component: () => import("@/pages/property/server/index.vue"),
          },
          {
            path: "redis",
            name: "RedisMonitor",
            component: () => import("@/pages/property/cache/index.vue"),
          },
        ],
      },
      {
        path: "content",
        name: "Content",
        //component: () => import("../pages/home/text.vue"),
        children: [
          {
            path: "store",
            name: "storereview",
            component: () => import("@/pages/shop/store/index.vue"),
          },
          {
            path: "food",
            name: "foodreview",
            component: () => import("@/pages/shop/food/index.vue"),
          },
          {
            path: "addstore",
            name: "addstore",
            component: () => import("@/pages/shop/addstore/index.vue"),
          },
          {
            path: "tag",
            name: "addtag",
            component: () => import("@/pages/shop/tag/index.vue"),
          },
        ],
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
