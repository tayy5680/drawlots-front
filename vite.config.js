import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'


// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  assetsInclude: ['**/*.mov'],
  plugins: [vue(),WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env':{
      'VITE_GA_ID': 'G-PPCKQGRKPC'
    }
  }
})
