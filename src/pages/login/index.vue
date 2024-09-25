<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="w-full h-full">
      <div
        class="relative w-screen h-screen p-6 bg-gray-100 bg-center bg-no-repeat bg-cover rounded-lg shadow-lg"
        style="background-image: url('/src/assets/img/登录页1@2x.png')"
      >
        <div
          class="absolute w-3/12 overflow-hidden transform translate-x-1/2 bg-white rounded-lg shadow-lg h-80 right-1/4 top-1/3 drop-shadow-lg"
        >
          <div class="px-6 py-4">
            <div class="flex justify-center mt-2 mb-6">
              <span class="text-2xl font-bold text-gray-800">吃啥哟后台</span>
            </div>

            <Form @submit="handleLogin" :validation-schema="loginFormRules">
              <div class="h-14">
                <div class="relative flex justify-center mt-0-4">
                  <Field
                    v-model="loginFormData.username"
                    name="username"
                    placeholder="请输入账号"
                    type="text"
                    class="w-4/5 p-2 pl-10 border border-gray-300 rounded-md focus:border-sky-500"
                  />
                  <img
                    src="@/assets/img/用户名.png"
                    alt="Custom Icon"
                    width="20"
                    height="20"
                    class="absolute transform -translate-y-1/2 left-14 top-1/2"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  class="w-4/5 pl-10 text-sm text-red-500"
                />
              </div>
              <div class="h-14">
                <div class="relative flex justify-center mt-4">
                  <Field
                    v-model="loginFormData.password"
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                    class="w-4/5 h-10 p-2 pl-10 border border-gray-300 rounded-md focus:border-sky-500"
                  />
                  <img
                    src="@/assets/img/解锁.png"
                    alt="Custom Icon"
                    width="20"
                    height="20"
                    class="absolute transform -translate-y-1/2 left-14 top-1/2"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  class="w-4/5 pl-10 text-sm text-red-500"
                />
              </div>

              <div class="flex justify-center mt-6">
                <button
                  type="submit"
                  class="w-4/5 p-2 mb-8 text-white bg-orange-300 rounded-md hover:bg-orange-400"
                  style="margin-bottom: -32px"
                >
                  立即登录
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from "@/api/auth/types/auth";
import { reactive, ref, getCurrentInstance, onMounted, inject } from "vue";
import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
import { required, min, max, email } from "@vee-validate/rules";
import { useUserStore } from "@/stores/modules/user";
import { showMessage } from "@/components/message/message";
// 手动导入类型定义
import "@vee-validate/rules";
import { useRouter } from "vue-router";

defineRule("required", (value: string) => {
  if (!value) {
    return "请完善信息";
  }
  return true;
});

defineRule("min", (value: string, [limit]: [number]) => {
  if (value.length < limit) {
    return `长度不能少于${limit}个字符`;
  }
  return true;
});

defineRule("max", (value: string, [limit]: [number]) => {
  if (value.length > limit) {
    return `长度不能超过${limit}个字符`;
  }
  return true;
});

defineRule("email", email);

const router = useRouter();
const loading = ref(false);
const loginFormData: LoginRequest = reactive({
  username: "",
  password: "",
});

const loginFormRules = {
  username: "required|min:3|max:20",
  password: "required|min:6|max:20",
};

const handleLogin = (values: Record<string, any>) => {
  const typedValues = values as LoginRequest;
  useUserStore()
    .login(typedValues)
    .then(() => {
      showMessage({ str: "登录成功", type: "success" });
      router.push({ path: "/" });
    });
  console.log(typedValues);
};
</script>

<style scoped></style>
