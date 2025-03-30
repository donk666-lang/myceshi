'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'v2-datav-template' // page title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    //跨域代理
    proxy: {
      '/weeesys': {
        target: 'http://192.168.0.23:8081',
        changeOrigin: true,
        pathRewrite: { '^/weeesys': '' },
        timeout: 60000,
        proxyTimeout: 60000
      }
    },
    // watchOptions: {
    //   ignored: [
    //     '**/node_modules/**', // 默认忽略 node_modules
    //     '**/.git/**',         // 忽略 .git 目录
    //     'C:\\**',             // 显式忽略 C:\ 根目录（Windows）
    //     // 或者更精确地排除系统文件：
    //     /([\/\\])?(dumppage\.sys|hiberfil\.sys|pagefile\.sys|swapfile\.sys)([\/\\])?/i,
    //   ],
    //   poll: 1000, // 如果需要轮询（某些网络文件系统可能需要）
    // },
    publicPath: '/',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.geojson$/,
          use: 'json-loader'
        }
      ]
    }
  },
  chainWebpack(config) {
    // 预加载，加快首屏渲染速度
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
