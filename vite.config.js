import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        emendas: resolve(__dirname, 'emendas.html'),
        loa: resolve(__dirname, 'loa.html'),
        fontes: resolve(__dirname, 'fontes.html'),
      },
    }
  },
  plugins: [
    tailwindcss(),
  ],
})
