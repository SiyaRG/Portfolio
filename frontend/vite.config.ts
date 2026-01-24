import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages, set base to repository name (e.g., '/Portfolio/')
  // Change this to match your GitHub Pages repository name
  // For development, use '/' (root)
  const base = mode === 'production' ? '/Portfolio/' : '/';
  
  return {
    base,
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  };
})
