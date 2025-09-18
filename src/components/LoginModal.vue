<template>
  <div class="login-modal-overlay" @click="handleOverlayClick">
    <div class="login-modal" @click.stop>
      <div class="modal-header">
        <h2>{{ isLoginMode ? '用户登录' : '用户注册' }}</h2>
        <button class="close-button" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <!-- 登录表单 -->
        <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="username">用户名或邮箱</label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              placeholder="请输入用户名或邮箱"
              :disabled="loading"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password">密码</label>
            <div class="password-input">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                :disabled="loading"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :disabled="loading"
              >
                <svg v-if="showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="loginForm.rememberMe"
                type="checkbox"
                :disabled="loading"
              />
              <span class="checkmark"></span>
              记住我
            </label>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? '登录中...' : '登录' }}
          </button>
          
          <div class="form-footer">
            <p>
              还没有账号？
              <button type="button" class="link-button" @click="switchMode" :disabled="loading">
                立即注册
              </button>
            </p>
          </div>
        </form>
        
        <!-- 注册表单 -->
        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label for="reg-username">用户名</label>
            <input
              id="reg-username"
              v-model="registerForm.username"
              type="text"
              placeholder="请输入用户名"
              :disabled="loading"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="reg-email">邮箱</label>
            <input
              id="reg-email"
              v-model="registerForm.email"
              type="email"
              placeholder="请输入邮箱地址"
              :disabled="loading"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="reg-name">姓名</label>
            <input
              id="reg-name"
              v-model="registerForm.name"
              type="text"
              placeholder="请输入真实姓名（可选）"
              :disabled="loading"
            />
          </div>
          
          <div class="form-group">
            <label for="reg-password">密码</label>
            <div class="password-input">
              <input
                id="reg-password"
                v-model="registerForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码（至少6位）"
                :disabled="loading"
                required
                minlength="6"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :disabled="loading"
              >
                <svg v-if="showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label for="reg-confirm-password">确认密码</label>
            <div class="password-input">
              <input
                id="reg-confirm-password"
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="请再次输入密码"
                :disabled="loading"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
                :disabled="loading"
              >
                <svg v-if="showConfirmPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="registerForm.agreeTerms"
                type="checkbox"
                :disabled="loading"
                required
              />
              <span class="checkmark"></span>
              我同意<button type="button" class="link-button">用户协议</button>和<button type="button" class="link-button">隐私政策</button>
            </label>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="submit-button" :disabled="loading || !registerForm.agreeTerms">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? '注册中...' : '注册' }}
          </button>
          
          <div class="form-footer">
            <p>
              已有账号？
              <button type="button" class="link-button" @click="switchMode" :disabled="loading">
                立即登录
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { login, register } from '../services/auth.js'

// 组件事件
const emit = defineEmits(['close', 'login-success', 'register-success'])

// 组件属性
const props = defineProps({
  initialMode: {
    type: String,
    default: 'login', // 'login' 或 'register'
    validator: (value) => ['login', 'register'].includes(value)
  }
})

// 响应式数据
const isLoginMode = ref(props.initialMode === 'login')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// 监听模式切换，清除错误信息
watch(isLoginMode, () => {
  error.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
})

// 切换登录/注册模式
const switchMode = () => {
  isLoginMode.value = !isLoginMode.value
}

// 处理遮罩层点击
const handleOverlayClick = () => {
  emit('close')
}

// 处理登录
const handleLogin = async () => {
  if (loading.value) return
  
  error.value = ''
  loading.value = true
  
  try {
    // 基本验证
    if (!loginForm.username.trim()) {
      throw new Error('请输入用户名或邮箱')
    }
    
    if (!loginForm.password.trim()) {
      throw new Error('请输入密码')
    }
    
    // 调用登录API
    const result = await login({
      username: loginForm.username.trim(),
      password: loginForm.password
    })
    
    if (result.success) {
      // 登录成功
      emit('login-success', result.user)
      emit('close')
      
      // 清空表单
      loginForm.username = ''
      loginForm.password = ''
      loginForm.rememberMe = false
    } else {
      error.value = result.message || '登录失败'
    }
  } catch (err) {
    console.error('登录错误:', err)
    error.value = err.message || '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 处理注册
const handleRegister = async () => {
  if (loading.value) return
  
  error.value = ''
  loading.value = true
  
  try {
    // 基本验证
    if (!registerForm.username.trim()) {
      throw new Error('请输入用户名')
    }
    
    if (!registerForm.email.trim()) {
      throw new Error('请输入邮箱地址')
    }
    
    if (!registerForm.password.trim()) {
      throw new Error('请输入密码')
    }
    
    if (registerForm.password.length < 6) {
      throw new Error('密码长度至少6位')
    }
    
    if (!registerForm.confirmPassword.trim()) {
      throw new Error('请确认密码')
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      throw new Error('两次输入的密码不一致')
    }
    
    if (!registerForm.agreeTerms) {
      throw new Error('请同意用户协议和隐私政策')
    }
    
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerForm.email)) {
      throw new Error('请输入有效的邮箱地址')
    }
    
    // 用户名格式验证（只允许字母、数字、下划线，3-20位）
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    if (!usernameRegex.test(registerForm.username)) {
      throw new Error('用户名只能包含字母、数字、下划线，长度3-20位')
    }
    
    // 调用注册API
    const result = await register({
      username: registerForm.username.trim(),
      email: registerForm.email.trim(),
      name: registerForm.name.trim() || registerForm.username.trim(),
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword
    })
    
    if (result.success) {
      // 注册成功
      emit('register-success', result.user)
      emit('close')
      
      // 清空表单
      registerForm.username = ''
      registerForm.email = ''
      registerForm.name = ''
      registerForm.password = ''
      registerForm.confirmPassword = ''
      registerForm.agreeTerms = false
    } else {
      error.value = result.message || '注册失败'
    }
  } catch (err) {
    console.error('注册错误:', err)
    error.value = err.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.login-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.2s;
}

.close-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: white;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input:disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 4px;
  transition: color 0.2s;
}

.password-toggle:hover:not(:disabled) {
  color: #374151;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin: 0;
}

.submit-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-footer {
  text-align: center;
  margin-top: 8px;
}

.form-footer p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: inherit;
  text-decoration: underline;
  padding: 0;
  margin: 0 2px;
  transition: color 0.2s;
}

.link-button:hover:not(:disabled) {
  color: #2563eb;
}

.link-button:disabled {
  color: #9ca3af;
  cursor: not-allowed;
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-modal {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header,
  .modal-body {
    padding: 16px;
  }
  
  .modal-header h2 {
    font-size: 18px;
  }
}
</style>