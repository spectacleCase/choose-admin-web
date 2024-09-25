<template>
  <div class="p-6 home-page">
    <h1 class="mb-6 text-2xl font-bold">欢迎来到御选管理平台</h1>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- 待办事项 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">待办事项</h2>
        <ul class="space-y-2">
          <li>待审核菜品：<span class="font-bold text-red-500">5</span> 个</li>
          <li>待审核图片：<span class="font-bold text-red-500">12</span> 张</li>
        </ul>
      </div>

      <!-- 系统使用率 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">系统使用率</h2>
        <ul class="space-y-2">
          <li>CPU：<span class="font-bold text-green-500">45%</span></li>
          <li>内存：<span class="font-bold text-yellow-500">78%</span></li>
          <li>JVM：<span class="font-bold text-blue-500">62%</span></li>
        </ul>
      </div>

      <!-- API 性能 -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">API 性能</h2>
        <p>
          平均响应时间：<span class="font-bold text-purple-500">120ms</span>
        </p>
      </div>

      <!-- 数据概览 -->
      <div class="col-span-full p-4 bg-white rounded-lg shadow">
        <h2 class="mb-3 text-lg font-semibold">数据概览</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p class="text-gray-600">总用户数</p>
            <p class="text-2xl font-bold">12,345</p>
          </div>
          <div>
            <p class="text-gray-600">今日活跃用户</p>
            <p class="text-2xl font-bold">1,234</p>
          </div>
          <div>
            <p class="text-gray-600">总菜品数</p>
            <p class="text-2xl font-bold">5,678</p>
          </div>
          <div>
            <p class="text-gray-600">今日订单数</p>
            <p class="text-2xl font-bold">789</p>
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
          <h3 class="mb-2 font-semibold text-md">订单统计</h3>
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
import { LineChart, BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";

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

const userGrowthOption = ref({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["总用户数", "新增用户"],
  },
  xAxis: {
    type: "category",
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
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
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "订单类型",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "外卖订单" },
        { value: 735, name: "堂食订单" },
        { value: 580, name: "自提订单" },
        { value: 484, name: "预订订单" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

// 这里可以添加获取实时数据的逻辑
onMounted(() => {
  // 例如，从API获取数据并更新图表选项
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
