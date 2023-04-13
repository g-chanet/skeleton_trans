import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const API_HOST_FOR_DEV_PROXY = process.env.API_HOST || `http://localhost:3000`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(`./src`, import.meta.url))
    }
  },
  server: {
    proxy: {
      "/graphql": {
        target: API_HOST_FOR_DEV_PROXY,
        changeOrigin: true,
      },
      "/socket.io": {
        target: API_HOST_FOR_DEV_PROXY,
        changeOrigin: true,
      },
      "/auth": {
        target: API_HOST_FOR_DEV_PROXY,
        changeOrigin: true,
      }
    }
  }
})
