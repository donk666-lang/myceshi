import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './styles/global.scss'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue全局错误:', err, info)
}

// 全局警告处理
app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Vue警告:', msg, trace)
}

// 未捕获的Promise拒绝处理
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的Promise拒绝:', event.reason)
  
  // 阻止错误传播到控制台
  event.preventDefault()
})

// 全局错误处理
window.addEventListener('error', event => {
  console.error('全局JavaScript错误:', event.error)
})

app.use(router)
app.use(i18n)

// 安全挂载应用
try {
  app.mount('#app')
  console.log('Vue应用挂载成功')
} catch (error) {
  console.error('Vue应用挂载失败:', error)
  
  // 显示用户友好的错误信息
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #1a1a1a; color: white; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h2>应用启动失败</h2>
        <p>请尝试重新启动应用</p>
        <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px; background: #007acc; color: white; border: none; border-radius: 5px; cursor: pointer;">
          重新加载
        </button>
      </div>
    </div>
  `
} 