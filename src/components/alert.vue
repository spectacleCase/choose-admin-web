<!-- 模态对话框 -->
<!-- src/components/Alert.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="p-6 bg-white rounded-lg shadow-lg">
      <div class="mb-4 text-lg font-bold">{{ title }}</div>
      <div class="mb-4">{{ message }}</div>
      <div class="flex justify-end">
        <button
          @click="handleConfirm"
          class="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          确认
        </button>
        <button
          @click="handleCancel"
          class="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title: string;
  message: string;
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped></style>
