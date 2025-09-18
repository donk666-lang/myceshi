<template>
  <div class="app" id="app">
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'App',
  setup() {
 

    onMounted(() => {

    })

    return {
     
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
}
</style>
