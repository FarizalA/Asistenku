import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/Asistenku/', // <--- Tambahkan nama repo Anda di sini
   })