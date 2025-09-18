<template>
  <div class="language-switcher">
    <button
      class="language-btn"
      @click="toggleLanguage"
      :title="$t('language.switch')"
    >
      <!-- <span class="language-icon">🌐</span> -->
      <span class="language-text">{{ displayText }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const isHovered = ref(false)

// 可切换到的目标语言显示文本
const currentLanguageDisplay = computed(() => {
  return locale.value === 'en' ? '日本語' : 'English'
})

// 悬停时的提示文字
const hoverText = computed(() => {
  return locale.value === 'en' ? 'Switch to Japanese' : '英語に切り替え'
})

// 显示的文字（正常状态显示目标语言，悬停时显示提示）
const displayText = computed(() => {
  return isHovered.value ? hoverText.value : currentLanguageDisplay.value
})

// 切换语言
const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ja' : 'en'
  locale.value = newLocale
  
  // 保存到localStorage
  localStorage.setItem('locale', newLocale)
  
  // 可以添加切换动画或提示
  console.log(`Language switched to: ${newLocale}`)
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.language-btn:active {
  transform: translateY(0);
}

.language-icon {
  font-size: 16px;
}

.language-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
  transition: opacity 0.2s ease, transform 0.2s ease;
  min-width: 80px;
  text-align: center;
}

.language-btn:hover .language-text {
  opacity: 0.9;
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .language-btn {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  .language-icon {
    font-size: 14px;
  }
}

/* 深色主题适配 */
@media (prefers-color-scheme: dark) {
  .language-btn {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .language-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
