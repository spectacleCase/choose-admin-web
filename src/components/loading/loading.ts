import { createApp, reactive } from "vue";
import myLoad from "./loading";

// 创建一个响应式的消息对象
const msg = reactive({
  show: false,
  title: "加载中...",
});

// 创建加载组件实例并挂载到 DOM
const $loading = createApp(myLoad, { msg }).mount(
  document.createElement("div")
);

// 定义加载指示器的方法
const load = {
  show(title: string = msg.title) {
    // 控制显示loading的方法
    msg.show = true;
    msg.title = title;
    document.body.appendChild($loading.$el);
  },

  hide() {
    // 控制loading隐藏的方法
    msg.show = false;
  },
};

export { load };
