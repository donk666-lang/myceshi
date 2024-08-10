<template>
    <div>
        <el-menu default-active="2" mode="horizontal" :style="showNav?'width: 870px':'width:420px'">
            <el-sub-menu index="1">
              <template #title>
                <span>サービス</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">サービス一覧</el-menu-item>
                <el-menu-item index="1-2">ComiruBASIC</el-menu-item>
                <el-menu-item index="1-3">ComiruFREE</el-menu-item>
                <el-menu-item index="1-4">ComiruAir</el-menu-item>
                <el-menu-item index="1-5">ComiruHR</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
              プラン一覧
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <span>基本機能</span>
              </template>
              <el-menu-item-group>
                <el-sub-menu index="2-1">
                  <template #title>Comiru</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2-2">
                  <template #title>ComiruAir</template>
                  <el-menu-item index="2-2-1">専用アプリ&LNE連携</el-menu-item>
                  <el-menu-item index="2-2-2">指導報告書</el-menu-item>
                  <el-menu-item index="2-2-3">お知らせ</el-menu-item>
                  <el-menu-item index="2-2-4">入退室管理</el-menu-item>
                  <el-menu-item index="2-2-5">請求書</el-menu-item>
                  <el-menu-item index="2-2-6">口座振替</el-menu-item>
                  <el-menu-item index="2-2-7">カ-ド決済</el-menu-item>
                  <el-menu-item index="2-2-8">成績管理</el-menu-item>
                  <el-menu-item index="2-2-9">座席管理</el-menu-item>
                  <el-menu-item index="2-2-10">見込顧客獲得</el-menu-item>
                  <el-menu-item index="2-2-11">Web申込み</el-menu-item>
                  <el-menu-item index="2-2-12">口コミ収集&掲載</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2-3">
                  <template #title>ComiruHR</template>
                  <el-menu-item index="1-4-1">講師人事労務管理</el-menu-item>
                </el-sub-menu>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="4" v-show="showNav">
              導入事例
            </el-menu-item>
            <el-menu-item index="5" v-show="showNav">
              お役立ち資料
            </el-menu-item>
            <el-menu-item index="6" v-show="showNav">
              セミナー一覧
            </el-menu-item>
            <el-sub-menu index="7" v-show="showNav">
              <template #title>
                <span>ヘルプ</span>
              </template>
              <el-menu-item-group>
                <el-sub-menu index="7-1">
                  <template #title>Comiru</template>
                  <el-menu-item index="7-1-1">導入までの流れ</el-menu-item>
                  <el-menu-item index="7-1-2">よくある質問</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="7-2">
                  <template #title>Comiru</template>
                  <el-menu-item index="1-4-1">よくある質問</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="7-3">
                  お問い合わせ
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
    </div>
</template>
<script lang="ts" setup>
import { onMounted,ref } from 'vue';
import { watch,defineProps } from 'vue';
const props = defineProps<{
    showMenuList: any
}>();
const showNav = ref(true)
// watch(props.showMenaList,(newVal)=> {
//     showNav.value = newVal
// })
watch(
  () => props.showMenuList,
  (newVal) => {
    showNav.value = newVal;
  },
  { immediate: true }
);
onMounted(() => {
    console.log(props,'props')
})
</script>
<style lang="scss" scoped>
.el-menu--horizontal.el-menu {
  border-bottom: none;
}

</style>