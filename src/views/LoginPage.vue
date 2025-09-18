<template>
  <div class="login-page">
    <!-- 头部导航栏 -->
    <header class="header">
      <div class="header-container">
        <div class="logo" @click="goHome">
          <div class="icon-grid">
            <div class="grid-item blue"></div>
            <div class="grid-item blue"></div>
            <div class="grid-item blue"></div>
            <div class="grid-item blue"></div>
            <div class="grid-item orange"></div>
            <div class="grid-item empty"></div>
            <div class="grid-item blue"></div>
            <div class="grid-item empty"></div>
            <div class="grid-item empty"></div>
          </div>
          <span class="logo-text">bitFlyer</span>
        </div>
        
        <div class="header-actions">
          <div class="price-info">
            <span class="price-label">{{ $t('common.price') }}</span>
            <span class="price-value">16,665,114</span>
            <span class="currency">JPY</span>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="login-container">
        <div class="login-card">
          <!-- 进度条 -->
          <div class="progress-bar">
            <div class="progress-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }"></div>
            <div class="progress-step" :class="{ active: currentStep >= 2 }"></div>
          </div>

          <!-- 登录步骤 -->
          <div v-if="currentStep === 1">
            <!-- 登录标题 -->
            <div class="login-header">
              <div class="lock-icon">🔒</div>
              <h1 class="login-title">{{ $t('user.login') }}</h1>
            </div>

            <!-- 登录表单 -->
            <form class="login-form" @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="emailOrPhone" class="form-label">{{ $t('user.emailOrPhone') }}</label>
                <input 
                  type="text" 
                  id="emailOrPhone"
                  v-model="loginForm.emailOrPhone"
                  class="form-input"
                  :placeholder="$t('user.emailOrPhone')"
                  required
                />
              </div>

              <div class="form-group">
                <label for="password" class="form-label">{{ $t('user.password') }}</label>
                <input 
                  type="password" 
                  id="password"
                  v-model="loginForm.password"
                  class="form-input"
                  required
                />
              </div>

              <button type="submit" class="login-btn">{{ $t('user.login') }}</button>
            </form>

            <!-- 底部链接 -->
            <div class="login-footer">
              <a href="#" class="footer-link">{{ $t('user.forgotPassword') }}</a>
              <a href="#" class="footer-link">{{ $t('user.unableToLogin') }}</a>
              <div class="signup-prompt">
                <span>{{ $t('user.noAccountYet') }} </span>
                <a href="#" class="signup-link">{{ $t('common.createAccount') }}</a>
              </div>
            </div>
          </div>

          <!-- 验证步骤 -->
          <div v-if="currentStep === 2">
            <!-- 验证标题和图标 -->
            <div class="verification-header">
              <div class="verification-icon">
                <div class="phone-icon">
                  📱
                  <div class="shield-icon">🛡️</div>
                </div>
              </div>
              <h1 class="verification-title">{{ $t('user.twoFactorAuth') }}</h1>
              <p class="verification-description">
                {{ verificationType === 'email' ? $t('user.enterEmailCode') : $t('user.enterPhoneCode') }}
              </p>
              <p class="contact-info">
                {{ verificationType === 'email' ? $t('user.sentToEmail') : $t('user.sentToPhone') }}
                <strong>{{ maskedContact }}</strong>
              </p>
            </div>

            <!-- 验证表单 -->
            <form class="verification-form" @submit.prevent="handleVerification">
              <div class="form-group">
                <label for="verificationCode" class="form-label">{{ $t('user.verificationCodePlaceholder') }}</label>
                <input 
                  type="text" 
                  id="verificationCode"
                  v-model="verificationCode"
                  class="form-input verification-input"
                  :placeholder="$t('user.verificationCodePlaceholder')"
                  maxlength="6"
                  required
                />
              </div>

              <!-- 记住设备选项 -->
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="skipNextTime" class="checkbox-input">
                  <span class="checkbox-text">{{ $t('user.skipNextTime') }}</span>
                </label>
              </div>

              <!-- 提交按钮 -->
              <button type="submit" class="login-btn" :disabled="!verificationCode">
                {{ $t('user.confirm') }}
              </button>
            </form>

            <!-- 底部链接 -->
            <div class="verification-footer">
              <a href="#" class="footer-link" @click.prevent="goBackToLogin">{{ $t('common.back') }}</a>
              <a href="#" class="footer-link">{{ $t('user.resendCode') }}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- SSL证书信息 -->
      <div class="ssl-info">
        {{ $t('common.sslCertificates') }}
      </div>
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  name: 'LoginPage',
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      currentStep: 1, // 1: 登录步骤, 2: 验证步骤
      loginForm: {
        emailOrPhone: '',
        password: ''
      },
      verificationCode: '',
      skipNextTime: false,
      verificationType: 'email', // 'email' 或 'phone'
      maskedContact: ''
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleLogin() {
      // 验证输入
      if (!this.loginForm.emailOrPhone || !this.loginForm.password) {
        alert(this.$t('user.pleaseCompleteAllFields'))
        return
      }
      
      // 判断输入类型（邮箱或手机号）
      this.verificationType = this.getInputType(this.loginForm.emailOrPhone)
      this.maskedContact = this.maskContact(this.loginForm.emailOrPhone, this.verificationType)
      
      // 模拟登录成功，进入验证步骤
      console.log('Login attempt:', { 
        emailOrPhone: this.loginForm.emailOrPhone, 
        password: this.loginForm.password,
        inputType: this.verificationType
      })
      
      // 进入验证步骤
      this.currentStep = 2
    },
    handleVerification() {
      if (!this.verificationCode) {
        alert(this.$t('user.pleaseEnterVerificationCode'))
        return
      }

      // 模拟验证成功
      console.log('Verification attempt:', {
        code: this.verificationCode,
        skipNextTime: this.skipNextTime,
        verificationType: this.verificationType,
        contact: this.loginForm.emailOrPhone
      })

      // 验证成功后跳转到主页
      alert(this.$t('user.verificationSuccessful'))
      this.$router.push('/')
    },
    goBackToLogin() {
      this.currentStep = 1
      this.verificationCode = ''
      this.skipNextTime = false
    },
    getInputType(input) {
      // 简单的邮箱验证正则
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // 简单的手机号验证正则（支持中国和日本手机号格式）
      const phoneRegex = /^[\+]?[1-9][\d]{1,14}$|^0[\d]{10,11}$/
      
      if (emailRegex.test(input)) {
        return 'email'
      } else if (phoneRegex.test(input.replace(/[\s\-\(\)]/g, ''))) {
        return 'phone'
      } else {
        return 'email' // 默认为邮箱
      }
    },
    maskContact(contact, type) {
      if (type === 'email') {
        const [username, domain] = contact.split('@')
        const maskedUsername = username.length > 2 
          ? username.substring(0, 2) + '*'.repeat(username.length - 2)
          : username
        return `${maskedUsername}@${domain}`
      } else {
        // 手机号脱敏
        if (contact.length > 6) {
          return contact.substring(0, 3) + '*'.repeat(contact.length - 6) + contact.substring(contact.length - 3)
        }
        return contact
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  min-height: 100vh;
//   background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    background: #f3f3f3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 头部导航栏
.header {
  background: transparent;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
//   max-width: 1400px;
  margin: 0 auto;
  background-color: #468ccb;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    width: 32px;
    height: 32px;
    
    .grid-item {
      width: 100%;
      height: 100%;
      
      &.blue {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 2px;
      }
      
      &.orange {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: #ff9800;
          border-radius: 50%;
        }
      }
      
      &.empty {
        background: transparent;
      }
    }
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;
  
  .price-label {
    opacity: 0.8;
  }
  
  .price-value {
    font-weight: 600;
  }
  
  .currency {
    opacity: 0.8;
  }
}

// 主要内容区域
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  position: relative;
}

