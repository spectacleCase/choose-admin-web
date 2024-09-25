<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="overflow-y-auto overflow-x-hidden flex-1">
      <main class="p-6">
        <router-view class="ml-60"></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/pages/home/sidebar.vue";
</script>

<style scoped>
/* 可以在这里添加任何需要的样式 */
</style>
