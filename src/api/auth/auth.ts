// src/api/login.ts

import request from "@/utils/request";
import type { LoginRequest, LoginResponse } from "./types/auth";

// 登录
export function loginApi(data: LoginRequest): Promise<LoginResponse> {
  return request.post<LoginResponse>("/auto/v1/login", data);
}

// 退出
export function logoutApi(): Promise<ApiResponseData<null>> {
  return request.post("/auto/v1/logout");
}
