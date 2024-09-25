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
        component: () => import("../pages/home/text.vue"),
      },
      {
        path: "content",
        name: "Content",
        component: () => import("../pages/home/text.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
