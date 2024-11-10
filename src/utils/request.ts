import { showMessage } from "@/components/message/message";
import { getToken } from "./cache/token";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/// 定义请求配置
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config: RequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers["AdminToken"] = `${token}`;
    }

    // 处理自定义配置项
    if (config.showLoading) {
      console.log("Loading...");
    }

    return config;
  },
  (error) => {
    // 处理请求错误
    showMessage({ str: "请求错误", type: "error" });
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("进入");

    const res = response.data;
    console.log(res);

    switch (res.code) {
      case 200:
        return res;
      case 401:
        // token过期
        showMessage({ str: "token过期", type: "error" });
        return;
      case 500:
        showMessage({ str: res.message, type: "error" });
        return;
      default:
        showMessage({ str: "服务器报错！！", type: "error" });
        return Promise.reject(new Error("服务器报错！！"));
    }
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

// 封装请求方法
const request = {
  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.get(url, config);
  },
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config);
  },
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config);
  },
  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

export default request;
