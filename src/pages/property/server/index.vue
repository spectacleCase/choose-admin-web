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
    total: 120.0,
    max: 4006.0,
    free: 29.35,
    version: "17.0.5",
    home: "C:\\Customize\\Dev\\jdk-17.0.5",
    name: "Java HotSpot(TM) 64-Bit Server VM",
    startTime: "2024-09-25 15:55:56",
    usage: 75.54,
    used: 90.65,
    runTime: "0天4小时51分钟",
    inputArgs:
      "[-agentlib:jdwp=transport=dt_socket,address=127.0.0.1:2470,suspend=y,server=n, -XX:TieredStopAtLevel=1, -Dspring.output.ansi.enabled=always, -Dcom.sun.management.jmxremote, -Dspring.jmx.enabled=true, -Dspring.liveBeansView.mbeanDomain, -Dspring.application.admin.enabled=true, -Dmanagement.endpoints.jmx.exposure.include=*, -javaagent:C:\\Users\\lizhentao\\AppData\\Local\\JetBrains\\IntelliJIdea2024.1\\captureAgent\\debugger-agent.jar=file:/C:/Users/lizhentao/AppData/Local/Temp/capture.props, -Dfile.encoding=UTF-8]",
  },
  mem: {
    total: 15.64,
    used: 15.27,
    free: 0.37,
    usage: 97.65,
  },
  OSHI_WAIT_SECOND: 1000,
  sysFiles: [
    {
      dirName: "C:\\",
      sysTypeName: "NTFS",
      typeName: "本地固定磁盘 (C:)",
      total: "475.8 GB",
      free: "234.4 GB",
      used: "241.4 GB",
      usage: 50.74,
    },
    {
      dirName: "D:\\",
      sysTypeName: "NTFS",
      typeName: "本地固定磁盘 (D:)",
      total: "953.9 GB",
      free: "595.5 GB",
      used: "358.3 GB",
      usage: 37.56,
    },
  ],
  cpu: {
    cpuNum: 16,
    total: 1654700.0,
    sys: 3.78,
    used: 3.4,
    wait: 0.0,
    free: 92.82,
  },
  sys: {
    computerName: "DESKTOP-JDEELJ7",
    computerIp: "192.168.31.109",
    userDir: "D:\\Workspace\\Java\\choose\\choose-admin",
    osName: "Windows 11",
    osArch: "amd64",
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
