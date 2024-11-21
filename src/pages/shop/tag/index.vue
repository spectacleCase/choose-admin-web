<template>
  <div class="p-6 bg-gray-100">
    <h1 class="mb-6 text-2xl font-bold text-gray-800">标签管理</h1>

    <!-- 添加标签表单 -->
    <div class="mb-6 bg-white rounded-lg shadow-md p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">添加新标签</h2>
      <form @submit.prevent="addTag" class="space-y-4">
        <div>
          <label for="tagName" class="block text-sm font-medium text-gray-700">标签名称</label>
          <input v-model="newTag.name" type="text" id="tagName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="storeAddress" class="block text-sm font-medium text-gray-700">店铺地址</label>
          <input v-model="newTag.parenttag" type="text" id="storeAddress"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          添加标签
        </button>
      </form>
    </div>

    <!-- 查找功能 -->
    <div class="mb-6 bg-white rounded-lg shadow-md p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">查找标签</h2>
      <div class="flex space-x-4">
        <input v-model="searchTerm" type="text" placeholder="输入店铺名称或地址"
          class="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button @click="searchTags"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          查找
        </button>
      </div>
    </div>

    <!-- 标签列表 -->
    <div class="bg-white rounded-lg shadow-md">
      <div class="p-4 border-b">
        <h2 class="text-xl font-semibold text-gray-700">标签列表</h2>
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
            <tr v-for="tag in paginatedTags" :key="tag.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ tag.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ tag.parentId }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ tag.status }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editTag(tag)" class="text-indigo-600 hover:text-indigo-900 mr-2">编辑</button>
                <button @click="deleteTag(tag.id)" class="text-red-600 hover:text-red-900">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页控件 -->
      <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            上一页
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
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
              <button @click="prevPage" :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">上一页</span>
                <!-- 左箭头图标 -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              ]">
                {{ page }}
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">下一页</span>
                <!-- 右箭头图标 -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑标签弹窗 -->
    <div v-if="editingTag"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-96">
        <h3 class="text-lg font-semibold mb-4">编辑标签</h3>
        <form @submit.prevent="updateTag" class="space-y-4">
          <div>
            <label for="editTagName" class="block text-sm font-medium text-gray-700">标签名称</label>
            <input v-model="editingTag.name" type="text" id="editTagName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div>
            <label for="editTagParentId" class="block text-sm font-medium text-gray-700">店铺地址</label>
            <input v-model="editingTag.parentId" type="text" id="editTagParentId"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelEdit"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              取消
            </button>
            <button type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRaw, computed } from 'vue'

interface Tag {
  id: number
  name: string
  parentId: number
  status: number
}
const tags = reactive([
  { id: 1, name: '标签1', parentId: 0, status: 0 },
  { id: 2, name: '标签2', parentId: 0, status: 0 },
  { id: 3, name: '标签3', parentId: 0, status: 0 },
  { id: 4, name: '标签4', parentId: 0, status: 0 },
  { id: 5, name: '标签5', parentId: 0, status: 0 },
  { id: 6, name: '标签6', parentId: 0, status: 0 },
  { id: 7, name: '标签7', parentId: 0, status: 0 },
]);

const newTag = reactive({
  name: '',
  parentId: 0,
  status: 0
})

const editingTag = ref<Tag | null>(null);

const addTag = () => {
  const id = tags.length + 1
  tags.push({ id, ...newTag });
  newTag.name = '';
  newTag.parentId = 0;
  newTag.status = 0;
}
const editTag = (tag: Tag) => {
  editingTag.value = { ...tag };
};

const updateTag = () => {
  if (editingTag.value) {
    const index = tags.findIndex(s => s.id === editingTag.value!.id);
    if (index !== -1) {
      tags[index] = { ...editingTag.value };
    }
    editingTag.value = null;
  }
};

// 查找功能
const searchTerm = reactive({
  name: '',
  parentId: 0,
  status: 0
})
const toLowerCaseReactiveObject = (obj: any) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].toLowerCase();
    }
    if (typeof obj[key] === 'number') {
      obj[key] = obj[key].toString().toLowerCase();
    }
  }
  return obj;
};

const filteredTags = computed(() => {
  if (!searchTerm) return tags;
  const lowercasedTerm = toLowerCaseReactiveObject(toRaw(searchTerm));
  return tags.filter(tag =>
    tag.name.toLowerCase().includes(lowercasedTerm.name) ||
    tag.parentId.toString().toLowerCase().includes(lowercasedTerm.parentId)
  );
});

const searchTags = () => {
  currentPage.value = 1; // 重置到第一页
};

// 分页相关的状态
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = computed(() => filteredTags.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

// 计算当前页面显示的标签列表
const paginatedTags = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTags.value.slice(start, end);
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
  editingTag.value = null;
};

const deleteTag = (id: number) => {
  tags.splice(tags.findIndex(tag => tag.id === id), 1);
};
</script>
