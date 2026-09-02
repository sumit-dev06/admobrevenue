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
        // Exclude all lazy-loaded sub-pages, modals, and below-the-fold content from critical head preloading
        return deps.filter(
          (dep) =>
            !dep.includes('vendor-charts') &&
            !dep.includes('Modal') &&
            !dep.includes('Calculator') &&
            !dep.includes('Editorial') &&
            !dep.includes('Guide') &&
            !dep.includes('Formula') &&
            !dep.includes('Glossary') &&
            !dep.includes('Faq') &&
            !dep.includes('Tips') &&
            !dep.includes('Trust') &&
            !dep.includes('RevenueCharts')
        );
      },
    },
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
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
