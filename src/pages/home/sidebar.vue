<template>
  <div
    class="flex fixed top-0 left-0 flex-col w-60 h-screen text-white"
    style="background-color: #140f21"
  >
    <div class="flex-1 p-4 mt-6">
      <div class="ml-4">
        <h2 class="text-xl font-bold">WeChoice</h2>
        <p class="text-xs">管理平台</p>
      </div>

      <nav class="mt-12">
        <ul>
          <li v-for="item in menuItems" :key="item.route" class="mb-2">
            <div
              class="overflow-hidden relative rounded-lg cursor-pointer"
              :class="getItemClasses(item)"
              @click="handleItemClick($event, item)"
            >
              <div
                class="flex items-center px-4 py-2 w-full focus:outline-none"
              >
                <img
                  v-if="item.icon"
                  :src="getImageUrl(item.icon)"
                  :alt="item.text"
                  class="w-6 h-6 svg-white"
                />
                <span class="ml-2">{{ item.text }}</span>
                <span v-if="item.children" class="ml-auto">
                  <i
                    :class="{ 'transform rotate-180': item.expanded }"
                    class="transition-transform duration-300 fas fa-chevron-down"
                  ></i>
                </span>
              </div>
              <span class="ripple-effect"></span>
            </div>
            <transition name="slide-fade">
              <ul v-if="item.children && item.expanded" class="mt-2 ml-4">
                <li
                  v-for="child in item.children"
                  :key="child.route"
                  class="mb-2"
                >
                  <div
                    class="overflow-hidden relative rounded-lg cursor-pointer"
                    :class="getItemClasses(child)"
                    @click.stop="handleChildItemClick($event, child, item)"
                  >
                    <router-link
                      :to="child.route"
                      class="flex items-center px-4 py-2 w-full focus:outline-none"
                    >
                      <span class="ml-2">{{ child.text }}</span>
                    </router-link>
                    <span class="ripple-effect"></span>
                  </div>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </div>
    <div class="p-4 mb-5" style="background-color: #140f21">
      <div
        class="overflow-hidden relative rounded-lg cursor-pointer hover:bg-indigo-600 focus:bg-indigo-300"
        @click="handleLogout"
      >
        <a
          href="#"
          class="flex items-center px-4 py-2 w-full focus:outline-none"
        >
          <img
            :src="getImageUrl('开关.png')"
            alt="退出登录"
            class="w-6 h-6 svg-white"
          />
          <span class="ml-2">退出登录</span>
        </a>
        <span class="ripple-effect"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logoutApi } from "@/api/auth/auth";
import { useUserStore } from "@/stores/modules/user";

const route = useRoute();
const router = useRouter();
const activeRoute = computed(() => route.path);

const menuItems = ref([
  { text: "首页", route: "/home", icon: "首页.png" },
  {
    text: "系统监控",
    route: "/monitor",
    icon: "系统.png",
    expanded: false,
    children: [
      { text: "性能监视", route: "/monitor/performance" },
      { text: "Redis监控", route: "/monitor/redis" },
    ],
  },
  {
    text: "内容管理",
    route: "/content",
    icon: "_内容2.png",
    expanded: false,
    children: [
      { text: "店铺审核", route: "/content/store" },
      { text: "菜品审核", route: "/content/food" },
      { text: "店铺管理", route: "/content/addstore" },
      { text: "标签管理", route: "/content/tag" },
    ],
  },
]);

// 新增：使用 localStorage 来保存和恢复菜单展开状态
function saveMenuState() {
  localStorage.setItem(
    "menuState",
    JSON.stringify(menuItems.value.map((item) => item.expanded))
  );
}

function loadMenuState() {
  const savedState = localStorage.getItem("menuState");
  if (savedState) {
    const expandedStates = JSON.parse(savedState);
    menuItems.value.forEach((item, index) => {
      if (item.children) {
        item.expanded = expandedStates[index];
      }
    });
  }
}

// 在组件挂载时加载菜单状态
loadMenuState();

// 监听路由变化，根据当前路由展开相应的菜单项
watch(
  route,
  (newRoute) => {
    menuItems.value.forEach((item) => {
      if (item.children) {
        item.expanded = item.children.some((child) =>
          newRoute.path.startsWith(child.route)
        );
      }
    });
    saveMenuState();
  },
  { immediate: true }
);

function getItemClasses(item: any) {
  if (item.children) {
    return {
      "hover:bg-indigo-500": true,
      "focus:bg-indigo-300": true,
    };
  } else {
    return {
      "bg-indigo-700": activeRoute.value.startsWith(item.route),
      "hover:bg-indigo-500": !activeRoute.value.startsWith(item.route),
      "focus:bg-indigo-300": true,
    };
  }
}

function handleItemClick(event: MouseEvent, item: any) {
  ripple(event);
  if (item.children) {
    item.expanded = !item.expanded;
    saveMenuState();
  } else {
    router.push(item.route);
  }
}

function handleChildItemClick(event: MouseEvent, child: any, parent: any) {
  event.stopPropagation();
  ripple(event);
  router.push(child.route);
  saveMenuState();
}

function ripple(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const ripple = target.querySelector(".ripple-effect") as HTMLElement;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  ripple.classList.remove("scale-0");
  ripple.classList.add("scale-150");

  setTimeout(() => {
    ripple.classList.remove("scale-150");
    ripple.classList.add("scale-0");
  }, 300);
}

function getImageUrl(name: string) {
  return new URL(`../../assets/img/${name}`, import.meta.url).href;
}

async function handleLogout() {
  // 实现退出登录逻辑
  console.log("退出登录");
  await useUserStore().logout();
  router.push({ path: "/login" });
}
</script>

<style scoped>
.ripple-effect {
  @apply absolute bg-white bg-opacity-30 rounded-full transition-transform duration-300 ease-out transform scale-0 pointer-events-none;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
