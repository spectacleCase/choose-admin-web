import { ref } from "vue";
import stores from "..";
import { defineStore } from "pinia";
import { loginApi, logoutApi } from "@/api/auth/auth";
import {
  getToken,
  getUserId,
  removeToken,
  setToken,
} from "@/utils/cache/token";
import type { LoginRequest, LoginResponse } from "@/api/auth/types/auth";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const userId = ref<number | null>(getUserId() || null);

  /*登录*/
  const login = async ({ username, password }: LoginRequest) => {
    const { data }: LoginResponse = await loginApi({ username, password });
    setToken(data.token);
    token.value = data.token;
    userId.value = data.id;
  };

  /*退出*/
  const logout = async () => {
    await logoutApi();
    removeToken();
    token.value = "";
    userId.value = null;
  };

  const getId = () => {
    return userId;
  };

  /*重置token */
  const resetToken = () => {
    removeToken();
    token.value = "";
  };

  return { token, login, logout, getId, resetToken };
});
