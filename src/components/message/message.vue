<!-- 弹出消息框 -->
<template>
  <div class="pop-message" :style="style[type]" v-show="visible">
    <img
      v-if="style[type].icon"
      :src="style[type].icon"
      alt="Icon"
      class="icon"
    />
    <span class="text">{{ str }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// 定义 Props 类型
interface MessageProps {
  type: string;
  str: string;
}

// 定义 Style 类型
interface Style {
  [key: string]: {
    color: string;
    backgroundColor: string;
    borderColor: string;
    icon?: string;
  };
}

// 定义 Props
const props = defineProps<MessageProps>();

// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style: Style = {
  warn: {
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
    icon: "https://img.picui.cn/free/2024/09/24/66f2d773ef63d.png",
  },
  error: {
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
    icon: "https://img.picui.cn/free/2024/09/24/66f2d773ec203.png",
  },
  success: {
    color: "#67C23A",
    backgroundColor: "#FFFFFF",
    borderColor: "rgb(225, 243, 216)",
    icon: "https://img.picui.cn/free/2024/09/24/66f2d6fd1ae13.png", // 使用 import.meta.url 来加载图片
  },
};

const visible = ref(false);

onMounted(() => {
  visible.value = true;
});
</script>

<style scoped>
.pop-message {
  position: absolute;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  animation: move 0.38s linear forwards;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

@keyframes move {
  0% {
    transform: translate3d(0, -75px, 0);
    opacity: 0.16;
  }
  50% {
    opacity: 0.68;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}
</style>
