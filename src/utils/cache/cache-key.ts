const SYSTEM_NAME = "choose";

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`;
  static readonly USER_ID = `${SYSTEM_NAME}-user-id-key`;
}

export default CacheKey;
