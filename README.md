# 🚀 JC超级智能体 - AI智能助手

一个功能强大的AI智能助手前端应用，基于Vue 3构建。支持PPT生成、文档编写、图片生成编辑和**Python代码执行**等多种功能，启动后直接进入管理员模式。

## ✨ 主要功能

### 🎯 核心能力
- **智能对话**：基于先进AI模型的自然语言对话
- **PPT生成**：自动生成专业演示文稿
- **文档编写**：Canvas编辑器支持markdown格式
- **图片处理**：AI图片生成和编辑功能
- **联网搜索**：实时搜索最新信息
- **代码执行**：内置Python环境，支持代码运行和可视化

### 🐍 Python代码执行
- **浏览器内执行**：基于Pyodide的完整Python环境
- **包管理**：预装numpy、matplotlib、pandas，支持动态安装
- **实时预览**：代码执行结果即时显示
- **错误处理**：完整的错误追踪和调试信息

#### 📍 Python环境详解

**🌐 Pyodide工作原理:**
- **运行位置**: 浏览器内存中的WebAssembly虚拟环境
- **包存储路径**: 虚拟文件系统 `/lib/python3.11/site-packages/`
- **下载来源**: CDN `https://cdn.jsdelivr.net/pyodide/v0.24.1/`
- **安装方式**: 通过`pyodide.loadPackage()`动态下载wasm格式的包

**📦 包的生命周期:**
- ✅ **会话内有效**: 在当前浏览器标签页内包持续可用
- ❌ **页面刷新重置**: 刷新页面后需要重新下载所有包
- ❌ **不影响系统**: 不会安装到您的操作系统Python环境

**🔍 与本地Python对比:**

| 特性 | 本地Python | Pyodide(浏览器) |
|------|------------|-----------------|
| 安装位置 | 操作系统文件夹 | 浏览器内存 |
| 持久性 | 永久保存 | 会话级别 |
| 安全性 | 可访问系统 | 完全沙盒 |
| 包来源 | PyPI | Pyodide CDN |
| 文件访问 | 本地文件系统 | 虚拟文件系统 |

**📋 可用包示例:**
- **科学计算**: numpy, scipy, sympy
- **数据分析**: pandas, matplotlib, seaborn
- **机器学习**: scikit-learn, statsmodels
- **图像处理**: pillow, opencv-python
- **网络请求**: requests, urllib3

#### Python示例代码

**简单测试:**
```python
# 简单的Python代码测试
print("Hello, Python!")
print("2 + 3 =", 2 + 3)

# 测试循环
for i in range(5):
    print(f"计数: {i}")
```

**查看环境信息:**
```python
# 查看Pyodide Python环境详细信息
import sys
import os

print("=== Python环境信息 ===")
print(f"Python版本: {sys.version}")
print(f"运行平台: {sys.platform}")
print(f"当前工作目录: {os.getcwd()}")

print("\n=== 虚拟文件系统 ===")
try:
    import pathlib
    site_packages = pathlib.Path("/lib/python3.11/site-packages")
    if site_packages.exists():
        packages = [p.name for p in site_packages.iterdir() if p.is_dir() and not p.name.startswith('_')]
        print(f"已安装的包: {', '.join(sorted(packages))}")
    else:
        print("site-packages目录不存在")
except Exception as e:
    print(f"无法访问文件系统: {e}")

print("\n=== 已导入的模块 ===")
imported_modules = [name for name in sys.modules.keys() if not name.startswith('_')]
print(f"已加载模块数量: {len(imported_modules)}")
print(f"主要模块: {', '.join(sorted(imported_modules)[:10])}")
```

**测试matplotlib:**
```python
# 测试matplotlib是否正常工作
import matplotlib.pyplot as plt
import numpy as np

print("matplotlib测试开始...")

# 创建简单的数据
x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 5, 3]

# 绘制图表
plt.figure(figsize=(6, 4))
plt.plot(x, y, 'bo-')
plt.title('测试图表')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.grid(True)
plt.show()

print("matplotlib测试完成！")
```

