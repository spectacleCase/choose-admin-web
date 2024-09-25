<template>
  <div
    class="flex fixed top-0 left-0 flex-col w-60 h-screen text-white"
    style="background-color: #140f21"
  >
    <div class="flex-1 p-4 mt-6">
      <div class="ml-4">
        <h2 class="text-xl font-bold">御选</h2>
        <p class="text-xs">管理平台</p>
      </div>

      <nav class="mt-12">
        <ul>
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="relative mb-2 rounded-lg hover:bg-indigo-700"
            @click="ripple($event)"
          >
            <router-link
              :to="item.route"
              class="flex items-center px-4 py-2 w-full"
            >
              <img
                v-if="item.icon"
                :src="getImageUrl(item.icon)"
                :alt="item.text"
                class="w-6 h-6 svg-white"
              />
              <span class="ml-2">{{ item.text }}</span>
            </router-link>
            <span class="ripple-effect"></span>
          </li>
        </ul>
      </nav>
    </div>
    <div class="p-4" style="background-color: #140f21">
      <ul>
        <li
          class="relative rounded-lg hover:bg-indigo-700"
          @click="ripple($event)"
        >
          <a href="#" class="flex items-center px-4 py-2 w-full">
            <img
              :src="getImageUrl('开关.png')"
              alt="退出登录"
              class="w-6 h-6 svg-white"
            />
            <span class="ml-2">退出登录</span>
          </a>
          <span class="ripple-effect"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const menuItems = ref([
  { text: "首页", route: "/home", icon: "首页.png" },
  { text: "系统监控", route: "/monitor" },
  { text: "内容管理", route: "/content" },
]);

function ripple(event: MouseEvent) {
  const li = event.currentTarget as HTMLElement;
  const span = li.querySelector(".ripple-effect") as HTMLElement;
  const rect = li.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  span.style.width = span.style.height = `${size}px`;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;

  span.classList.remove("animate-ripple");
  span.offsetWidth; // 触发重排
  span.classList.add("animate-ripple");
}

function getImageUrl(name: string) {
  return new URL(`../../assets/img/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(176, 176, 180, 0.9); /* 使用 indigo 色调 */
  transform: scale(0);
  pointer-events: none;
  transition: opacity 0.3s ease-out;
}

@keyframes animate-ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ripple {
  animation: animate-ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

li {
  cursor: pointer;
  overflow: hidden; /* 确保涟漪效果不会超出按钮边界 */
}

/* 新增样式 */
li a,
li router-link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
</style>
