/** 统一处理本地存储 */

import CacheKey from "@/utils/cache/cache-key";

export const getToken = () => {
  return localStorage.getItem(CacheKey.TOKEN);
};

export const setToken = (token: string) => {
  localStorage.setItem(CacheKey.TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(CacheKey.TOKEN);
};

export const getUserId = () => {
  return Number(localStorage.getItem(CacheKey.USER_ID));
};
