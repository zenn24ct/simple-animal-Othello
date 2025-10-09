// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // もし react を使っているなら

export default defineConfig({
  base: '/simple-animal-Othello/', // ← ここを必ずリポジトリ名に置き換え
  plugins: [react()],
})
// もし react を使っていないなら、plugins の行を削除してください