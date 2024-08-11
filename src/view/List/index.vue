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
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        background
        :page-size="pageSize"
        :total="totalItems"
        layout="total, prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';
import dataArray, { DataItem } from '../../components/data';
import { useRouter } from 'vue-router';

const router = useRouter();
const pageSize = 6; // 每页显示的条目数
const currentPage = ref(1); // 当前页
const selectedTitles = ref<string[]>([]);
const filterKeyword = ref<string>('');
const loading = ref(false);
const items = ref<DataItem[]>(dataArray); // 使用全部数据
const totalItems = computed(() => filteredData.value.length); // 总条目数

const handleInput = () => {
  filterKeyword.value = selectedTitles.value.join(',');
};

const handleSearch = async () => {
  filterKeyword.value = selectedTitles.value.join(',');
  console.log('搜索关键词:', filterKeyword.value);

  // 在搜索后预加载图片
  await preloadImages(filteredData.value);
};

const filteredData = computed(() => {
  if (selectedTitles.value.length === 0) {
    // 如果搜索框为空数组，则返回全部数据
    return items.value;
  }

  // 根据 selectedTitles 过滤数据
  return items.value.filter((item) =>
    selectedTitles.value.some(title => item.title.includes(title))
  );
});

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await nextTick();
  const currentPageItems = paginatedData.value;
  await preloadImages(currentPageItems);
};

const onList = (item: any) => {
  // 通过ID跳转到详情页面
  router.push({
    name: 'demo3',
    query: { id: item.id }
  });
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = currentPage.value * pageSize;
  return filteredData.value.slice(start, end);
});

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
  // 初次加载时不需要进行任何操作，因为 items 已经包含了全部数据
  await preloadImages(paginatedData.value);
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
.pagination{
  margin: 20px auto;width: 50%;
}
@media screen and (max-width: 999px) {
      .pagination {
        width: 98%; /* 当宽度小于999px时，列表宽度设置为98% */
        margin: 0 auto; /* 居中对齐 */
      }
    }
.content {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.loaded-image {
  width: 100%;
}

.loading-image {
  width: 100%;
}

</style>