.login-container {
  width: 100%;
  max-width: 580px;
  margin-bottom: 2rem;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 3rem 4rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

// 进度条
.progress-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  
  .progress-step {
    width: 200px;
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    transition: background-color 0.3s ease;
    
    &.active {
      background: #4a90e2;
    }
    
    &.completed {
      background: #28a745;
    }
  }
}

// 登录头部
.login-header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  
  .lock-icon {
    font-size: 2.2rem;
    margin-right: 0.75rem;
    opacity: 0.6;
  }
  
  .login-title {
    font-size: 2.2rem;
    font-weight: 400;
    color: #666;
    margin: 0;
  }
}

// 验证头部
.verification-header {
  text-align: center;
  margin-bottom: 3rem;
}

.verification-icon {
  margin-bottom: 1.5rem;
}

.phone-icon {
  font-size: 3rem;
  position: relative;
  display: inline-block;
}

.shield-icon {
  position: absolute;
  font-size: 1.5rem;
  bottom: -5px;
  right: -5px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

.verification-title {
  font-size: 2.2rem;
  font-weight: 400;
  color: #666;
  margin: 0 0 1rem 0;
}

.verification-description {
  font-size: 1rem;
  color: #888;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.contact-info {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  
  strong {
    color: #4a90e2;
  }
}

// 登录表单
.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 0.75rem;
  font-weight: 400;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  &::placeholder {
    color: #ccc;
  }
}

