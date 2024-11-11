<template>
  <div class="p-6 bg-gray-100 performance-monitor">
    <h1 class="mb-8 text-3xl font-bold text-gray-800">性能监视</h1>

    <!-- CPU和内存信息 -->
    <div class="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-2">
      <!-- CPU 信息 -->
      <section class="p-6 bg-white rounded-lg shadow-md min-h-[300px]">
        <h2 class="mb-4 text-xl font-semibold text-gray-700">CPU 信息</h2>
        <div class="grid grid-cols-2 gap-4">
          <InfoCard title="核心数" :value="data.cpu.cpuNum" />
          <InfoCard
            title="用户使用率"
            :value="`${data.cpu.used}%`"
            :threshold="90"
          />
          <InfoCard
            title="系统使用率"
            :value="`${data.cpu.sys}%`"
            :threshold="90"
          />
          <InfoCard title="当前空闲率" :value="`${data.cpu.free}%`" />
        </div>
      </section>

      <!-- 内存信息 -->
      <section class="p-6 bg-white rounded-lg shadow-md min-h-[300px]">
        <h2 class="mb-4 text-xl font-semibold text-gray-700">内存信息</h2>
        <div class="grid grid-cols-2 gap-4">
          <InfoCard title="总内存" :value="`${data.mem.total} GB`" />
          <InfoCard title="已用内存" :value="`${data.mem.used} GB`" />
          <InfoCard title="剩余内存" :value="`${data.mem.free} GB`" />
          <InfoCard
            title="使用率"
            :value="`${data.mem.usage}%`"
            :threshold="90"
          />
        </div>
      </section>
    </div>

    <!-- 服务器和JVM信息 -->
    <div class="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-2">
      <!-- 服务器信息 -->
      <section class="p-6 bg-white rounded-lg shadow-md min-h-[300px]">
        <h2 class="mb-4 text-xl font-semibold text-gray-700">服务器信息</h2>
        <div class="grid grid-cols-2 gap-4">
          <InfoCard title="服务器名称" :value="data.sys.computerName" />
          <InfoCard title="操作系统" :value="data.sys.osName" />
          <InfoCard title="服务器IP" :value="data.sys.computerIp" />
          <InfoCard title="系统架构" :value="data.sys.osArch" />
        </div>
      </section>

      <!-- Java虚拟机信息 -->
      <section class="p-6 bg-white rounded-lg shadow-md min-h-[300px]">
        <h2 class="mb-4 text-xl font-semibold text-gray-700">Java虚拟机信息</h2>
        <div class="grid grid-cols-2 gap-4">
          <InfoCard title="Java名称" :value="data.jvm.name" />
          <InfoCard title="Java版本" :value="data.jvm.version" />
          <InfoCard title="启动时间" :value="data.jvm.startTime" />
          <InfoCard title="运行时间" :value="data.jvm.runTime" />
        </div>
      </section>
    </div>

    <!-- 磁盘状态 -->
    <section class="p-6 mb-10 bg-white rounded-lg shadow-md">
      <h2 class="mb-6 text-2xl font-semibold text-gray-700">磁盘状态</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="disk in data.sysFiles"
          :key="disk.dirName"
          class="p-4 bg-gray-50 rounded-lg shadow min-h-[250px]"
        >
          <h3 class="mb-4 text-lg font-semibold text-gray-600">
            {{ disk.typeName }}
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <InfoCard title="盘符路径" :value="disk.dirName" />
            <InfoCard title="文件系统" :value="disk.sysTypeName" />
            <InfoCard title="总大小" :value="disk.total" />
            <InfoCard title="可用大小" :value="disk.free" />
            <InfoCard title="已用大小" :value="disk.used" />
            <InfoCard
              title="已用百分比"
              :value="`${disk.usage}%`"
              :threshold="90"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import InfoCard from "@/components/InfoCard.vue";
import property from "@/api/property/property";

// 模拟从服务器获取数据
const data = ref({
  jvm: {
    total: 0,
    max: 0,
    free: 0,
    version: "",
    home: "",
    name: "",
    startTime: "",
    usage: 0,
    used: 0,
    runTime: "",
    inputArgs: "",
  },
  mem: {
    total: 0,
    used: 0,
    free: 0,
    usage: 0,
  },
  OSHI_WAIT_SECOND: 0,
  sysFiles: [
    {
      dirName: "",
      sysTypeName: "",
      typeName: "",
      total: "",
      free: "",
      used: "",
      usage: 0,
    },
    {
      dirName: "",
      sysTypeName: "",
      typeName: "",
      total: "",
      free: "",
      used: "",
      usage: 0,
    },
  ],
  cpu: {
    cpuNum: 0,
    total: 0,
    sys: 0,
    used: 0,
    wait: 0,
    free: 0,
  },
  sys: {
    computerName: "",
    computerIp: "",
    userDir: "",
    osName: "",
    osArch: "",
  },
});
onMounted(async () => {
  try {
    console.log("进入");

    const res = await property.getServerMessage(null);
    console.log(res.data);
    if (data !== null) {
      data.value = res.data;
    }
  } catch (error) {
    console.error("Error fetching system info:", error);
  }
});
</script>

<style scoped>
.performance-monitor {
  max-width: 1400px;
  margin: 0 auto;
}

.info-card {
  min-height: 100px;
}
</style>
