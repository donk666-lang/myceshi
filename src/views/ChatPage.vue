<template>
  <div class="bitflyer-page">
    <!-- 头部导航栏 -->
    <header class="header" :class="{ 'header-solid': isScrolled }" id="header">
      <div class="header-container">
        <div class="logo">
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
          <nav class="nav-menu">
          <router-link to="/login" class="nav-item">{{ $t('nav.getStarted') }}</router-link>
          <router-link to="/login" class="nav-item">{{ $t('nav.service') }}</router-link>
          <router-link to="/login" class="nav-item">{{ $t('nav.fees') }}</router-link>
          <router-link to="/login" class="nav-item">{{ $t('nav.security') }}</router-link>
          <router-link to="/login" class="nav-item">{{ $t('nav.support') }}</router-link>
        </nav>
        </div>
        
      
        
        <div class="header-actions">
          <router-link to="/login" class="login-btn">{{ $t('user.login') }}</router-link>
          <button class="create-account-btn">{{ $t('common.createAccount') }}</button>
          <LanguageSwitcher />
          <!-- 移动端菜单按钮 -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- 移动端全屏菜单 -->
    <div class="mobile-menu-overlay" :class="{ 'active': isMobileMenuOpen }" @click="closeMobileMenu">
      <div class="mobile-menu-content" @click.stop>
        <div class="mobile-menu-header">
          <div class="logo">
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
          <button class="mobile-menu-close" @click="closeMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="mobile-menu-body">
          <div class="mobile-menu-actions">
            <router-link to="/login" class="mobile-login-btn">{{ $t('user.login') }}</router-link>
          </div>
          
          <nav class="mobile-nav-menu">
            <router-link to="/login" class="mobile-nav-item">{{ $t('nav.getStarted') }}</router-link>
            <router-link to="/login" class="mobile-nav-item">{{ $t('nav.service') }}</router-link>
            <router-link to="/login" class="mobile-nav-item">{{ $t('nav.fees') }}</router-link>
            <router-link to="/login" class="mobile-nav-item">{{ $t('nav.security') }}</router-link>
            <router-link to="/login" class="mobile-nav-item">{{ $t('nav.support') }}</router-link>
            <div class="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 英雄区域 -->
      <section class="hero-section">

        <div class="hero-content">
          <div class="hero-left">
            <div class="hero-text">
             <img src="@/assets/no1.svg" alt="" srcset="" width="300px" height="300px">
            </div>
            
            <div class="signup-form">
              <div class="form-group">
                <div class="form-group-item">
                  <p class="form-title">{{ $t('chatPage.createFreeAccount') }}</p>
                  <input type="email" :placeholder="$t('chatPage.yourEmailAddress')" class="email-input">
                </div>
                <button class="signup-btn">{{ $t('chatPage.signUp') }}</button>
              </div>
              <p class="form-disclaimer">
                {{ $t('chatPage.protectedByRecaptcha') }} 
                <a href="#">{{ $t('chatPage.privacyPolicy') }}</a> {{ $t('common.and') }} <a href="#">{{ $t('chatPage.termsOfService') }}</a> {{ $t('chatPage.apply') }}.
              </p>
              <p class="trading-disclaimer">
                {{ $t('chatPage.tradingDisclaimer') }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- 滚动价格展示条 -->
        <div class="price-ticker">
          <div class="price-ticker-track">
            <!-- 动态渲染加密货币数据 -->
            <div 
              v-for="(crypto, index) in duplicatedCryptoData" 
              :key="`${crypto.id}-${index}`"
              class="price-item"
            >
              <div :class="['crypto-icon', crypto.iconClass]">
                <!-- 自定义SVG图标 -->
                <svg v-if="crypto.iconPath" width="20" height="20" viewBox="0 0 32 32">
                  <path fill="currentColor" :d="crypto.iconPath"/>
                </svg>
                <!-- 圆形图标 (Immutable) -->
                <svg v-else-if="crypto.isCircle" width="20" height="20" viewBox="0 0 32 32">
                  <circle fill="currentColor" cx="16" cy="16" r="16"/>
                  <circle fill="white" cx="16" cy="16" r="8"/>
                </svg>
                <!-- 方形图标 (Render) -->
                <svg v-else-if="crypto.isSquare" width="20" height="20" viewBox="0 0 32 32">
                  <circle fill="currentColor" cx="16" cy="16" r="16"/>
                  <path fill="white" d="M10 10h12v12H10z"/>
                </svg>
              </div>
              <div class="crypto-info">
                <span class="crypto-name">{{ crypto.name }}</span>
                <!-- <span class="crypto-symbol">{{ crypto.symbol }}</span> -->
                <div class="crypto-price">{{ crypto.price }}</div>
              </div>        
              <div class="price-chart">
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <polyline 
                    fill="none" 
                    :stroke="crypto.chartColor" 
                    stroke-width="1.5" 
                    :points="crypto.chartPoints"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 三大特色区域 -->
      <section class="content-section">
        <div class="container">
          <div class="reasons-header">
            <div class="title-with-dash">
              <h2>{{ $t('chatPage.reasonsForChoosing') }}</h2>
              <div class="dash"></div>
            </div>
          </div>
          
          <div class="reasons-content">
            <!-- 第一个特色 - Easy to use -->
            <div class="reason-card">
              <div class="reason-visual">
                <img src="@/assets/2-1.avif" alt="Easy to use and many fees are waived" class="reason-image">
              </div>
              <div class="reason-text">
                <h3>{{ $t('chatPage.easyToUse') }}</h3>
                <p>{{ $t('chatPage.easyToUseDesc') }} <a href="#" class="more-link">{{ $t('chatPage.moreInformation') }}</a></p>
              </div>
            </div>
            
            <!-- 第二个特色 - Trade with ease -->
            <div class="reason-card reverse">
              <div class="reason-visual">
                <img src="@/assets/2-2.avif" alt="bitFlyer lets you trade with ease" class="reason-image">
              </div>
              <div class="reason-text">
                <h3>{{ $t('chatPage.tradeWithEase') }}</h3>
                <p>{{ $t('chatPage.tradeWithEaseDesc') }}</p>
              </div>
            </div>
            
            <!-- 第三个特色 - 可以根据需要添加第三个 -->
            <div class="reason-card">
              <div class="reason-visual">
                <img src="@/assets/2-3.avif" alt="Advanced security and support" class="reason-image">
              </div>
              <div class="reason-text">
                <h3>{{ $t('chatPage.advancedSecurity') }}</h3>
                <p>{{ $t('chatPage.advancedSecurityDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第三部分 - 开户流程 -->
      <section class="account-opening-section">
        <div class="container">
          <div class="account-header">
            <h2>{{ $t('chatPage.openAccountMinutes') }}</h2>
            <p class="account-subtitle">{{ $t('chatPage.accountSubtitle') }}</p>
          </div>
          
          <div class="account-steps">
            <!-- 步骤1 - 注册邮箱 -->
            <div class="step-item">
              <div class="step-visual">
                <img src="@/assets/2-4.png" alt="Register email address" class="step-image">
              </div>
              <div class="step-content">
                <h3>{{ $t('chatPage.registerEmail') }}</h3>
                <p>{{ $t('chatPage.registerEmailDesc') }}</p>
              </div>
            </div>
            
            <!-- 箭头 -->
            <div class="step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            
            <!-- 步骤2 - ID验证 -->
            <div class="step-item">
              <div class="step-visual">
                <img src="@/assets/2-5.png" alt="ID verification procedure" class="step-image">
              </div>
              <div class="step-content">
                <h3>{{ $t('chatPage.idVerification') }}</h3>
                <p>{{ $t('chatPage.idVerificationDesc') }}</p>
              </div>
            </div>
            
            <!-- 箭头 -->
            <div class="step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            
            <!-- 步骤3 - 存款 -->
            <div class="step-item">
              <div class="step-visual">
                <img src="@/assets/2-6.png" alt="Deposit JPY" class="step-image">
              </div>
              <div class="step-content">
                <h3>{{ $t('chatPage.depositJpy') }}</h3>
                <p>{{ $t('chatPage.depositJpyDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第四部分 - 服务展示 -->
      <section class="services-section">
        <div class="container">
          <div class="services-layout">
            <!-- 左侧内容 -->
            <div class="services-left">
              <div class="services-icon">
                <div class="icon-grid">
                  <div class="icon-block blue"></div>
                  <div class="icon-block blue"></div>
                  <div class="icon-block blue"></div>
                  <div class="icon-block blue"></div>
                  <div class="icon-block orange circle"></div>
                  <div class="icon-block empty"></div>
                  <div class="icon-block blue"></div>
                  <div class="icon-block empty"></div>
                  <div class="icon-block empty"></div>
                </div>
              </div>
              
              <div class="services-content">
                <h2>{{ $t('chatPage.startUsingCrypto') }}</h2>
                <p>{{ $t('chatPage.startUsingCryptoDesc') }}</p>
                <button class="services-btn">{{ $t('chatPage.seeAllServices') }}</button>
              </div>
            </div>
            
            <!-- 右侧服务卡片 -->
            <div class="services-right">
              <!-- bitFlyer Recurring Buy -->
              <div class="service-card">
                <div class="service-icon">
                  <img src="@/assets/2-7.png" alt="bitFlyer Recurring Buy" class="service-image">
                </div>
                <div class="service-info">
                  <h3>{{ $t('chatPage.recurringBuy') }}</h3>
                  <p>{{ $t('chatPage.recurringBuyDesc') }}</p>
                </div>
              </div>
              
              <!-- bitFlyer credit card -->
              <div class="service-card">
                <div class="service-icon">
                  <img src="@/assets/2-8.png" alt="bitFlyer credit card" class="service-image">
                </div>
                <div class="service-info">
                  <h3>{{ $t('chatPage.creditCard') }}</h3>
                  <p>{{ $t('chatPage.creditCardDesc') }}</p>
                </div>
              </div>
              
              <!-- V-POINT -->
              <div class="service-card">
                <div class="service-icon">
                  <img src="@/assets/2-9.png" alt="V-POINT" class="service-image">
                </div>
                <div class="service-info">
                  <h3>{{ $t('chatPage.vPoint') }}</h3>
                  <p>{{ $t('chatPage.vPointDesc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第五部分 - Press release -->
      <section class="press-release-section">
        <div class="container">
          <div class="press-release-header">
            <h2>{{ $t('chatPage.pressRelease') }}</h2>
          </div>
          
          <div class="press-release-list">
            <!-- Press release item 1 -->
            <div class="press-release-item">
              <div class="press-release-date">2025.8.29</div>
              <div class="press-release-content">
                <h3>{{ $t('chatPage.termsUpdate') }}</h3>
              </div>
              <div class="press-release-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            
            <!-- Press release item 2 -->
            <div class="press-release-item">
              <div class="press-release-date">2025.8.12</div>
              <div class="press-release-content">
                <h3>{{ $t('chatPage.ethStaking') }}</h3>
              </div>
              <div class="press-release-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            
            <!-- Press release item 3 -->
            <div class="press-release-item">
              <div class="press-release-date">2025.7.25</div>
              <div class="press-release-content">
                <h3>{{ $t('chatPage.travelRule') }}</h3>
              </div>
              <div class="press-release-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- See all link -->
          <div class="press-release-footer">
            <a href="#" class="see-all-link">{{ $t('chatPage.seeAll') }}</a>
          </div>
        </div>
      </section>

      <!-- 第六部分：Pro-trading services -->
      <section class="pro-trading-section">
        <div class="container">
          <div class="pro-trading-header">
            <h2 class="pro-trading-title">{{ $t('chatPage.proTradingServices') }}</h2>
            <div class="pro-trading-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="logo-text">bitFlyer Lightning</span>
            </div>
          </div>
          
          <div class="laptop-showcase">
            <img src="@/assets/2-10.avif" alt="bitFlyer Lightning Trading Platform" class="laptop-image">
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <h3 class="feature-title">{{ $t('chatPage.userFriendlyTools') }}</h3>
              <div class="feature-content">
                <p>{{ $t('chatPage.userFriendlyToolsDesc1') }}</p>
                <p>{{ $t('chatPage.userFriendlyToolsDesc2') }}</p>
              </div>
            </div>
            
            <div class="feature-card">
              <h3 class="feature-title">{{ $t('chatPage.feesWaived') }}</h3>
              <div class="feature-content">
                <p>{{ $t('chatPage.feesWaivedDesc1') }}</p>
                <p>{{ $t('chatPage.feesWaivedDesc2') }}</p>
              </div>
            </div>
            
            <div class="feature-card">
              <h3 class="feature-title">{{ $t('chatPage.solidSecurity') }}</h3>
              <div class="feature-content">
                <p>{{ $t('chatPage.solidSecurityDesc') }}</p>
              </div>
            </div>
          </div>

          <div class="pro-trading-cta">
            <button class="cta-button">{{ $t('chatPage.startTradingLightning') }}</button>
          </div>
        </div>
      </section>

      <!-- 第七部分：法律声明和免责条款 -->
      <section class="legal-disclaimer-section">
        <div class="container">
          <!-- 顶部分隔线 -->
          <div class="section-divider"></div>
          
          <!-- 金融服务机构要点 -->
          <div class="legal-content">
            <h3 class="legal-title">{{ $t('chatPage.financialServicesTitle') }}</h3>
            
            <ul class="legal-points">
              <li>{{ $t('chatPage.legalPoint1') }}</li>
              <li>{{ $t('chatPage.legalPoint2') }}</li>
              <li>{{ $t('chatPage.legalPoint3') }}</li>
            </ul>

            <div class="notes-section">
              <h4 class="notes-title">{{ $t('chatPage.notesTitle') }}</h4>
              <ul class="notes-list">
                <li>{{ $t('chatPage.note1') }}</li>
                <li>{{ $t('chatPage.note2') }}</li>
                <li>{{ $t('chatPage.note3') }}</li>
                <li>{{ $t('chatPage.note4') }}</li>
                <li>{{ $t('chatPage.note5') }}</li>
              </ul>
            </div>

            <div class="registration-link">
              <a href="#" class="link">{{ $t('chatPage.registrationLink') }}</a>
              <span class="file-info">{{ $t('chatPage.pdfInfo') }}</span>
            </div>

            <p class="crypto-cfd-explanation">
              {{ $t('chatPage.cryptoCfdExplanation') }}
            </p>
          </div>

          <!-- 免责声明 -->
          <div class="disclaimer-section">
            <h3 class="disclaimer-title">{{ $t('chatPage.disclaimerTitle') }}</h3>
            
            <ul class="disclaimer-points">
              <li>{{ $t('chatPage.disclaimer1') }}</li>
              <li>{{ $t('chatPage.disclaimer2') }}</li>
              <li>{{ $t('chatPage.disclaimer3') }}</li>
              <li>{{ $t('chatPage.disclaimer4') }}</li>
              <li>{{ $t('chatPage.disclaimer5') }}</li>
              <li>{{ $t('chatPage.disclaimer6') }} <a href="#" class="inline-link">{{ $t('chatPage.whatIsCryptoCfd') }}</a> {{ $t('chatPage.disclaimer7') }} <a href="#" class="inline-link">{{ $t('chatPage.feesAndTaxes') }}</a> {{ $t('chatPage.disclaimer8') }}</li>
              <li>{{ $t('chatPage.disclaimer9') }}</li>
            </ul>
          </div>

          <!-- 公司信息 -->
          <div class="company-info">
            <p>{{ $t('chatPage.companyName') }}</p>
            <p>{{ $t('chatPage.kantoBureau') }}</p>
            <p>{{ $t('chatPage.fiboNumber') }}</p>
            <p>{{ $t('chatPage.memberInfo') }}</p>
          </div>
          
          <!-- 底部蓝色分隔线 -->
          <div class="bottom-divider"></div>
        </div>
      </section>

      <!-- 第八部分：Footer导航区 -->
      <section class="footer-navigation-section">
        <div class="container">
          <!-- bitFlyer Logo -->
          <div class="footer-logo">
            <div class="logo-container">
              <div class="logo-squares">
                <div class="square blue"></div>
                <div class="square blue"></div>
                <div class="square blue"></div>
                <div class="square orange"></div>
              </div>
              <span class="logo-text">bitFlyer</span>
            </div>
          </div>

          <!-- 导航菜单 -->
          <div class="navigation-menu">
            <!-- Get Started -->
            <div class="nav-category">
              <div class="nav-header" @click="toggleCategory('getStarted')">
                <h3>{{ $t('chatPage.getStartedFooter') }}</h3>
                <i class="arrow" :class="{ 'active': openCategories.getStarted }">▼</i>
              </div>
              <div class="nav-content" :class="{ 'open': openCategories.getStarted }">
                <ul>
                  <li><a href="#">{{ $t('chatPage.openAccount') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.accountVerification') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.depositFunds') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.buyFirstBitcoin') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.tradingTutorial') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.securitySetup') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.mobileAppDownload') }}</a></li>
                </ul>
              </div>
            </div>

            <!-- Service -->
            <div class="nav-category">
              <div class="nav-header" @click="toggleCategory('service')">
                <h3>{{ $t('chatPage.serviceFooter') }}</h3>
                <i class="arrow" :class="{ 'active': openCategories.service }">▼</i>
              </div>
              <div class="nav-content" :class="{ 'open': openCategories.service }">
                <div class="nav-subheader">{{ $t('chatPage.trade') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.buySell') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.easyExchange') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.bitflyerLightning') }}</a></li>
                </ul>
                
                <div class="nav-subheader">{{ $t('chatPage.forIndividualUsers') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.recurringBuyFooter') }}</a></li>
                </ul>
                
                <div class="nav-subheader">{{ $t('chatPage.forCorporateUsers') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.api') }}</a></li>
                </ul>
              </div>
            </div>

            <!-- Information -->
            <div class="nav-category">
              <div class="nav-header" @click="toggleCategory('information')">
                <h3>{{ $t('chatPage.informationFooter') }}</h3>
                <i class="arrow" :class="{ 'active': openCategories.information }">▼</i>
              </div>
              <div class="nav-content" :class="{ 'open': openCategories.information }">
                <ul>
                  <li><a href="#">{{ $t('chatPage.priceChart') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.chainFlyer') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.closingPrices') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.maxLeverage') }}</a></li>
                </ul>
                
                <div class="nav-subheader">{{ $t('chatPage.community') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.twitter') }}</a></li>
                </ul>
              </div>
            </div>

            <!-- Support -->
            <div class="nav-category">
              <div class="nav-header" @click="toggleCategory('support')">
                <h3>{{ $t('chatPage.supportFooter') }}</h3>
                <i class="arrow" :class="{ 'active': openCategories.support }">▼</i>
              </div>
              <div class="nav-content" :class="{ 'open': openCategories.support }">
                <ul>
                  <li><a href="#">{{ $t('chatPage.faqContact') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.systemStatus') }}</a></li>
                </ul>
                
                <div class="nav-subheader">{{ $t('chatPage.userGuides') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.termsAgreements') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.policies') }}</a></li>
                  <li><a href="#">{{ $t('nav.fees') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.listedAssets') }}</a></li>
                </ul>
              </div>
            </div>

            <!-- About Us -->
            <div class="nav-category">
              <div class="nav-header" @click="toggleCategory('aboutUs')">
                <h3>{{ $t('chatPage.aboutUsFooter') }}</h3>
                <i class="arrow" :class="{ 'active': openCategories.aboutUs }">▼</i>
              </div>
              <div class="nav-content" :class="{ 'open': openCategories.aboutUs }">
                <ul>
                  <li><a href="#">{{ $t('chatPage.companySummary') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.directorProfiles') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.careers') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.press') }}</a></li>
                </ul>
                
                <div class="nav-subheader">{{ $t('chatPage.affiliatedCompanies') }}</div>
                <ul>
                  <li><a href="#">{{ $t('chatPage.bitflyerUSA') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.bitflyerEurope') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.bitflyerBlockchain') }}</a></li>
                  <li><a href="#">{{ $t('chatPage.custodiem') }}</a></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 底部链接 -->
          <div class="footer-bottom-links">
            <div class="bottom-link-item">
              <a href="#" class="bottom-link">{{ $t('chatPage.sitemap') }}</a>
            </div>
            <div class="bottom-link-item">
              <a href="#" class="bottom-link">{{ $t('chatPage.complaintProcessing') }}</a>
            </div>
          </div>

          <!-- 公司信息 -->
          <div class="footer-company-info">
            <div class="company-details">
              <p><strong>{{ $t('chatPage.companyName') }}</strong></p>
              <p>{{ $t('chatPage.kantoBureau') }}</p>
              <p>{{ $t('chatPage.fiboNumber') }}</p>
              <p>{{ $t('chatPage.memberInfo') }}</p>
            </div>
            
            <div class="copyright">
              <p>{{ $t('chatPage.copyright') }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

export default {
  name: 'ChatPage',
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      isScrolled: false,
      pageContainer: null,
      isMobileMenuOpen: false,
      openCategories: {
        getStarted: false,
        service: false,
        information: false,
        support: false,
        aboutUs: false
      },
      // 加密货币数据配置
      cryptoData: [
        {
          id: 'polygon',
          name: 'Polygon',
          symbol: 'MATIC',
          price: '¥ 43.23',
          iconClass: 'polygon',
          iconColor: '#8247e5',
          chartColor: '#4CAF50',
          chartPoints: '0,15 10,12 20,8 30,6 40,4 50,2 60,1',
          iconPath: 'M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm6.5 24.5L16 28l-6.5-3.5V17l6.5-3.5L22.5 17v7.5z'
        },
        {
          id: 'maker',
          name: 'Maker',
          symbol: 'MKR',
          price: '¥ 259,665.49',
          iconClass: 'maker',
          iconColor: '#1aab9b',
          chartColor: '#4CAF50',
          chartPoints: '0,18 10,16 20,14 30,10 40,8 50,6 60,4',
          iconPath: 'M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm8 24h-3V12l-5 4-5-4v12H8V8h3l5 4 5-4h3v16z'
        },
        {
          id: 'immutable',
          name: 'Immutable',
          symbol: 'IMX',
          price: '¥ 76.1',
          iconClass: 'immutable',
          iconColor: '#000000',
          chartColor: '#FF9800',
          chartPoints: '0,12 10,10 20,14 30,16 40,12 50,8 60,6',
          iconPath: null, // 使用圆形图标
          isCircle: true
        },
        {
          id: 'render',
          name: 'Render Token',
          symbol: 'RNDR',
          price: '¥ 534.9',
          iconClass: 'render',
          iconColor: '#ff6b35',
          chartColor: '#F44336',
          chartPoints: '0,8 10,12 20,16 30,14 40,18 50,16 60,14',
          iconPath: null, // 使用方形图标
          isSquare: true
        },
        {
          id: 'graph',
          name: 'The Graph',
          symbol: 'GRT',
          price: '¥ 13.13',
          iconClass: 'graph',
          iconColor: '#6f47eb',
          chartColor: '#F44336',
          chartPoints: '0,6 10,8 20,12 30,16 40,14 50,18 60,16',
          iconPath: 'M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 24c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'
        }
      ]
    }
  },
  computed: {
    // 创建循环数据用于无缝滚动
    duplicatedCryptoData() {
      // 将数据复制两次以创建无缝循环效果
      return [...this.cryptoData, ...this.cryptoData]
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 监听页面滚动容器
      const pageContainer = this.$el
      if (pageContainer) {
        console.log('添加滚动监听器到 .bitflyer-page')
        pageContainer.addEventListener('scroll', this.handleScroll)
        this.pageContainer = pageContainer
      }
      
      // 备用方案：监听window滚动
      window.addEventListener('scroll', this.handleScroll)
      console.log('滚动监听器已设置')
    })
  },
  beforeUnmount() {
    if (this.pageContainer) {
      this.pageContainer.removeEventListener('scroll', this.handleScroll)
    }
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleCategory(categoryName) {
      this.openCategories[categoryName] = !this.openCategories[categoryName]
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      // 防止背景滚动
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    handleScroll(event) {
      let scrollY = 0
      
      // 获取滚动位置
      if (event.target === window) {
        scrollY = window.scrollY
      } else {
        scrollY = event.target.scrollTop
      }
      
      // 更新状态
      const newScrolled = scrollY > 50
      if (this.isScrolled !== newScrolled) {
        this.isScrolled = newScrolled
        console.log(`Header状态变化: ${newScrolled ? '不透明' : '透明'} (scrollY: ${scrollY})`)
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

// 全局隐藏滚动条
html, body {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.bitflyer-page {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;
  height: 100vh; // 确保容器有固定高度
  background-color: #fdfdff;
  
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

// 头部导航栏
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  
  &.header-solid {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    
    .nav-item, .login-btn {
      color: #333;
    }
    
    // 语言切换器滚动时样式 - 使用深度选择器穿透子组件
    :deep(.language-switcher .language-btn) {
      color: #333 !important;
      background: rgba(0, 0, 0, 0.1) !important;
      border-color: rgba(0, 0, 0, 0.2) !important;
      
      &:hover {
        background: rgba(0, 0, 0, 0.15) !important;
        border-color: rgba(0, 0, 0, 0.3) !important;
      }
    }
    
    .logo-text {
      color: #333;
    }
    
    .icon-grid .grid-item {
      &.blue {
        background: #1e88e5;
      }
      
      &.orange {
        background: #ff9800;
        
        &::after {
          display: none;
        }
      }
    }
  }
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5px 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    width: 32px;
    height: 32px;
    
    .grid-item {
width: 100%;
      height: 100%;
      transition: background-color 0.3s ease;
      position: relative;
      
      &.blue {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 2px;
      }
      
      &.orange {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        
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
    transition: color 0.3s ease;
  }
}

.nav-menu {
  display: flex;
  gap: 2rem;
  margin-left: 40px;
  
  .nav-item {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  // 在移动端调整布局
  @media (max-width: 1260px) {
    gap: 1rem;
    
    .language, .login-btn {
      display: none;
    }
  }
  
  .language {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .login-btn {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .create-account-btn {
    background: white;
    color: #2196f3;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: #1976d2;
    }
  }
  
  
  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: auto; // 确保汉堡菜单在最右侧
    
    span {
      display: block;
      width: 20px;
      height: 2px;
      background: white;
      transition: all 0.3s ease;
      
      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
    
    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        &:nth-child(2) {
          opacity: 0;
        }
        
        &:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }
  }
}

// 主要内容
.main-content {
  min-height: 100vh;
  height: auto;
}

// 英雄区域
.hero-section {
height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
background: url('@/assets/bg.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  // 响应式背景图片适配
  @media (max-width: 768px) {
    min-height: 80vh;
    padding: 1rem;
    background-image: url('@/assets/min-bg.avif');
    background-size: cover;
    background-position: center top;
  }
  
  @media (max-width: 480px) {
    min-height: 70vh;
    padding: 0.5rem;
  }
  
  // 超宽屏适配
  @media (min-width: 1920px) {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
  }
}


// 英雄内容
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: 6rem;
  padding: 0 2rem;
  min-height: inherit;
  
  // 响应式布局调整
  @media (max-width: 1200px) {
    gap: 3rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 12rem 1rem 0 1rem; // 进一步增加顶部内边距，让内容再下移一点
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 12rem 0.5rem 0 0.5rem; // 同样增加顶部内边距，让内容再下移一点
  }
}

.hero-left {
  flex: 1;
  max-width: 600px;
  z-index: 10;
  margin-left: 40px;
}

.hero-text {
  // margin-bottom: 4rem;
  
  .hero-subtitle {
    color: white;
    font-size: 1.8rem;
    margin-bottom: 0.2rem;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
  
  .hero-subtitle-2 {
    color: white;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
  
  .hero-title {
    font-size: 15rem;
    font-weight: 900;
    color: white;
    line-height: 0.8;
    margin-bottom: 0.5rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
  }
  
  .hero-description {
    color: white;
    font-size: 1.9rem;
    margin-bottom: 0.2rem;
    font-weight: 400;
    letter-spacing: 0.3px;
  }
  
  .hero-description-2 {
    color: white;
    font-size: 1.9rem;
    font-weight: 400;
    letter-spacing: 0.3px;
    margin-bottom: 1.5rem;
  }
}

.signup-form {
  .form-group {
    display: flex;
    gap: 0;
    margin-bottom: 1.5rem;
    // max-width: 400px;
    .form-group-item{
      width: 55%;
      background: rgba(255, 255, 255, 0.5);
      padding:0.8rem 1.2rem;
      .form-title {
        color: white;
        // margin-bottom: 1.5rem;
        font-size: 0.8rem;
        font-weight: 400;
        // padding: 0 25px;
      }
             .email-input {
        flex: 1;
        // padding: 0.5rem 1.5rem;
        border: none;
        border-radius: 5px;
        font-size: 1.1rem;
        background: transparent;
        color: white;
        
        &::placeholder {
          color: #fff;
          font-weight: 400;
        }
        
        &:focus {
          outline: none;
          background: transparent;
        }
    }
    }
    
    .signup-btn {
      margin-left: 20px;
      padding: 1.2rem 2.5rem;
      color: #1077dd;
    background-color: #fff;
      border: none;
      border-radius:8px;
      font-weight: 600;
      cursor: pointer;
      font-size: 1.1rem;
      box-shadow: 0 2px 10px rgba(33, 150, 243, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        background: #1976d2;
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
      }
    }
  }
  
  .form-disclaimer {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    max-width: 400px;
    
    a {
      color: white;
      text-decoration: underline;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
  
  .trading-disclaimer {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.60rem;
    line-height: 1.6;
    max-width: 500px;
  }
}

// 手机模型
.hero-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index: 10;
}

.phone-mockups {
  position: relative;
  width: 450px;
  height: 600px;
  margin-right: 2rem;
}

.phone {
  position: absolute;
  width: 220px;
  height: 450px;
  background: #000;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  
  &.phone-1 {
    left: -20px;
    top: 20px;
    z-index: 3;
    transform: rotate(-8deg);
  }
  
  &.phone-2 {
    right: -20px;
    top: -20px;
    z-index: 2;
    transform: rotate(12deg);
  }
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.phone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  
  .time {
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .app-title {
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .status-icons {
    width: 60px;
    height: 12px;
    background: #000;
    border-radius: 6px;
  }
}

.app-content {
  padding: 1rem;
  
  .app-logo {
    text-align: center;
    margin-bottom: 1rem;
    
    .logo-square {
      background: #2196f3;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.9rem;
    }
  }
  
  .balance-card {
    background: linear-gradient(135deg, #2196f3, #21cbf3);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    color: white;
    
    .balance-info {
      display: flex;
      flex-direction: column;
      
      .balance-label {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
      }
      
      .balance-amount {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
  
  .crypto-list {
    .crypto-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid #eee;
      
      .crypto-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        
        &.btc {
          background: #f7931a;
        }
        
        &.eth {
          background: #627eea;
        }
      }
      
      .crypto-info {
        // display: flex;
        // flex-direction: column;
        
        .crypto-name {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .crypto-price {
          font-size: 0.38rem;
          color: #666;
        }
      }
    }
  }
}

.chart-content {
  padding: 1rem;
  
  .price-display {
    text-align: center;
    margin-bottom: 1rem;
    
    .current-price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ff6b35;
    }
  }
  
  .chart-area {
    height: 120px;
    margin-bottom: 1rem;
    
    .price-chart {
      width: 100%;
      height: 100%;
    }
  }
  
  .time-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .time-filter {
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.8rem;
      cursor: pointer;
      
      &.active {
        background: #ff6b35;
        color: white;
      }
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
    
    .action-btn {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      
      &.buy {
        background: #4caf50;
        color: white;
      }
      
      &.sell {
        background: #f44336;
        color: white;
      }
    }
  }
}

// 内容区域
.content-section {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 6rem 2rem;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .reasons-header {
    text-align: center;
    margin-bottom: 5rem;
    
    .title-with-dash {
      
      .dash {
        position: absolute;
        left: 45%;
        text-align: center;
        width: 10%;
        height: 1.5px;
        margin-top: 15px;
        background-color: #bcbcc0;
        
        @media (max-width: 768px) {
          width: 40px;
        }
        
        @media (max-width: 576px) {
          width: 30px;
        }
      }
    }
    
    h2 {
      font-size: 2.4rem;
      font-weight: 600;
      color: #333;
      margin: 0;
      white-space: nowrap;
    }
  }
  
  .reasons-content {
    display: flex;
    flex-direction: column;
    gap: 8rem;
  }
  
  .reason-card {
    display: flex;
    align-items: center;
    gap: 4rem;
    
    &.reverse {
      flex-direction: row-reverse;
      
      .reason-text {
        text-align: right;
      }
    }
    
    .reason-visual {
      flex: 1;
      max-width: 500px;
      
      .reason-image {
width: 100%;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      }
    }
    
    .reason-text {
      flex: 1;
      max-width: 600px;
      
      h3 {
        font-size: 2.2rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 1.5rem;
        line-height: 1.3;
      }
      
      p {
        font-size: 1.1rem;
        color: #666;
        line-height: 1.8;
        margin: 0;
        
        .more-link {
          color: #2196f3;
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  
  // 响应式设计
  @media (max-width: 968px) {
    padding: 4rem 1rem;
    
    .reasons-content {
      gap: 4rem;
    }
    
    .reason-card {
      flex-direction: column !important;
      gap: 2rem;
      text-align: center;
      
      .reason-text {
        text-align: center !important;
        
        h3 {
          font-size: 1.8rem;
        }
      }
    }
    
    .reasons-header h2 {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 576px) {
    .reasons-header h2 {
      font-size: 1.6rem;
    }
    
    .reason-card .reason-text h3 {
      font-size: 1.5rem;
    }
  }
}

// 第三部分 - 开户流程样式
.account-opening-section {
  background: #f8f9fa;
  padding: 6rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .account-header {
    text-align: center;
    margin-bottom: 5rem;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .account-subtitle {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.4;
    }
  }
  
  .account-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .step-item {
    flex: 1;
    max-width: 280px;
    text-align: center;
    
    .step-visual {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
      
      .step-image {
        width: 200px;
        height: 200px;
        object-fit: contain;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
      }
    }
    
    .step-content {
      h3 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
        line-height: 1.3;
      }
      
      p {
        font-size: 1rem;
        color: #666;
        line-height: 1.5;
        margin: 0;
      }
    }
  }
  
  .step-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;
    
    svg {
      opacity: 0.6;
    }
  }
  
  // 响应式设计
  @media (max-width: 968px) {
    padding: 4rem 0;
    
    .account-header {
      margin-bottom: 3rem;
      
      h2 {
        font-size: 2rem;
      }
    }
    
    .account-steps {
      flex-direction: column;
      gap: 3rem;
    }
    
    .step-arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
    
    .step-item {
      max-width: 100%;
      
      .step-visual .step-image {
        width: 150px;
        height: 150px;
      }
      
      .step-content h3 {
        font-size: 1.3rem;
      }
    }
  }
  
  @media (max-width: 576px) {
    padding: 3rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .account-header {
      h2 {
        font-size: 1.8rem;
      }
      
      .account-subtitle {
        font-size: 0.85rem;
      }
    }
    
    .step-item {
      .step-visual .step-image {
        width: 120px;
        height: 120px;
      }
      
      .step-content {
        h3 {
          font-size: 1.2rem;
        }
        
        p {
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 第四部分 - 服务展示样式
.services-section {
  background: #ffffff;
  padding: 6rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .services-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .services-left {
    .services-icon {
      margin-bottom: 3rem;
      
      .icon-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        width: 120px;
        
        .icon-block {
          width: 32px;
          height: 32px;
          // border-radius: 4px;
          
          &.blue {
            background: #1e88e5;
          }
          
          &.orange {
            background: #ff9800;
            
            &.circle {
              border-radius: 50%;
            }
          }
          
          &.empty {
            background: transparent;
          }
        }
      }
    }
    
    .services-content {
      h2 {
        font-size: 2.2rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 1.2rem;
        line-height: 1.2;
      }
      
      p {
        font-size: 1rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      
      .services-btn {
        background: #1e88e5;
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #1565c0;
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .services-right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    .service-card {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 2rem 2.5rem;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }
      
      .service-icon {
        flex-shrink: 0;
        
        .service-image {
          width: 70px;
          height: 70px;
          object-fit: contain;
        }
      }
      
      .service-info {
        flex: 1;
        
        h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        
        p {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
          margin: 0;
        }
      }
    }
  }
  
  // 响应式设计
  @media (max-width: 968px) {
    padding: 4rem 0;
    
    .services-layout {
      grid-template-columns: 1fr;
      gap: 4rem;
      text-align: center;
    }
    
    .services-left {
      .services-icon {
        display: flex;
        justify-content: center;
      }
      
      .services-content {
        h2 {
          font-size: 2rem;
        }
      }
    }
    
    .services-right {
      max-width: 500px;
      margin: 0 auto;
    }
  }
  
  @media (max-width: 576px) {
    padding: 3rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .services-layout {
      gap: 3rem;
    }
    
    .services-left {
      .services-content {
        h2 {
          font-size: 1.8rem;
        }
        
        p {
          font-size: 0.95rem;
        }
        
        .services-btn {
          padding: 0.875rem 2rem;
          font-size: 0.9rem;
        }
      }
    }
    
    .services-right {
      .service-card {
        padding: 1.5rem 2rem;
        gap: 1.5rem;
        
        .service-icon .service-image {
          width: 60px;
          height: 60px;
        }
        
        .service-info {
          h3 {
            font-size: 1.25rem;
          }
          
          p {
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

// 第五部分 - Press release样式
.press-release-section {
  background: #ffffff;
  padding: 8rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .press-release-header {
    margin-bottom: 4rem;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      line-height: 1.2;
    }
  }
  
  .press-release-list {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .press-release-item {
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(30, 136, 229, 0.02);
      padding-left: 1rem;
      padding-right: 1rem;
      margin-left: -1rem;
      margin-right: -1rem;
      border-radius: 8px;
      
      .press-release-arrow svg path {
        stroke: #1e88e5;
      }
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    .press-release-date {
      flex-shrink: 0;
      font-size: 1rem;
      color: #999;
      font-weight: 400;
      min-width: 100px;
      margin-top: 0.2rem;
    }
    
    .press-release-content {
      flex: 1;
      
      h3 {
        font-size: 1.1rem;
        font-weight: 400;
        color: #333;
        line-height: 1.5;
        margin: 0;
      }
    }
    
    .press-release-arrow {
      flex-shrink: 0;
      margin-top: 0.2rem;
      opacity: 0.8;
      transition: opacity 0.3s ease;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  
  .press-release-footer {
    margin-top: 4rem;
    text-align: right;
    
    .see-all-link {
      color: #1e88e5;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #1565c0;
        text-decoration: underline;
      }
    }
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    padding: 5rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .press-release-header {
      margin-bottom: 3rem;
      
      h2 {
        font-size: 2rem;
      }
    }
    
    .press-release-item {
      flex-direction: column;
      gap: 1rem;
      padding: 2rem 0;
      
      .press-release-date {
        min-width: auto;
        margin-top: 0;
        font-size: 0.9rem;
      }
      
      .press-release-content h3 {
        font-size: 1rem;
      }
      
      .press-release-arrow {
        align-self: flex-end;
        margin-top: -1rem;
      }
    }
    
    .press-release-footer {
      margin-top: 3rem;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0;
    
    .press-release-header {
      margin-bottom: 2.5rem;
      
      h2 {
        font-size: 1.8rem;
      }
    }
    
    .press-release-item {
      padding: 1.5rem 0;
      
      .press-release-content h3 {
        font-size: 0.95rem;
      }
    }
  }
}

// 第六部分 - Pro-trading services样式
.pro-trading-section {
  background: #fff;
  // padding: 8rem 0;
  
  .container {
    max-width: 80%;
    background: #f0f2f5;
    margin: 0 auto;
    padding: 56px 2rem;
  }
  
  .pro-trading-header {
    text-align: center;
    margin-bottom: 4rem;
    
    .pro-trading-title {
      font-size: 2.5rem;
      font-weight: 400;
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .pro-trading-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      
      svg {
        width: 28px;
        height: 28px;
      }
      
      .logo-text {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        letter-spacing: -0.02em;
      }
    }
  }
  
  .laptop-showcase {
    text-align: center;
    margin-bottom: 6rem;
    
    .laptop-image {
      max-width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    margin-bottom: 5rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    
    .feature-card {
      text-align: left;
      background: #fff;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      }
      
      
      .feature-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 1.5rem;
        line-height: 1.3;
      }
      
      .feature-content {
        p {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  
  .pro-trading-cta {
    text-align: center;
    
    .cta-button {
      background: #FF6B35;
      color: white;
      border: none;
      padding: 1rem 3rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
      
      &:hover {
        background: #e55a2b;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  // 响应式设计
  @media (max-width: 968px) {
    padding: 5rem 0;
    
    .pro-trading-header {
      margin-bottom: 3rem;
      
      .pro-trading-title {
        font-size: 2rem;
      }
      
      .pro-trading-logo {
        .logo-text {
          font-size: 1.5rem;
        }
      }
    }
    
    .laptop-showcase {
      margin-bottom: 4rem;
      
      .laptop-image {
        max-height: 400px;
      }
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
      text-align: center;
      
      .feature-card {
        .feature-title {
          font-size: 1.3rem;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    padding: 4rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .pro-trading-header {
      margin-bottom: 2.5rem;
      
      .pro-trading-title {
        font-size: 1.8rem;
      }
      
      .pro-trading-logo {
        flex-direction: column;
        gap: 0.5rem;
        
        .logo-text {
          font-size: 1.3rem;
        }
      }
    }
    
    .laptop-showcase {
      margin-bottom: 3rem;
      
      .laptop-image {
        max-height: 300px;
      }
    }
    
    .features-grid {
      gap: 2.5rem;
      margin-bottom: 3rem;
      
      .feature-card {
        .feature-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        
        .feature-content p {
          font-size: 0.95rem;
        }
      }
    }
    
    .pro-trading-cta {
      .cta-button {
        padding: 1rem 2.5rem;
        font-size: 1rem;
        width: 100%;
        max-width: 300px;
      }
    }
  }
}

// 第七部分 - 法律声明和免责条款样式
.legal-disclaimer-section {
  background: #fff;
  padding: 4rem 0 6rem 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .section-divider {
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
    margin-bottom: 3rem;
  }
  
  .bottom-divider {
    width: 100%;
    height: 2px;
    background-color: #4A90E2;
    margin-top: 3rem;
  }
  
  .legal-content {
    margin-bottom: 4rem;
    
    .legal-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    
    .legal-points {
      margin: 0 0 2rem 0;
      padding-left: 1.2rem;
      
      li {
        font-size: 0.85rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 0.8rem;
        
        &::marker {
          color: #333;
        }
      }
    }
    
    .notes-section {
      margin: 2rem 0;
      
      .notes-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
        padding-left: 1rem;
      }
      
      .notes-list {
        margin: 0 0 1.5rem 0;
        padding-left: 2.2rem;
        
        li {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 0.8rem;
          
          &::marker {
            color: #333;
          }
        }
      }
    }
    
    .registration-link {
      margin: 1.5rem 0;
      
      .link {
        color: #4A90E2;
        text-decoration: underline;
        font-size: 0.85rem;
        
        &:hover {
          color: #357abd;
        }
      }
      
      .file-info {
        color: #666;
        font-size: 0.85rem;
        margin-left: 0.5rem;
      }
    }
    
    .crypto-cfd-explanation {
      font-size: 0.85rem;
      color: #666;
      line-height: 1.6;
      margin-top: 2rem;
    }
  }
  
  .disclaimer-section {
    margin-bottom: 3rem;
    
    .disclaimer-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    
    .disclaimer-points {
      margin: 0;
      padding-left: 1.2rem;
      
      li {
        font-size: 0.85rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
        
        &::marker {
          color: #333;
        }
        
        .inline-link {
          color: #4A90E2;
          text-decoration: underline;
          
          &:hover {
            color: #357abd;
          }
        }
      }
    }
  }
  
  .company-info {
    padding-top: 2rem;
    
    p {
      font-size: 0.8rem;
      color: #666;
      line-height: 1.5;
      margin-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 价格滚动条样式
.price-ticker {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
}

.price-ticker-track {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 40px;
  animation: infiniteScroll 40s linear infinite;
  width: max-content;
  
  @keyframes infiniteScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}

.price-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  // min-width: 300px;
  flex-shrink: 0;
  
  .crypto-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &.polygon {
      background: #8247e5;
    }
    
    &.maker {
      background: #1aab9b;
    }
    
    &.immutable {
      background: #000000;
    }
    
    &.render {
      background: #ff6b35;
    }
    
    &.graph {
      background: #6f47eb;
    }
  }
  
  .crypto-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 90px;
    
    .crypto-name {
      color: white;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.3;
      white-space: nowrap;
    }
    
    .crypto-symbol {
      color: rgba(255, 255, 255, 0.75);
      font-size: 11px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: 0.5px;
    }
    
    .crypto-price {
      color: rgba(255, 255, 255, 0.8);
      font-size: 10px;
      font-weight: 400;
      line-height: 1.2;
      white-space: nowrap;
      margin-top: 2px;
    }
  }
  
  .price-chart {
    flex-shrink: 0;
    
    svg {
      width: 60px;
      height: 20px;
    }
  }
}

// 价格条移动端优化
@media (max-width: 768px) {
  .price-ticker {
    height: 70px;
  }
  
  .price-item {
    gap: 10px;
    padding: 0 16px;
    min-width: 260px;
    
    .crypto-icon {
      width: 28px;
      height: 28px;
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
    
    .crypto-info {
      min-width: 70px;
      
      .crypto-name {
        font-size: 12px;
      }
      
      .crypto-symbol {
        font-size: 10px;
      }
      
      .crypto-price {
        font-size: 9px;
      }
    }
    
    .price-chart svg {
      width: 50px;
      height: 18px;
    }
  }
}

// 1260px断点 - 隐藏桌面导航，显示移动端菜单按钮，隐藏右上角按钮
@media (max-width: 1260px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex !important;
  }
  
  // 在移动端隐藏Login按钮，但保留Create Account按钮
  .login-btn {
    display: none;
  }
}

// 768px断点 - 调整更小屏幕的布局
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .header-actions {
    gap: 0.75rem;
  }
  
  .hero-text .hero-title {
    font-size: 5rem;
  }
  
  .hero-text .hero-subtitle,
  .hero-text .hero-subtitle-2 {
    font-size: 1.3rem;
  }
  
  .hero-text .hero-description,
  .hero-text .hero-description-2 {
    font-size: 1.4rem;
  }
  
  .phone-mockups {
    width: 300px;
    height: 400px;
  }
  
  .phone {
    width: 150px;
    height: 300px;
  }
  
  .floating-elements {
    display: none;
  }

  // 第七部分响应式
  .legal-disclaimer-section {
    padding: 3rem 0 4rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .legal-content {
      margin-bottom: 3rem;
      
      .legal-title {
        font-size: 1rem;
      }
      
      .legal-points, .notes-list, .disclaimer-points {
        padding-left: 1rem;
        
        li {
          font-size: 0.9rem;
        }
      }
      
      .notes-title {
        font-size: 0.95rem;
        padding-left: 0.5rem;
      }
      
      .registration-link {
        .link, .file-info {
          font-size: 0.9rem;
        }
      }
      
      .crypto-cfd-explanation {
        font-size: 0.9rem;
      }
    }
    
    .disclaimer-section {
      margin-bottom: 2rem;
      
      .disclaimer-title {
        font-size: 1rem;
      }
    }
    
    .company-info {
      p {
        font-size: 0.85rem;
      }
    }
  }
  
}

// 第八部分 - Footer导航区样式
.footer-navigation-section {
  background: #fff;
  padding: 4rem 0 3rem 0;
  border-top: 1px solid #e0e0e0;
  
  .container {
    max-width: 1200px; // 缩小整体宽度
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  // Logo区域
  .footer-logo {
    margin-bottom: 3rem;
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      .logo-squares {
        display: flex;
        gap: 2px;
        
        .square {
          width: 8px;
          height: 8px;
          
          &.blue {
            background-color: #0066CC;
          }
          
          &.orange {
            background-color: #FF6600;
          }
        }
      }
      
      .logo-text {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
    }
  }
  
  // 导航菜单 - 桌面端多列布局
  .navigation-menu {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  .nav-category {
    // 桌面端样式
    .nav-header {
      cursor: default;
      padding: 0 0 1rem 0;
      border-bottom: none;
      user-select: none;
      
      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
        margin: 0 0 1rem 0;
        border-bottom: none;
      }
      
      .arrow {
        display: none; // 桌面端隐藏箭头
      }
      
      &:hover {
        background: none;
        margin: 0;
        padding: 0 0 1rem 0;
      }
    }
    
    .nav-content {
      max-height: none;
      overflow: visible;
      transition: none;
      display: block; // 桌面端始终显示
      
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        
        li {
          margin: 0;
          
          a {
            display: block;
            padding: 0.4rem 0;
            color: #666;
            text-decoration: none;
            font-size: 0.85rem;
            line-height: 1.4;
            transition: color 0.2s ease;
            
            &:hover {
              color: #0066CC;
              text-decoration: underline;
            }
          }
        }
      }
      
      // 子标题样式
      .nav-subheader {
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
        margin: 1.5rem 0 0.8rem 0;
        
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  
  // 底部链接 - 桌面端横向排列
  .footer-bottom-links {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
    
    .bottom-link-item {
      .bottom-link {
        color: #666;
        text-decoration: none;
        font-size: 0.9rem;
        line-height: 1.4;
        
        &:hover {
          color: #0066CC;
          text-decoration: underline;
        }
      }
    }
  }
  
  // 公司信息
  .footer-company-info {
    .company-details {
      margin-bottom: 2rem;
      
      p {
        font-size: 0.8rem;
        color: #666;
        line-height: 1.6;
        margin: 0.3rem 0;
        
        strong {
          color: #333;
          font-weight: 600;
        }
      }
    }
    
    .copyright {
      p {
        font-size: 0.75rem;
        color: #999;
        margin: 0;
      }
    }
  }
  
  // 移动端响应式
  @media (max-width: 768px) {
    padding: 3rem 0 2rem 0; // 为整个Footer导航区添加内边距
    
    .container {
      padding: 0 1.5rem; // 增加左右内边距
    }
    
    // 移动端恢复折叠式布局
    .navigation-menu {
      display: flex !important;
      flex-direction: column !important;
      gap: 0 !important;
    }
    
    .nav-category {
      .nav-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        cursor: pointer !important;
        padding: 1.2rem 0 !important; // 增加上下内边距
        border-bottom: 1px solid #e0e0e0 !important;
        
        h3 {
          font-size: 1.1rem !important;
          margin: 0 !important;
        }
        
        .arrow {
          display: block !important; // 移动端显示箭头
          font-size: 0.8rem;
          color: #666;
          transition: transform 0.3s ease;
          
          &.active {
            transform: rotate(180deg);
          }
        }
        
        &:hover {
          background-color: #f5f5f5;
          margin: 0 -1rem;
          padding: 1rem;
          border-radius: 4px;
        }
      }
      
      .nav-content {
        max-height: 0 !important;
        overflow: hidden !important;
        transition: max-height 0.3s ease !important;
        display: block !important;
        
        &.open {
          max-height: 500px !important;
        }
        
        .nav-subheader {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
          margin: 1.5rem 0 0.8rem 0;
          padding: 0 0.5rem; // 添加左右内边距
          
          &:first-child {
            margin-top: 1.2rem; // 增加顶部间距
          }
        }
        
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          
          li {
            margin: 0;
            
            a {
              display: block;
              padding: 0.7rem 0.5rem; // 增加内边距
              color: #666;
              text-decoration: none;
              font-size: 0.9rem;
              line-height: 1.4;
              transition: color 0.2s ease;
              
              &:hover {
                color: #0066CC;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
    
    .footer-bottom-links {
      flex-direction: column !important;
      gap: 1rem !important;
      
      .bottom-link-item .bottom-link {
        font-size: 0.9rem;
      }
    }
    
    .footer-company-info {
      .company-details p {
        font-size: 0.85rem;
      }
    }
  }
}

// 移动端全屏菜单样式
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
width: 100%;
height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  background: white;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  
  .mobile-menu-overlay.active & {
    transform: translateX(0);
  }
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
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
          background: #1e88e5;
          border-radius: 2px;
        }
        
        &.orange {
          background: #ff9800;
          border-radius: 50%;
        }
        
        &.empty {
          background: transparent;
        }
      }
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }
  }
  
  .mobile-menu-close {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
}

.mobile-menu-body {
  padding: 2rem 1.5rem;
}

.mobile-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  
  .mobile-login-btn {
    display: block;
    text-align: center;
    text-decoration: none;
    background: none;
    border: 1px solid #ddd;
    color: #333;
    padding: 0.875rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
  
}

.mobile-nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0;
  
  .mobile-nav-item {
    color: #333;
    text-decoration: none;
    padding: 1rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
    transition: color 0.3s ease;
    
    &:hover {
      color: #2196f3;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
}

// 移动端语言切换器样式
.mobile-language-switcher {
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}

// 移动端菜单响应式调整
@media (max-width: 480px) {
  .mobile-menu-content {
    max-width: 100%;
  }
  
  .mobile-menu-header {
    padding: 1rem;
  }
  
  .mobile-menu-body {
    padding: 1.5rem 1rem;
  }
}
</style>