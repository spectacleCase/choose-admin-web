<template>
  <div class="p-6 home-page">
    <h1 class="mb-6 text-2xl font-bold">欢迎来到WeChoice管理平台</h1>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- 待办事项 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">待办事项</h2>
        <ul class="space-y-2">
          <li>
            待审核菜品：<span class="font-bold text-red-500">{{
              todoItems.pendingDishes
            }}</span>
            个
          </li>
          <li>
            待审核店铺：<span class="font-bold text-red-500">{{
              todoItems.pendingShop
            }}</span>
            个
          </li>
        </ul>
      </div>

      <!-- 系统使用率 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">系统使用率</h2>
        <ul class="space-y-2">
          <li>
            CPU：<span class="font-bold text-green-500"
              >{{ systemUsage.cpu }}%</span
            >
          </li>
          <li>
            内存：<span class="font-bold text-yellow-500"
              >{{ systemUsage.memory }}%</span
            >
          </li>
          <li>
            JVM：<span class="font-bold text-blue-500">{{
              systemUsage.jvm
            }}</span>
          </li>
        </ul>
      </div>

      <!-- API 性能 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">API 性能</h2>
        <p>
          平均响应时间：<span class="font-bold text-purple-500"
            >{{ apiPerformance.averageResponseTime }}ms</span
          >
        </p>
      </div>

      <!-- 数据概览 -->
      <div class="p-4 bg-white rounded-lg shadow col-span-full">
        <h2 class="mb-3 text-lg font-semibold">数据概览</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p class="text-gray-600">总用户数</p>
            <p class="text-2xl font-bold">{{ dataOverview.totalUser }}</p>
          </div>
          <div>
            <p class="text-gray-600">今日活跃用户</p>
            <p class="text-2xl font-bold">
              {{ dataOverview.activeUsersToday }}
            </p>
          </div>
          <div>
            <p class="text-gray-600">总菜品数</p>
            <p class="text-2xl font-bold">{{ dataOverview.totalDishes }}</p>
          </div>
          <div>
            <p class="text-gray-600">今日预测数</p>
            <p class="text-2xl font-bold">
              {{ dataOverview.predictionToday }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷方式 -->
    <div class="mt-6">
      <h2 class="mb-3 text-lg font-semibold">快捷方式</h2>
      <div class="flex space-x-4">
        <button
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          审核菜品
        </button>
        <button
          class="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
        >
          审核图片
        </button>
        <button
          class="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600"
          @click="getRouter('/monitor/performance')"
        >
          系统监控
        </button>
      </div>
    </div>

    <!-- 数据浏览图表区 -->
    <div class="mt-8">
      <h2 class="mb-4 text-lg font-semibold">数据浏览</h2>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="mb-2 font-semibold text-md">用户增长趋势</h3>
          <v-chart class="chart" :option="userGrowthOption" />
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="mb-2 font-semibold text-md">预测统计</h3>
          <v-chart class="chart" :option="orderStatOption" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import common from "@/api/common/common";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import type { List } from "echarts";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);

interface TodoItems {
  pendingDishes: number;
  pendingShop: number;
}

interface SystemUsage {
  cpu: number;
  memory: number;
  jvm: number;
}

interface ApiPerformance {
  averageResponseTime: number;
}

interface DataOverview {
  totalUser: number;
  activeUsersToday: number;
  totalDishes: number;
  predictionToday: number;
}

interface DashboardData {
  todoItems: TodoItems;
  systemUsage: SystemUsage;
  apiPerformance: ApiPerformance;
  dataOverview: DataOverview;
}

const todoItems = ref<TodoItems>({
  pendingDishes: 0,
  pendingShop: 0,
});

const recommendList = ref<List<any>>();

const systemUsage = ref<SystemUsage>({
  cpu: 0,
  memory: 0,
  jvm: 0,
});

const apiPerformance = ref<ApiPerformance>({
  averageResponseTime: 0,
});

const dataOverview = ref<DataOverview>({
  totalUser: 0,
  activeUsersToday: 0,
  totalDishes: 0,
  predictionToday: 0,
});

const userGrowthOption = ref({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["总用户数", "新增用户"],
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "总用户数",
      type: "line",
      data: [1000, 1500, 2200, 3000, 4000, 5500, 7000],
    },
    {
      name: "新增用户",
      type: "bar",
      data: [500, 700, 800, 1000, 1200, 1500, 1800],
    },
  ],
});

const orderStatOption = ref({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["预测数"],
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "预测数",
      type: "line",
      data: recommendList,
    },
  ],
});

// 模拟获取数据
const fetchDashboardData = (): any => {
  return common.getIndex(null);
};

onMounted(async () => {
  const data = await fetchDashboardData();

  console.log(data);

  todoItems.value = data.data.todoItems;
  systemUsage.value = data.data.systemUsage;
  apiPerformance.value = data.data.apiPerformance;
  dataOverview.value = data.data.dataOverview;
  recommendList.value = data.data.recommendList;
  console.log(data.data.recommendList);
});

function getRouter(path: string) {
  console.log(path);
}
</script>

<style scoped>
.home-page {
  background-color: #f3f4f6;
  min-height: calc(100vh - 64px);
}

.chart {
  height: 300px;
}
</style>
