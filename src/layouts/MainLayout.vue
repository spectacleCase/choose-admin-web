<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 ml-60">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/pages/home/sidebar.vue";
</script>