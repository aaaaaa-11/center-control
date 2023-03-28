import { fileURLToPath, URL, } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cesium from 'vite-plugin-cesium'
// vite.config.js / vite.config.ts
import { spaLoading } from 'vite-plugin-spa-loading'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'center-control-demo',
    rollupOptions: {
      plugins: [visualizer()],
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    cesium({
      rebuildCesium: true
    }),
    spaLoading('text', {
      tipText: '正在加载页面，请稍等...'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/less/index.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  }
})
