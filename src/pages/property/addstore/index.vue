<template>
    <div class="p-6 bg-gray-100">
      <h1 class="mb-6 text-2xl font-bold text-gray-800">店铺管理</h1>
      
      <!-- 添加店铺表单 -->
      <div class="mb-6 bg-white rounded-lg shadow-md p-4">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">添加新店铺</h2>
        <form @submit.prevent="addStore" class="space-y-4">
          <div>
            <label for="storeName" class="block text-sm font-medium text-gray-700">店铺名称</label>
            <input v-model="newStore.name" type="text" id="storeName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div>
            <label for="storeAddress" class="block text-sm font-medium text-gray-700">店铺地址</label>
            <input v-model="newStore.address" type="text" id="storeAddress" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            添加店铺
          </button>
        </form>
      </div>
      
      <!-- 查找功能 -->
      <div class="mb-6 bg-white rounded-lg shadow-md p-4">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">查找店铺</h2>
        <div class="flex space-x-4">
          <input v-model="searchTerm" type="text" placeholder="输入店铺名称或地址" class="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <button @click="searchStores" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            查找
          </button>
        </div>
      </div>
      
      <!-- 店铺列表 -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-4 border-b">
          <h2 class="text-xl font-semibold text-gray-700">店铺列表</h2>
        </div>
        <div class="p-4">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">店铺名称</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地址</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="store in paginatedStores" :key="store.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ store.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ store.address }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editStore(store)" class="text-indigo-600 hover:text-indigo-900 mr-2">编辑</button>
                  <button @click="deleteStore(store.id)" class="text-red-600 hover:text-red-900">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页控件 -->
        <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              上一页
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              下一页
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示第 
                <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                到
                <span class="font-medium">{{ Math.min(currentPage * pageSize, totalItems) }}</span>
                条，共
                <span class="font-medium">{{ totalItems }}</span>
                条结果
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">上一页</span>
                  <!-- 左箭头图标 -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                  page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                ]">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">下一页</span>
                  <!-- 右箭头图标 -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 编辑店铺弹窗 -->
      <div v-if="editingStore" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-5 rounded-lg shadow-xl w-96">
          <h3 class="text-lg font-semibold mb-4">编辑店铺</h3>
          <form @submit.prevent="updateStore" class="space-y-4">
            <div>
              <label for="editStoreName" class="block text-sm font-medium text-gray-700">店铺名称</label>
              <input v-model="editingStore.name" type="text" id="editStoreName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div>
              <label for="editStoreAddress" class="block text-sm font-medium text-gray-700">店铺地址</label>
              <input v-model="editingStore.address" type="text" id="editStoreAddress" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="cancelEdit" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                取消
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  
  interface Store {
    id: number;
    name: string;
    address: string;
  }
  
  const stores = ref<Store[]>([
    { id: 1, name: '示例店铺1', address: '示例地址1' },
    { id: 2, name: '示例店铺2', address: '示例地址2' },
    { id: 3, name: '示例店铺3', address: '示例地址3' },
    { id: 4, name: '示例店铺4', address: '示例地址4' },
    { id: 5, name: '示例店铺5', address: '示例地址5' },
    { id: 6, name: '示例店铺6', address: '示例地址6' },
    { id: 7, name: '示例店铺7', address: '示例地址7' },
    { id: 8, name: '示例店铺8', address: '示例地址8' },
    { id: 9, name: '示例店铺9', address: '示例地址9' },
    { id: 10, name: '示例店铺10', address: '示例地址10' },
    { id: 11, name: '示例店铺11', address: '示例地址11' },
    { id: 12, name: '示例店铺12', address: '示例地址12' },
    { id: 13, name: '示例店铺13', address: '示例地址13' },
    { id: 14, name: '示例店铺14', address: '示例地址14' },
    { id: 15, name: '示例店铺15', address: '示例地址15' },
  ]);
  
  const newStore = reactive({
    name: '',
    address: '',
  });
  
  const editingStore = ref<Store | null>(null);
  
  const addStore = () => {
    const id = stores.value.length + 1;
    stores.value.push({ id, ...newStore });
    newStore.name = '';
    newStore.address = '';
  };
  
  const editStore = (store: Store) => {
    editingStore.value = { ...store };
  };
  
  const updateStore = () => {
    if (editingStore.value) {
      const index = stores.value.findIndex(s => s.id === editingStore.value!.id);
      if (index !== -1) {
        stores.value[index] = { ...editingStore.value };
      }
      editingStore.value = null;
    }
  };
  
  // 查找功能
  const searchTerm = ref('');
  const filteredStores = computed(() => {
    if (!searchTerm.value) return stores.value;
    const lowercasedTerm = searchTerm.value.toLowerCase();
    return stores.value.filter(store => 
      store.name.toLowerCase().includes(lowercasedTerm) || 
      store.address.toLowerCase().includes(lowercasedTerm)
    );
  });
  
  const searchStores = () => {
    currentPage.value = 1; // 重置到第一页
  };
  
  // 分页相关的状态
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalItems = computed(() => filteredStores.value.length);
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
  
  // 计算当前页面显示的店铺列表
  const paginatedStores = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredStores.value.slice(start, end);
  });
  
  // 翻页函数
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  // 上一页
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  // 下一页
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const cancelEdit = () => {
    editingStore.value = null;
  };
  
  const deleteStore = (id: number) => {
    stores.value = stores.value.filter(store => store.id !== id);
  };
  </script>
  
  <style scoped>
  /* 可以添加额外的样式 */
  </style>
  