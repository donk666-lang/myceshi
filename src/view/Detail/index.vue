<template>
    <div class="detailBox">
        <h2>
            {{ listDetail.title }}
        </h2>
        <div class="time">
            {{ listDetail.time }}
        </div>
        <div>
            <img src="../../assets/images/logo.png" style="width: 100%;height: 300px;">
        </div>
        <div class="time">
            {{ listDetail.content }}
        </div>
        <div class="video">
            <video width="420" height="240" controls>
            <source src="../../assets/images/rain.mp4" type="video/mp4">
            Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted,ref} from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const listDetail:any = ref('')
onMounted(() => {
  if (route.params) {
    console.log(route.query,'route.params')
    listDetail.value = JSON.parse(route.query.item)
    console.log(listDetail.value,'listDetail.value')
  }
});
</script>
<style lang="scss" scoped>
.detailBox{
    width: 65%;
    margin: 10px auto;
    .time{
        margin: 30px 0;
    }
    .video{
        width: 100%; // Make the video container take up 100% of the parent's width
        height: auto; // Adjust the height automatically to maintain aspect ratio
        position: relative;
        padding-bottom: 56.25%; // 16:9 aspect ratio (height / width = 9 / 16 = 0.5625)
        overflow: hidden;
        margin: 40px 0;
        
        video{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>