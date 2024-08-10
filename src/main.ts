// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueLazyload from 'vue-lazyload';
import loddingImg from '../src/assets/images/lodding.png';
import eorrImg from '../src/assets/images/eorr.png';
import 'vue-masonry-css';
const app = createApp(App);

app.use(router);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(VueLazyload, {
  preLoad: 1.3,
  error: eorrImg,
  loading: loddingImg,
  attempt: 1,
});

app.mount('#app');




