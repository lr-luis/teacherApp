import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: 'teacherApp',
      /** custom trust domains */
      domains: ['http://localhost.'],
      /** custom certification directory */
      certDir: '/Users/.../.devServer/cert'
    })
  ]
})
