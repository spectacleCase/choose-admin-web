import request from "@/utils/request";

export default {
  // redis缓存
  getServerMessage: (data: any): Promise<ApiResponseData<any>> => {
    return request.post<any>("/server/v1/get", data);
  },

  getRedisMessage: (
    data: any
  ): Promise<ApiResponseData<{ commandStats: any; info: any }>> => {
    return request.post<any>("/cache/v1/get", data);
  },
};