.login-btn {
  width: 100%;
  padding: 1.125rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover:not(:disabled) {
    background: #357abd;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
}

// 验证输入框样式
.verification-input {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 4px;
  font-weight: bold;
}

// 复选框组
.checkbox-group {
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

// 验证底部
.verification-footer {
  text-align: center;
  
  .footer-link {
    display: inline-block;
    color: #4a90e2;
    text-decoration: none;
    font-size: 0.9rem;
    margin: 0 1rem 0.5rem 0;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// 登录底部
.login-footer {
  text-align: center;
  
  .footer-link {
    display: block;
    color: #4a90e2;
    text-decoration: none;
    font-size: 1rem;
    margin-bottom: 1.25rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .signup-prompt {
    font-size: 1rem;
    color: #666;
    margin-top: 1.5rem;
    
    .signup-link {
      color: #4a90e2;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// SSL信息
.ssl-info {
  position: absolute;
  bottom: 2rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  font-weight: 500;
}

// 响应式设计
@media (max-width: 768px) {
  .header-container {
    padding: 0.8rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .logo {
    font-size: 1.2rem;
  }
  
  .price-info {
    display: none;
  }
  
  .main-content {
    padding: 0.5rem;
    min-height: calc(100vh - 100px);
  }
  
  .login-card {
    padding: 1.5rem 1rem;
    margin: 0;
    width: 100%;
    max-width: none;
    border-radius: 12px;
  }
  
  .progress-step {
    width: 100px !important;
  }
  
  .progress-container {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.25rem;
  }
  
  .login-card {
    padding: 1.5rem 0.8rem;
    border-radius: 8px;
  }
  
  .login-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  
  .form-control {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    height: 48px; // 适合移动端触摸
  }
  
  .btn-primary {
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
    height: 48px;
    margin-top: 0.5rem;
  }
  
  .progress-step {
    width: 80px !important;
  }
  
  .ssl-info {
    font-size: 0.8rem;
    bottom: 1rem;
    padding: 0 1rem;
  }
}

// 超小屏幕适配
@media (max-width: 320px) {
  .header-container {
    padding: 0.5rem;
  }
  
  .logo {
    font-size: 1rem;
  }
  
  .login-card {
    padding: 1rem 0.5rem;
  }
  
  .login-title {
    font-size: 1.2rem;
  }
  
  .progress-step {
    width: 70px !important;
  }
  
  .form-control, .btn-primary {
    height: 44px;
    font-size: 0.9rem;
  }
}

// 移动端横屏适配
@media screen and (max-height: 500px) and (orientation: landscape) {
  .main-content {
    padding: 0.5rem;
    min-height: auto;
  }
  
  .login-card {
    padding: 1rem;
    margin: 0.5rem 0;
  }
  
  .login-title {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  .progress-container {
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 0.8rem;
  }
  
  .ssl-info {
    position: relative;
    bottom: auto;
    margin-top: 1rem;
  }
}
</style>
