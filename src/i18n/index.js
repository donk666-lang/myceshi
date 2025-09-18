import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import ja from './locales/ja.js'

// 获取浏览器语言设置
function getDefaultLocale() {
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('ja')) return 'ja'
  return 'en'
}

// 从localStorage获取保存的语言设置，如果没有则使用浏览器默认语言
const savedLocale = localStorage.getItem('locale') || getDefaultLocale()

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: savedLocale, // 默认语言
  fallbackLocale: 'en', // 备用语言
  globalInjection: true, // 全局注入 $t 函数
  messages: {
    en,
    ja
  }
})

export default i18n
