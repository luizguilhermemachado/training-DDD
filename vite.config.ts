import { defineConfig } from 'vitest/config' // <- aqui!
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: { // <- agora o TS reconhece
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts']
  }
})
