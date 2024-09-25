<template>
  <div class="flex">
    <Sidebar class="w-64" />
    <router-view class="ml-64"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./sidebar.vue";

const isChecked = ref(false);

function ripple(event: MouseEvent) {
  const span = event.target as HTMLElement;
  const x = event.offsetX;
  const y = event.offsetY;
  span.style.setProperty("--x", `${x}px`);
  span.style.setProperty("--y", `${y}px`);
}
</script>
<style scoped>
.btn {
  display: block;
  width: 300px;
  height: 100px;
  margin: 50px;
  outline: 0;
  overflow: hidden;
  position: relative;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  background: tomato;
  color: #fff;
  border-radius: 10px;
}

.btn > span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.btn > span:after {
  content: "";
  position: absolute;
  background: transparent;
  border-radius: 50%;
  width: 100%;
  padding-top: 100%;
  margin-left: -50%;
  margin-top: -50%;
  left: var(--x, -100%);
  top: var(--y, -100%);
}

.btn:active {
  background: orangered;
}

.btn > input[type="checkbox"] {
  display: none;
}

.btn > input[type="checkbox"] + span:after {
  animation: ripple-in 1s;
}

.btn > input[type="checkbox"]:checked + span:after {
  animation: ripple-out 1s;
}

@keyframes ripple-in {
  from {
    transform: scale(0);
    background: rgba(0, 0, 0, 0.25);
  }
  to {
    transform: scale(1.5);
    background: transparent;
  }
}

@keyframes ripple-out {
  from {
    transform: scale(0);
    background: rgba(0, 0, 0, 0.25);
  }
  to {
    transform: scale(1.5);
    background: transparent;
  }
}
</style>
