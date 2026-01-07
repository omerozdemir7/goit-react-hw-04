import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repo adını buraya eğik çizgiler arasında yazmalısın
  base: '/goit-react-hw-04/', 
})