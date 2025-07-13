import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src', 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    // Ensure JSON files are copied to build output
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    },
    // Copy additional assets
    copyPublicDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Serve static files during development
  server: {
    fs: {
      // Allow serving files from project root
      allow: ['..']
    }
  },
  // Ensure JSON files are served with correct MIME type
  assetsInclude: ['**/*.json']
});
