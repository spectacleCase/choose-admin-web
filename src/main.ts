import "tailwindcss/tailwind.css";
import "@/assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "@/router";
import "@/router/permission";

import VChart from "vue-echarts";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 全局注册 VChart 组件
app.component("VChart", VChart);

app.mount("#app");
