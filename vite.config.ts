import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    open: true
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~assets": path.resolve(__dirname, "./src/assets")
    },
  },
  build: {
    sourcemap: mode === 'development',
    minify: mode !== 'development',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Vercel-এর জন্য গুরুত্বপূর্ণ অপ্টিমাইজেশন
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Vercel-এর জন্য অতিরিক্ত অপ্টিমাইজেশন
    exclude: ['js-big-decimal']
  },
  // Vercel-এর জন্য গুরুত্বপূর্ণ বেজ পাথ সেটিং
  base: '/',
  // Vercel-এর জন্য স্পেশাল সেটিংস
  define: {
    'process.env': process.env
  }
}));
