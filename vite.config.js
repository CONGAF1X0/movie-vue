import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createProxy } from './src/utils/http/proxy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    server: {
      // Listening on all local IPs
      host: true,
      port: 3000,
      // Load proxy configuration from .env
      proxy: createProxy(env.VITE_PROXY),
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        // '@components': path.join(__dirname, './src/components'),
        // '@utils': path.join(__dirname, './src/utils'),
        // '@router': path.join(__dirname, './src/router'),
        // '@request': path.join(__dirname, './src/utils/request'),
        // '@store': path.join(__dirname, './src/store'),
        // '@storage': path.join(__dirname, './src/utils/storage'),
        // '@model': path.join(__dirname, './src/utils/model'),
        // '@service': path.join(__dirname, './src/api/service'),
        // '@handler': path.join(__dirname, './src/api/handler'),
      },
    },
  }
})