**基础计算:**
```python
# 计算斐波那契数列
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

**数据处理:**
```python
import numpy as np

# 创建数组并进行计算
arr = np.array([1, 2, 3, 4, 5])
print(f"原数组: {arr}")
print(f"平方: {arr**2}")
print(f"均值: {np.mean(arr)}")
print(f"标准差: {np.std(arr)}")
```

**简单可视化:**
```python
import matplotlib.pyplot as plt
import numpy as np

# 生成数据
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

# 创建图表
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.title('正弦函数')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()
```

## 🛠️ 使用方法

### Python代码执行
1. 在聊天中发送Python代码块
2. 点击代码块右上角的绿色"运行"按钮
3. 右侧代码预览面板将显示执行结果
4. 点击"+"按钮可安装额外的Python包（会自动初始化环境）

**包安装说明:**
- 系统预装了 `numpy`、`matplotlib`、`pandas`
- 可以安装其他包如 `scipy`、`scikit-learn`、`seaborn` 等
- 首次安装包时会自动初始化Python环境（需要一些时间）
- 支持的包列表可在[Pyodide官方文档](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)查看

### 其他功能
- **PPT制作**：发送"制作XXX主题PPT"
- **文档撰写**：发送"写一篇关于XXX的文章"
- **图片生成**：发送"生成一张XXX图片"
- **联网搜索**：点击搜索按钮开启联网模式

## 📁 项目结构

```
项目根目录/
├── src/                       # 前端源码
│   ├── components/            # Vue组件
│   │   ├── ChatInterface.vue      # 主聊天界面
│   │   ├── CodePreviewSidebar.vue # 代码预览侧边栏(支持Python)
│   │   ├── MessageItem.vue        # 消息组件
│   │   ├── PPTRenderer.vue        # PPT渲染器
│   │   ├── CanvasRenderer.vue     # Canvas文档编辑器
│   │   ├── ImageGenerator.vue     # 图片生成器
│   │   ├── AdminUserManagement.vue # 管理员用户管理
│   │   ├── KnowledgeBase.vue      # 知识库
│   │   ├── MindMapCanvas.vue      # 思维导图画布
│   │   └── FileUploader.vue       # 文件上传器
│   ├── services/              # 前端服务
│   │   ├── api.js                 # API服务
│   │   ├── pptGenerator.js        # PPT生成服务
│   │   ├── documentParser.js      # 文档解析服务
│   │   ├── indexedDBStorage.js    # 本地存储服务
│   │   ├── pptTemplates.js        # PPT模板服务
│   │   └── userDatabase.js        # 本地数据库服务
│   ├── styles/                # 样式文件
│   │   ├── global.scss            # 全局样式
│   │   └── variables.scss         # 样式变量
│   ├── utils/                 # 前端工具函数
│   ├── images/                # 图片资源
│   │   └── ailogo.png             # AI Logo
│   ├── App.vue                # 根组件
│   └── main.js                # 应用入口
├── public/                    # 静态资源
├── package.json               # 项目依赖
└── vite.config.js             # Vite配置
```

## 🔧 技术栈

- **前端框架**：Vue 3 + Composition API
- **构建工具**：Vite
- **样式**：SCSS
- **Python环境**：Pyodide
- **代码高亮**：highlight.js
- **Markdown解析**：marked
- **科学计算**：numpy, matplotlib, pandas
- **本地存储**：IndexedDB
- **数据管理**：本地数据库服务

## 🚀 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📝 更新日志

### v2.0.0 - Python代码执行
- ✅ 添加Python代码执行支持
- ✅ 集成Pyodide浏览器Python环境
- ✅ 支持matplotlib图表显示
- ✅ 添加Python包动态安装功能
- ✅ 优化代码预览界面
- ✅ **移除AI回答字符限制**：大幅增加token限制至8000，支持更长回答

### v1.0.0 - 基础功能
- ✅ AI智能对话
- ✅ PPT自动生成
- ✅ Canvas文档编辑
- ✅ 图片生成编辑
- ✅ 联网搜索功能

## �� 许可证

MIT License