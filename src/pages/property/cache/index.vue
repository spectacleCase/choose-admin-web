<template>
  <div class="p-6 bg-gray-100 redis-monitor">
    <h1 class="mb-8 text-3xl font-bold text-gray-800">Redis 服务器信息</h1>

    <!-- 基本信息 -->
    <section class="p-6 mb-10 bg-white rounded-lg shadow-md">
      <h2 class="mb-6 text-2xl font-semibold text-gray-700">基本信息</h2>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <InfoCard title="Redis 版本" :value="redisInfo.redis_version" />
        <InfoCard
          title="运行模式"
          :value="redisInfo.redis_mode === 'standalone' ? '单机' : '集群'"
        />
        <InfoCard title="端口" :value="redisInfo.tcp_port" />
        <InfoCard title="客户端数" :value="redisInfo.connected_clients" />
        <InfoCard
          title="运行时间"
          :value="formatUptime(redisInfo.uptime_in_seconds)"
        />
        <InfoCard title="使用内存" :value="redisInfo.used_memory_human" />
        <InfoCard title="使用 CPU" :value="`${redisInfo.used_cpu_sys}%`" />
        <InfoCard title="内存配置" :value="redisInfo.maxmemory_human" />
        <InfoCard
          title="AOF 是否开启"
          :value="redisInfo.aof_enabled === '0' ? '否' : '是'"
        />
        <InfoCard
          title="RDB 最后保存状态"
          :value="redisInfo.rdb_last_bgsave_status"
        />
        <InfoCard title="Key 数量" :value="dbSize" />
        <InfoCard
          title="网络入口/出口"
          :value="`${formatBytes(
            redisInfo.total_net_input_bytes
          )} / ${formatBytes(redisInfo.total_net_output_bytes)}`"
        />
      </div>
    </section>

    <!-- 命令统计和内存信息 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- 命令统计 -->
      <section class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="mb-6 text-xl font-semibold text-gray-700">命令统计</h2>
        <div class="h-[400px]">
          <CommandsChart :data="commandStats" />
        </div>
      </section>

      <!-- 内存信息 -->
      <section class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="mb-6 text-xl font-semibold text-gray-700">内存信息</h2>
        <div class="h-[400px]">
          <MemoryChart :data="memoryInfo" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import InfoCard from "@/components/InfoCard.vue";
import CommandsChart from "@/components/CommandsChart.vue";
import MemoryChart from "@/components/MemoryChart.vue";
import property from "@/api/property/property";

interface RedisInfo {
  redis_version: string;
  redis_mode: string;
  tcp_port: string;
  connected_clients: string;
  uptime_in_seconds: string;
  used_memory_human: string;
  used_cpu_sys: string;
  maxmemory_human: string;
  aof_enabled: string;
  rdb_last_bgsave_status: string;
  total_net_input_bytes: string;
  total_net_output_bytes: string;
  used_memory: string;
  used_memory_peak: string;
  used_memory_lua: string;
  used_memory_scripts: string;
  maxmemory: string;
}

const redisInfo = ref<RedisInfo>({
  redis_version: "5.0.14.1",
  redis_mode: "standalone",
  tcp_port: "6379",
  connected_clients: "1",
  uptime_in_seconds: "978",
  used_memory_human: "717.95K",
  used_cpu_sys: "0.015625",
  maxmemory_human: "0B",
  aof_enabled: "0",
  rdb_last_bgsave_status: "ok",
  total_net_input_bytes: "1982",
  total_net_output_bytes: "8899",
  used_memory: "735176",
  used_memory_peak: "735176",
  used_memory_lua: "37888",
  used_memory_scripts: "0",
  maxmemory: "0",
});

const commandStats = ref([
  { name: "set", value: 1 },
  { name: "pexpire", value: 1 },
  { name: "ping", value: 1 },
  { name: "get", value: 14 },
  { name: "ttl", value: 2 },
  { name: "info", value: 5 },
  { name: "dbsize", value: 2 },
  { name: "setex", value: 2 },
]);

const dbSize = ref(14);

const memoryInfo = computed(() => [
  { name: "已用内存", value: parseInt(redisInfo.value.used_memory) },
  { name: "峰值内存", value: parseInt(redisInfo.value.used_memory_peak) },
  { name: "Lua内存", value: parseInt(redisInfo.value.used_memory_lua) },
  { name: "缓存内存", value: parseInt(redisInfo.value.used_memory_scripts) },
  {
    name: "空闲内存",
    value: Math.max(
      0,
      parseInt(redisInfo.value.maxmemory) -
        parseInt(redisInfo.value.used_memory)
    ),
  },
]);

function formatUptime(seconds: string): string {
  const totalSeconds = parseInt(seconds);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}天 ${hours}小时 ${minutes}分钟`;
}

function formatBytes(bytes: string): string {
  const numBytes = parseInt(bytes);
  if (numBytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));
  return parseFloat((numBytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

onMounted(async () => {
  try {
    console.log("进入");

    const { data } = await property.getRedisMessage(null);
    console.log(data);
    if (data !== null) {
      commandStats.value = data.commandStats;
      redisInfo.value = data.info;
    }
  } catch (error) {
    console.error("Error fetching system info:", error);
  }
});
</script>

<style scoped>
.redis-monitor {
  max-width: 1400px;
  margin: 0 auto;
}

.info-card {
  min-height: 100px;
}
</style>
