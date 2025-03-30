<!-- 演示时必须单击页面进入全屏模式 -->
<template>
  <div>
    <dv-full-screen-container>
      <blank-component />
    </dv-full-screen-container>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import screenfull from 'screenfull'
import BlankComponent from '@/components/BlankComponent'
export default {
  name: 'Dashboard',
  components: {
    BlankComponent
  },
  data() {
    return {

    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
// css 非特殊情况，严格使用百分比和 flex 布局，实现较强的分辨率适配性!
#dv-full-screen-container {
  background-image: url("~@/assets/dashboard/bg.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  color: #fff; // 先默认白色文字
}
</style>
