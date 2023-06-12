/*
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 12:24:15
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: "/practice/",
  build: {
    outDir: 'docs',
  }
})
