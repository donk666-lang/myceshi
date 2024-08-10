<template>
  <div class="box">
    <div class="search">
      <el-select
        v-model="selectedTitles"
        size="large"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入查询内容"
        style="width: 40%"
        @input="handleInput"
      >
        <el-option
          v-for="item in dataArray"
          :key="item.id"
          :label="item.title"
          :value="item.title"
        />
      </el-select>
      <el-button type="primary" size="large" :icon="Search" @click="handleSearch" />
    </div>
    <div class="list">
      <div v-for="item in paginatedData" :key="item.id">
        <el-card style="margin: 20px 0" @click="onList(item)">
          <template #header>{{ item.title }}</template>
          <div class="listMain">
            <div class="listText">
              <div class="content">{{ item.content }}</div>
              <div>{{ item.time }}</div>
            </div>
            <div class="image-container">
              <img
                v-if="item.isLoaded"
                :src="item.img"
                class="loaded-image"
              />
              <img
                v-else
                src="../../assets/images/lodding.png"
                class="loading-image"
              />
            </div>
          </div>
        </el-card>
      </div>
      <div v-if="loading" class="loading">加载中...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import dataArray from '../../components/data';
import { DataItem } from '../../components/data';
import { useRouter } from 'vue-router';
const router = useRouter();

const pageSize = 6; // 初始加载的条目数
const currentPage = ref(1); // 当前页
const selectedTitles = ref<string[]>([]);
const filterKeyword = ref<string>('');
const loading = ref(false);
const items = ref<DataItem[]>([]); // 当前显示的数据项

const handleInput = () => {
  if (selectedTitles.value.length === 0) {
    filterKeyword.value = '';
  } else {
    filterKeyword.value = selectedTitles.value.join(',');
  }
};

const handleSearch = () => {
  if (selectedTitles.value.length === 0) {
    filterKeyword.value = '';
  } else {
    filterKeyword.value = selectedTitles.value.join(',');
  }
  console.log('搜索关键词:', filterKeyword.value);
};

const filteredData = computed(() => {
  if (!filterKeyword.value) {
    return items.value;
  }

  // 根据 selectedTitles 过滤数据
  return items.value.filter((item) =>
    selectedTitles.value.some(title => item.title.includes(title))
  );
});
const onList = (item:any) => {
   // 将 item 对象传递到新的路由
   router.push({
    name: 'demo3', // 替换为你的目标路由名称
    query: { item: JSON.stringify(item) } // 将对象转换为字符串传递
  });
}
const paginatedData = computed(() => {
  const start = 0;
  const end = currentPage.value * pageSize;
  return filteredData.value.slice(start, end);
});

const handleScroll = async () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value) {
    loading.value = true;
    await nextTick();
    loadMoreData();
    loading.value = false;
  }
};

const loadMoreData = async () => {
  const nextPageItems = dataArray.slice(currentPage.value * pageSize, (currentPage.value + 1) * pageSize);
  items.value.push(...nextPageItems);
  await preloadImages(nextPageItems);
  currentPage.value += 1;
};

const preloadImages = async (itemsToLoad: DataItem[]) => {
  const promises = itemsToLoad.map(item => simulateImageLoading(item));
  await Promise.all(promises);
};

// 模拟图片加载
const simulateImageLoading = (item: DataItem) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      item.isLoaded = true;
      resolve();
    }, 3000); // 延迟3秒
  });
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  loadMoreData();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@import '../../assets/css/index.scss';

.listMain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.content {
  width: 100%; /* 设置你想要的宽度 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.loading {
  text-align: center;
  padding: 10px;
}

.loaded-image {
  width: 100%; /* 你可以根据需要设置图片的样式 */
}

.loading-image {
  width: 100%; /* 你可以根据需要设置占位图片的样式 */
}

</style>
