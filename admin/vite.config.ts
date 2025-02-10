import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api/v1': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
});
