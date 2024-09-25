import { createVNode, render, type VNode } from "vue";
import MessageComponent from "./message.vue";

// 定义 Message 组件的 Props 类型
interface MessageProps {
  str: string;
  type: string;
}

// 定义一个 div 容器
const div = document.createElement("div");
// 将定义的容器添加到 DOM 上
document.body.appendChild(div);
// 定义定时器：一定时间后清除
let timer: number | null = null;

export const showMessage = ({ str, type }: MessageProps): void => {
  const vnode: VNode = createVNode(MessageComponent, { str, type });
  render(vnode, div);
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    render(null, div);
  }, 1500);
};
