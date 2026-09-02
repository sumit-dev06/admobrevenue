import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_filename, deps) => {
        // Exclude heavy charting libraries and lazy modals from critical head preloading
        return deps.filter(
          (dep) =>
            !dep.includes('vendor-charts') &&
            !dep.includes('Modal') &&
            !dep.includes('KickCalculator') &&
            !dep.includes('TwitchCalculator') &&
            !dep.includes('TikTokCalculator') &&
            !dep.includes('YouTubeCalculator')
        );
      },
    },
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('recharts') || id.includes('d3-')) {
                  return 'vendor-charts';
                }
                if (id.includes('react-dom') || id.includes('react/') || id.includes('react-router')) {
                  return 'vendor-react';
                }
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
              }
            },
          },
        },
  },
}))
