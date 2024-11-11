import request from "@/utils/request";

export default {
  // 获取首页
  getIndex: (data: any): Promise<ApiResponseData<any>> => {
    return request.post<any>("/common/v1/getIndex", data);
  },
};
