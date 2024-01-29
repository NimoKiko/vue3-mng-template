import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from "vite-plugin-vue-setup-extend"
// npm i vite-plugin-sv-icons -D
// npm i fast-glob -D
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueSetupExtend(),
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
