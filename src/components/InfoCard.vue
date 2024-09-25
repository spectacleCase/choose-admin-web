<template>
  <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
    <h3 class="mb-2 text-sm font-semibold text-gray-500">{{ title }}</h3>
    <p :class="valueClass">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  value: string | number;
  threshold?: number;
}>();

const valueClass = computed(() => {
  const baseClass = "text-lg font-bold";
  if (props.threshold !== undefined) {
    const numericValue = parseFloat(props.value.toString());
    return numericValue >= props.threshold ? `${baseClass} text-red-600` : `${baseClass} text-indigo-600`;
  }
  return `${baseClass} text-indigo-600`;
});
</script>