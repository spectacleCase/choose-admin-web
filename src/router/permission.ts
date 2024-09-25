import { router } from "@/router/idnex";
import { getToken, removeToken } from "@/utils/cache/token";
import { showMessage } from "@/components/message/message";

router.beforeEach(async (to: any, _from: any, next: any) => {
  const token = getToken();
  if (to.path == "/login") {
    removeToken();
    return next();
  }
  // 没有登录
  if (!token) {
    showMessage({ str: "请重新登录", type: "error" });
    return next("/login");
  }
  return next();
});
