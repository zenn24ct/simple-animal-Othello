// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/othello/' // <-- GitHub Pages のリポジトリ名を指定
})
