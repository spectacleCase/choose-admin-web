<template>
  <div class="p-6 bg-gray-100">
    <h1 class="mb-6 text-2xl font-bold text-gray-800">审核界面</h1>
    
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-4 border-b">
        <h2 class="text-xl font-semibold text-gray-700">待审核菜品</h2>
      </div>
      <div class="p-4">
        <p class="text-sm text-gray-600 mb-2">待审核项目数：{{ auditItems.length }}</p>
      </div>
      <div class="p-4">
        <ul class="space-y-4">
          <li v-for="item in auditItems" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">{{ item.name }}</p>
              <p class="text-sm text-gray-600">店铺名：{{ 11111 }}</p>
              <p class="text-sm text-gray-600">提交时间：{{ item.submitTime }}</p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span class="text-gray-400">图片预览</span>
              </div>
              <div class="space-x-2">
                <button @click="approveItem(item.id)" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  通过
                </button>
                <button @click="rejectItem(item.id)" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  拒绝
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const auditItems = ref([
  { id: 1, name: '菜品1', submitTime: '2023-04-15 10:30' },
  { id: 2, name: '菜品2', submitTime: '2023-04-15 11:45' },
  { id: 3, name: '菜品3', submitTime: '2023-04-15 14:20' },
]);

const approveItem = (id: number) => {
  // 实现通过审核的逻辑
  console.log(`通过审核项目 ${id}`);
};

const rejectItem = (id: number) => {
  // 实现拒绝审核的逻辑
  console.log(`拒绝审核项目 ${id}`);
};
</script>

<style scoped>
/* 可以添加额外的样式 */
</style>
