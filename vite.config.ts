import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  mode: process.env.NODE_ENV,
  plugins: [
    vue({
      script: {
        // @ts-ignore
        refSugar: true,
      },
    }),
    svgLoader({
      svgo: false
    }),
    pluginRewriteAll()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: process.env.NODE_ENV === 'production' ? 3000 : 3001,
    strictPort: true
  },
})
