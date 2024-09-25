/**
 * 登录请求
 */

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = ApiResponseData<{
  token: string;
  id: number;
}>;
