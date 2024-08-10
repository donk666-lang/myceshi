import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
  },
  css: {// 引入全局的css
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/assets/style/main.scss";'
      }
    }
  },
  //启动服务配置
  server: {
    port: 8000,
    open: false,
    https: false,
    proxy: {
      '/api': {
        // target:'http://115.159.151.244:3000',
        target:'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
    },
    }
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  define: {
    'process.env': {}
  }
})
