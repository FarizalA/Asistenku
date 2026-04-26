import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PENTING: Nama base HARUS persis sama dengan nama repository GitHub Anda!
  // Sesuai screenshot Anda sebelumnya, nama repo-nya adalah "Asistenku"
  base: '/Asistenku/', 
})
