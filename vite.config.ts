import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // IPv6 এবং IPv4 উভয়ই সাপোর্ট করে
    port: 8080, // ডিফল্ট পোর্ট 5173 এর পরিবর্তে 8080 ব্যবহার করা হচ্ছে
    strictPort: true, // পোর্ট বাইন্ডিং স্ট্রিক্টলি এনফোর্স করবে
    open: true // ডেভ সার্ভার চালু হলে অটোমেটিক ব্রাউজার ওপেন করবে
  },
  plugins: [
    react(), // SWC-ভিত্তিক রিয়েক্ট সাপোর্ট
    mode === 'development' && 
    componentTagger(), // শুধু ডেভেলপমেন্ট মোডে ট্যাগার প্লাগিন
  ].filter(Boolean), // ফিল্টার(Boolean) falsy ভ্যালুগুলো রিমুভ করে
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ এলিয়াস ফর src ডিরেক্টরি
      "~assets": path.resolve(__dirname, "./src/assets") // অতিরিক্ত এলিয়াস
    },
  },
  build: {
    sourcemap: mode === 'development', // শুধু ডেভেলপমেন্টে সোর্সম্যাপ
    minify: mode !== 'development', // প্রোডাকশনে মিনিফাই
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // অ্যাসেট ফাইল নেমিং
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // ডিপেন্ডেন্সি প্রি-বান্ডলিং
  }
}));
