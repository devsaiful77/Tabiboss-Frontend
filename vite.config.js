import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  build: {
      chunkSizeWarningLimit: 4000,
  },
  resolve: {
      alias: {
          vue: "vue/dist/vue.esm-bundler.js",
          "@": path.resolve(__dirname, "src"),
      },
  },
})
