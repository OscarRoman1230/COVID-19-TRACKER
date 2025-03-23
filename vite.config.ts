import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
